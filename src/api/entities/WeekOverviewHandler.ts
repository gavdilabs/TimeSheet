import { Handler, OnRead, Req, OnCreate, OnUpdate } from "cds-routing-handlers";
import { TimesheetService } from "../../entities";
import { Service } from "typedi";

@Handler(TimesheetService.Entity.ProjectEmployeeAID)
@Service()
export class ProjectEmployeeAIDHandler {
    @OnRead()
    public async OnReadEntity(@Req() req: any) {
        const employeeNumber = this.getFilterValue(req.query, 'employeeNumber', "=");
        const numberOfDays = this.getFilterValue(req.query, 'numberOfDays', "=");
        const startDate = this.getFilterValue(req.query, 'startDate', "=");
        const weekCount = this.getWeekCount(numberOfDays, startDate, employeeNumber);
        return weekCount
    }

    async getWeekCount(numberOfDays: number, startDate: string, employeeNumber: string) {
        let workScheduleMap = new Map() as Map<string, number>;
        let workHoursMap = new Map() as Map<Date, number>;
        let totalWorkedHours = 0;
        let totalHours = 0;

        const calendarStartDate = new Date(startDate)
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
    getFilterValue = (query, filter, operator) => {
        let value = null;
        let filterIndex = null;
        const where = query.SELECT.where;
        if (where !== undefined) {
            for (let index = 0; index < where.length; index++) {
                const element = where[index];
                const { ref } = element;
                if (!ref) continue;
                if (ref.includes(filter) && where[index + 1] === operator) {
                    filterIndex = index;
                    break;
                }
            }
            if (filterIndex !== null) {
                value = where[filterIndex + 2].val;
            }
        }
        return value;

    }
}