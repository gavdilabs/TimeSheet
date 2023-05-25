import { Handler, OnRead, Req, OnCreate, OnUpdate } from "cds-routing-handlers";
import { TimesheetService } from "../../entities";
import ExternalServiceFactory from "../../core/services/ExternalServiceFactory";
import { Service } from "typedi";
import { Console } from "console";

@Handler(TimesheetService.Entity.ProjectEmployeeAID)
@Service()
export class ProjectEmployeeAIDHandler {
  @OnRead()
  public async OnReadEntity(@Req() req: any) {
    const employeeNumber = this.getFilterValue(req.query, 'employeeNumber', "=");
    const projectID = this.getFilterValue(req.query, 'projectID', "=");
    const isRemaining = this.getFilterValue(req.query, 'isRemaining', "=");
    const countedHours = this.onCountHours(projectID, employeeNumber, isRemaining);
    return countedHours
  }

  async onCountHours(projectID: string, employeeNumber: number, isRemaining: boolean) {
    // Get total hours assigned to employee on this project
    let queryProjectAssignment = SELECT.from("ProjectAssignment")
      .where({ projectID: projectID, employee: employeeNumber })
      .columns((el) => {
        el.assignedHours;
      });
    let hoursAssigned = (await cds.run(queryProjectAssignment))[0]
      .assignedHours;
    // Get valid AIDs and save to a map
    let queryAID = SELECT.from("AbsenceAttendanceType")
      .where({ isAbsence: false })
      .columns((el) => {
        el.AID, el.AAType;
      });
    let validAIDs = await cds.run(queryAID);
    let AIDsMap = new Map() as Map<number, string>;
    validAIDs.forEach((validAID) => {
      AIDsMap.set(validAID.AID, validAID.AAType);
    });

    // Get employees working hours on the project
    let queryHours = SELECT.from("WorkHours").where({
      projectID: projectID,
      employee: employeeNumber,
    });
    let workHours = await cds.run(queryHours);
    let hoursAIDmap = new Map() as Map<number, number>;

    // Get the total of working hours spent on each AID
    if (workHours.length > 0) {
      workHours.forEach((element) => {
        if (AIDsMap.has(element.AID)) {
          var d1 = new Date(element.fromTime);
          var d2 = new Date(element.toTime);
          var sub = (d2.getTime() - d1.getTime()) / 3600000;
          if (!hoursAIDmap.get(element.AID)) {
            hoursAIDmap.set(element.AID, sub);
          } else {
            hoursAIDmap.set(element.AID, sub + hoursAIDmap.get(element.AID));
          }
        }
      });
    }

    const AIDoverview: TimesheetService.IProjectEmployeeAID[] = [];
    let hoursInTotal = 0 as number
    hoursAIDmap.forEach((totalHours, AID) => {
      hoursInTotal = hoursInTotal + totalHours
      AIDoverview.push({
        employeeNumber: employeeNumber,
        projectID: projectID,
        totalHours: Math.round(totalHours),
        AID: AID,
        AAType: AIDsMap.get(AID),
        percentage: Math.round((totalHours / hoursAssigned) * 100),
        isRemaining: isRemaining
      } as TimesheetService.IProjectEmployeeAID);
    });
    
    // Add one more object which stands for remaining hours
    if(isRemaining){
      AIDoverview.push({
        employeeNumber: employeeNumber,
        projectID: projectID,
        totalHours: Math.round(hoursAssigned- hoursInTotal),
        AID: undefined,
        AAType: "Remaining",
        percentage: Math.round(((hoursAssigned- hoursInTotal) / hoursAssigned) * 100),
        isRemaining: isRemaining
      } as TimesheetService.IProjectEmployeeAID);
    }
    return AIDoverview;
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
