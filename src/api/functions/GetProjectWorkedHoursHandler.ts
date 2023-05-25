import { Func, Handler, Param, Req } from "cds-routing-handlers";
import { TimesheetService } from "../../entities";
import { Service } from "typedi";
/*
@Handler()
@Service()
export default class GetProjectWorkedHoursHandler {
  @Func(TimesheetService.FuncGetProjectWorkedHours.name)
  public async GetProjectWorkedHours(
    @Req() req: any,
    @Param(TimesheetService.FuncGetProjectWorkedHours.paramEmployeeNumber) employeeNumber: number,
    @Param(TimesheetService.FuncGetProjectWorkedHours.paramProjectID) projectID: string
  ): Promise<TimesheetService.ICust_ProjectEmployeeAID[]> {
    console.log(employeeNumber)

    // Get total hours assigned to employee on this project 
    let queryProjectAssignment = SELECT.from('ProjectAssignment').where({ projectID: projectID, employee: employeeNumber })
      .columns(el => {
        el.assignedHours
      })
    let hoursAssigned = (await cds.run(queryProjectAssignment))[0].assignedHours
    // Get valid AIDs and save to a map
    let queryAID = SELECT.from('AbsenceAttendanceType').where({ isAbsence: false })
      .columns(el => {
        el.AID,
          el.AAType
      })
    let validAIDs = await cds.run(queryAID)
    let AIDsMap = new Map() as Map<number, string>
    validAIDs.forEach(validAID => {
      AIDsMap.set(validAID.AID, validAID.AAType)
    });

    // Get employees working hours on the project
    let queryHours = SELECT.from('WorkHours').where({ projectID: projectID, employee: employeeNumber })
    let workHours = await cds.run(queryHours)
    let hoursAIDmap = new Map() as Map<number, number>

    // Get the total of working hours spent on each AID 
    if (workHours.length > 0) {
      workHours.forEach(element => {
        if (AIDsMap.has(element.AID)) {
          var d1 = new Date(element.fromTime);
          var d2 = new Date(element.toTime);
          var sub = (d2.getTime() - d1.getTime()) / 3600000;
          console.log(sub)
          if (!hoursAIDmap.get(element.AID)) {
            hoursAIDmap.set(element.AID, sub)
          } else {
            hoursAIDmap.set(element.AID, sub + hoursAIDmap.get(element.AID))
          }
        }
      });
    }

    const AIDoverview: TimesheetService.ICust_ProjectEmployeeAID[] = [];

    hoursAIDmap.forEach((totalHours, AID) => {
      console.log("totalHours " + totalHours)
      console.log("AID " + AID)

      AIDoverview.push({
        totalHours: Math.round(totalHours),
        AID: AID,
        AAType: AIDsMap.get(AID),
        percentage: Math.round((totalHours/hoursAssigned)*100)
      } as TimesheetService.ICust_ProjectEmployeeAID)
    });

    console.log(AIDoverview)

    return AIDoverview;
  }
}*/
