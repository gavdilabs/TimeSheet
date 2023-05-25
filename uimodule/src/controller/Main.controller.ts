import SinglePlanningCalendar from "sap/m/SinglePlanningCalendar";
import Event from "sap/ui/base/Event";
import CalendarAppointment from "sap/ui/unified/CalendarAppointment";
import BaseController from "./BaseController";
import PlanningCalendar from "sap/m/PlanningCalendar";
import Text from "sap/m/Text";
import Table from "sap/m/Table";
import InteractiveDonutChart from "sap/suite/ui/microchart/InteractiveDonutChart";
import Label from "sap/m/Label";
import ProgressIndicator from "sap/m/ProgressIndicator";
import Filter from "sap/ui/model/Filter";
import FilterOperator from "sap/ui/model/FilterOperator";
import Popover from "sap/m/Popover";
import Fragment from "sap/ui/core/Fragment";
import CheckBox from "sap/m/CheckBox";
import { CalendarDayType } from "sap/ui/unified/library";
import List from "sap/m/List";
import StandardListItem from "sap/m/StandardListItem";
import ODataContextBinding from "sap/ui/model/odata/v4/ODataContextBinding";

/**
 * @namespace com.gavdilabs.timesheet.controller
 */
export default class Main extends BaseController {
    oAIDTable: Table;
    AIDabsenseFalse: Map<number, string>;
    empNumber: number;
    projectFilterPopover: Popover;
    employeeCalendar: SinglePlanningCalendar;
    showWorkScheduleCheckBox: CheckBox;
    seenDates: string[];
    projectFilterList: List
    employeeAppointments: CalendarAppointment[]
    daysLabel: Label;

    public onInit(): void {
        this.getRouter()
            .getRoute("MainRoute")
            .attachPatternMatched(this.onEmployeeMatched, this);
        this.AIDabsenseFalse = new Map();
        this.seenDates = [];
        this.daysLabel = (this.getView().byId("daysLabel") as Label)
        this.employeeCalendar = this.getView().byId("SPC1") as SinglePlanningCalendar
        $.ajax({
            type: "GET",
            url: "/odata/AbsenceAttendanceType?$filter=isAbsence eq false",
            dataType: "json",
            success: (res: any) => {
                if (res.value.length > 0) {
                    for (let index = 0; index < res.value.length; index++) {
                        const element = res.value[index];
                        this.AIDabsenseFalse.set(element.AID, element.AAType);
                    }
                }
            },
        });
    }

    onAfterRendering(): void {
        this.oAIDTable = this.getView().byId("projectOverviewTable") as Table;
        this.oAIDTable.bindItems;
        this.showWorkScheduleCheckBox = this.getView().byId("showWorkScheduleCheckBox") as CheckBox
    }


    async onEmployeeMatched(oEvent: Event): Promise<void> {
        const empNumber = oEvent.getParameter("arguments").empNumber || "0";
        this.empNumber = empNumber

        this.getView()
            .byId("ObjectPageLayout")
            .bindElement({
                path: "/Employees(" + empNumber + ")",
            });

        this.employeeCalendar.bindAggregation("appointments", {
            path: `/Employees(${empNumber})/_workHours`,
            template: new CalendarAppointment({
                title: "{_project/projectName}",
                text: "{_absAttendance/AAType}",
                type: {
                    parts: [
                        { path: "projectID" }
                    ],
                    formatter: this.formatter.chooseCalendarType,
                },
                startDate: {
                    path: "fromTime",
                },
                endDate: {
                    path: "toTime",
                },
            })
        });
        const startDate = this.employeeCalendar.getStartDate() as Date
        const week = this.getWeekNumber(startDate);
        (this.getView().byId("weekNumber") as Text).setText(week);
        this.setTimeSheetCharts()
    }

    formatDateToString(dateIn: Date) {
        var yyyy = dateIn.getFullYear();
        var mm = dateIn.getMonth() + 1; // getMonth() is zero-based
        var dd = dateIn.getDate();
        return String(yyyy) + "-" + (mm < 10 ? "0" : "") + String(mm) + "-" + (dd < 10 ? "0" : "") + String(dd); // Leading zeros for mm and dd
    }

    onCheckWorkSchedule(oEvent: Event) {
        const selected = oEvent.getParameter("selected")
        if (!selected) {
            this.employeeCalendar.getAppointments().forEach(element => {
                if (element.getKey() === "workSchedule") {
                    element.destroy()
                    this.seenDates = []
                }
            });
        } else {
            const startDate = this.employeeCalendar.getStartDate() as Date
            this.seenDates.push(this.formatDateToString(startDate))
            this.onShowWorkSchedule()
        }
    }

    async onShowWorkSchedule() {
        const calendarStartDate = this.employeeCalendar.getStartDate() as Date;
        const ctx = this.getView().getModel().bindContext(`/GetDateSpecificWorkSchedule(...)`) as ODataContextBinding;
        ctx.setParameter("startDate", this.formatDateToString(calendarStartDate))
        ctx.setParameter("employeeNumber", this.empNumber)
        await ctx.execute();
        const calendarWorkSchedule = await ctx.requestObject();
        calendarWorkSchedule.value.forEach((workDay: { startTime: string; endTime: string }) => {
            this.employeeCalendar.addAppointment(new CalendarAppointment({
                title: "Work schedule",
                key: "workSchedule",
                type: CalendarDayType.Type01, // don't change unless neccessary, the css class changes the background pattern for type01
                startDate: new Date(workDay.startTime),
                endDate: new Date(workDay.endTime),
            }))
        })
    }

    onChangeProjectFilter() {
        var aFilters = [] as Filter[];
        let chosenProjects = this.projectFilterList.getSelectedItems().map(a => a.getBindingContext().getProperty("projectID"));
        chosenProjects.forEach(chosenProject => {
            aFilters.push(new Filter({ path: "projectID", operator: FilterOperator.EQ, value1: chosenProject }));
        });
        this.employeeCalendar.getBinding("appointments").filter(aFilters);
    }

    async openFilterPopup(oEvent: Event) {
        var oButton = oEvent.getSource(),
            oView = this.getView();

        // create popover
        if (!this.projectFilterPopover) {
            this.projectFilterPopover = (await Fragment.load({
                id: oView.getId(),
                name: "com.gavdilabs.timesheet.view.popovers.projectFilterPopover",
                controller: this
            })) as Popover
            oView.addDependent(this.projectFilterPopover);
            this.projectFilterList = this.getView().byId("projectNamesList") as List

            var listItem = new StandardListItem({
                title: "{_project/projectName}",
                selected: true
            });
            this.projectFilterList.bindAggregation("items", { path: `/Employees(${this.empNumber})/_projectAssignments`, template: listItem })
        }
        this.projectFilterPopover.openBy(oButton, false);
    }
    onChangeWeekView() {
        this.setTimeSheetCharts()
    }

    async setTimeSheetCharts() {
        let workScheduleMap = new Map() as Map<string, number>;
        let workHoursMap = new Map() as Map<string, number>;

        const calendarStartDate = this.employeeCalendar.getStartDate() as Date;
        const numberOfDays = this.employeeCalendar.getSelectedView().includes("0") ? 5 : 7;
        let totalWorkedHours = 0;

        let totalHours = 0;

        const ctx = this.getView().getModel().bindContext(`/GetWeekProgress(...)`) as ODataContextBinding;
        ctx.setParameter("startDate", this.formatDateToString(calendarStartDate))
        ctx.setParameter("employeeNumber", this.empNumber)
        ctx.setParameter("numberOfDays", numberOfDays)
        await ctx.execute();
        const weekOverview = await ctx.requestObject()

        this.daysLabel.setText(weekOverview.totalWorkedDays + "/" + weekOverview.totalScheduledDays + " days");

        (this.getView().byId("hoursLabel") as Label).setText(
            Math.round(weekOverview.totalWorkedHours) + "/" + weekOverview.totalScheduledHours + " hours"
        );

        (this.getView().byId("hoursProgress") as ProgressIndicator).setPercentValue(Math.round(weekOverview.totalWorkedHours / weekOverview.totalScheduledHours * 100));
        (this.getView().byId("hoursProgress") as ProgressIndicator).setDisplayValue(Math.round(weekOverview.totalWorkedHours / weekOverview.totalScheduledHours * 100) + "%");

        const hoursState = Math.round(weekOverview.totalWorkedHours / weekOverview.totalScheduledHours * 100) < 100 ? "None" : (Math.round(weekOverview.totalWorkedHours / weekOverview.totalScheduledHours * 100) == 100 ? "Success" : "Error");
        (this.getView().byId("hoursProgress") as ProgressIndicator).setState(hoursState);

        (this.getView().byId("daysProgress") as ProgressIndicator).setPercentValue(Math.round(weekOverview.totalWorkedDay / weekOverview.totalSchedulesDays * 100));
        (this.getView().byId("daysProgress") as ProgressIndicator).setDisplayValue(Math.round(weekOverview.totalWorkedDay / weekOverview.totalSchedulesDays * 100) + "%");
        const daysState = Math.round(weekOverview.totalWorkedDay / weekOverview.totalSchedulesDays * 100) < 100 ? "None" : (Math.round(weekOverview.totalWorkedDay / weekOverview.totalSchedulesDays * 100) == 100 ? "Success" : "Error");
        (this.getView().byId("daysProgress") as ProgressIndicator).setState(daysState);
    }


    addDays(date: Date, days: number): Date {
        var result = new Date(date);
        result.setDate(result.getDate() + days);
        return result;
    }

    zoomIn() {
        var iCurrentScaleFoucs = this.employeeCalendar.getScaleFactor();
        this.employeeCalendar.setScaleFactor(++iCurrentScaleFoucs);
    }

    zoomOut() {
        var iCurrentScaleFoucs = this.employeeCalendar.getScaleFactor();
        this.employeeCalendar.setScaleFactor(--iCurrentScaleFoucs);
    }

    onProjectChosen(ev: Event): void {
        const projectID = ev.getParameter("selectedItem").getKey();
        const AIDchart = this.getView().byId("AIDchart") as InteractiveDonutChart;

        var aFilters = [];
        aFilters.push(new Filter({ path: "employeeNumber", operator: FilterOperator.EQ, value1: this.empNumber }));
        aFilters.push(new Filter({ path: "projectID", operator: FilterOperator.EQ, value1: projectID }));

        this.oAIDTable.getBinding("items").filter(aFilters);
        this.oAIDTable.getBinding("items").isSuspended() && this.oAIDTable.getBinding("items").resume();

        aFilters.push(new Filter({ path: "isRemaining", operator: FilterOperator.EQ, value1: true }));
        AIDchart.getBinding("segments").filter(aFilters);;
        AIDchart.getBinding("segments").isSuspended() && AIDchart.getBinding("segments").resume();

    }

    onCalendarWeekChange(ev: Event): void {
        const startDate = (ev.getSource() as PlanningCalendar).getStartDate() as Date;
        const week = this.getWeekNumber(startDate);
        (this.getView().byId("weekNumber") as Text).setText(week);

        this.setTimeSheetCharts()
        if (this.showWorkScheduleCheckBox.getSelected()) {
            const stringDate = this.formatDateToString(startDate)
            if (!this.seenDates.includes(stringDate)) {
                this.seenDates.push(stringDate)
                this.onShowWorkSchedule()
            }
        }
    }

    getWeekNumber(date: Date): string {
        var date = new Date(date.getTime());
        date.setHours(0, 0, 0, 0);
        date.setDate(date.getDate() + 3 - ((date.getDay() + 6) % 7));
        var week1 = new Date(date.getFullYear(), 0, 4);
        return String(
            1 +
            Math.round(
                ((date.getTime() - week1.getTime()) / 86400000 -
                    3 +
                    ((week1.getDay() + 6) % 7)) /
                7
            )
        );
    }
}
