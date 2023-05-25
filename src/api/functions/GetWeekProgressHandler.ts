import { Func, Handler, Param, Req } from "cds-routing-handlers";
import { TimesheetService } from "../../entities";
import { Service } from "typedi";

@Handler()
@Service()
export default class GetWeekProgressHandler {
    @Func(TimesheetService.FuncGetWeekProgress.name)
    public async GetWeekProgress(
        @Req() req: any,
        @Param(TimesheetService.FuncGetWeekProgress.paramStartDate) weekStartDate: string,
        @Param(TimesheetService.FuncGetWeekProgress.paramNumberOfDays) numberOfDays: number,
        @Param(TimesheetService.FuncGetWeekProgress.paramEmployeeNumber) employeeNumber: number
    ): Promise<TimesheetService.ICust_weekOverview> {

        let workScheduleMap = new Map() as Map<string, number>;
        let workHoursMap = new Map() as Map<Date, number>;
        let totalWorkedHours = 0;
        let totalHours = 0;

        const calendarStartDate = new Date(weekStartDate)
        const calendarEndDate = this.addDays(calendarStartDate, numberOfDays)

        let queryEmployeeSchedule = SELECT.from('WorkSchedule').where({ employee: employeeNumber })
        let employeeSchedule = await cds.run(queryEmployeeSchedule) as TimesheetService.IWorkSchedule[]

        employeeSchedule.forEach(workDay => {
            if (numberOfDays == 7 || (numberOfDays == 5 && !(String(workDay.weekday) == "saturday" || String(workDay.weekday) == "sunday"))) {
                var d1 = new Date("1970-01-01T" + workDay.starttime);
                var d2 = new Date("1970-01-01T" + workDay.endtime);
                var sub = (d2.getTime() - d1.getTime()) / 3600000;
                if (sub != 0) {
                    workScheduleMap.set(String(workDay.weekday), sub);
                    totalHours = totalHours + sub;
                }
            }
        });

        let queryWorkHours = SELECT.from('WorkHours').where({ employee: employeeNumber })
            .columns(el => {
                    el.fromTime,
                    el.toTime,
                    el.workingDay,
                    el._absAttendance(jr => {
                        jr.isAbsence;
                    });
            })

        let workHours = await cds.run(queryWorkHours) as TimesheetService.IWorkHours[]
        workHours.forEach(shift => {
            if (shift._absAttendance.isAbsence == false) {
                var d1 = new Date(shift.fromTime);
                var d2 = new Date(shift.toTime);
                if (d1 >= calendarStartDate && d2 <= calendarEndDate) {
                    var sub = (d2.getTime() - d1.getTime()) / 3600000;
                    totalWorkedHours = totalWorkedHours + sub;

                    if (workHoursMap.has(shift.workingDay)) {
                        workHoursMap.set(shift.workingDay, workHoursMap.get(shift.workingDay) + sub);
                    } else {
                        workHoursMap.set(shift.workingDay, sub);
                    }
                }
            }
        });

        const weekOverview = {
            totalWorkedHours: totalWorkedHours,
            totalScheduledHours: totalHours,
            totalWorkedDays: workHoursMap.size,
            totalSchedulesDays: workScheduleMap.size
        }

        return weekOverview;
    }

    formatDateToString(dateIn: Date) {
        var yyyy = dateIn.getFullYear();
        var mm = dateIn.getMonth() + 1; // getMonth() is zero-based
        var dd = dateIn.getDate();
        return String(yyyy) + "-" + (mm < 10 ? "0" : "") + String(mm) + "-" + (dd < 10 ? "0" : "") + String(dd); // Leading zeros for mm and dd
    }

    addDays(date: Date, days: number): Date {
        var result = new Date(date);
        result.setDate(result.getDate() + days);
        return result;
    }
}
