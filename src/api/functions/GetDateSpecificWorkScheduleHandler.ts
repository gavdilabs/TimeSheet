import { Func, Handler, Param, Req } from "cds-routing-handlers";
import { TimesheetService } from "../../entities";
import { Service } from "typedi";

@Handler()
@Service()
export default class GetDateSpecificWorkScheduleHandler {
  @Func(TimesheetService.FuncGetDateSpecificWorkSchedule.name)
  public async GetDateSpecificWorkSchedule(
    @Req() req: any,
    @Param(TimesheetService.FuncGetDateSpecificWorkSchedule.paramStartDate) weekStartDate: string,
    @Param(TimesheetService.FuncGetDateSpecificWorkSchedule.paramEmployeeNumber) employeeNumber: number
  ): Promise<TimesheetService.ICust_scheduleToShifts[]> {
    let queryEmployeeSchedule = SELECT.from('WorkSchedule').where({ employee: employeeNumber})
    let employeeSchedule = await cds.run(queryEmployeeSchedule) as TimesheetService.IWorkSchedule[]
    const startDate = new Date(weekStartDate)
    const schedule = [] as TimesheetService.ICust_scheduleToShifts[]
    const endDate = this.addDays(startDate, 7)
    employeeSchedule.forEach(workScheduleDay => {
        if(startDate >= new Date(workScheduleDay.validFrom) && endDate <= new Date(workScheduleDay.validTo)){
            if(workScheduleDay.starttime !== workScheduleDay.endtime){
                let additionalDays
                let startDateTime;
                let endDateTime;
                switch (String(workScheduleDay.weekday)) {
                  case "monday":
                    additionalDays = 0
                    break;
                  case "tuesday":
                    additionalDays = 1
                    break;
                  case "wednesday":
                    additionalDays = 2
                    break;
                  case "thursday":
                    additionalDays = 3
                    break;
                  case "friday":
                    additionalDays = 4
                    break;
                  case "saturday":
                    additionalDays = 5
                    break;
                  case "sunday":
                    additionalDays = 6
                    break;
                  default:
                    break;
                }
                startDateTime = this.formatDateToString(this.addDays(startDate, additionalDays)) + "T" + workScheduleDay.starttime + "Z"
                endDateTime = this.formatDateToString(this.addDays(startDate, additionalDays)) + "T" + workScheduleDay.endtime + "Z"
                schedule.push({
                    startTime: startDateTime,
                    endTime: endDateTime
                })
            }
        }
    });


    return schedule;
  }

  formatDateToString(dateIn: Date) {
    var yyyy = dateIn.getFullYear();
    var mm = dateIn.getMonth() + 1; // getMonth() is zero-based
    var dd = dateIn.getDate();
    return String(yyyy) + "-" + (mm<10 ? "0" : "") + String(mm) + "-" + (dd<10 ? "0" : "") + String(dd); // Leading zeros for mm and dd
  }

  addDays(date: Date, days: number): Date {
    var result = new Date(date);
    result.setDate(result.getDate() + days);
    return result;
  }
}
