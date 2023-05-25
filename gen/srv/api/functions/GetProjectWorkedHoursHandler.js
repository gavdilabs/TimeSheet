"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiR2V0UHJvamVjdFdvcmtlZEhvdXJzSGFuZGxlci5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uL3NyYy9hcGkvZnVuY3Rpb25zL0dldFByb2plY3RXb3JrZWRIb3Vyc0hhbmRsZXIudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7QUFHQTs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztHQXNFRyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IEZ1bmMsIEhhbmRsZXIsIFBhcmFtLCBSZXEgfSBmcm9tIFwiY2RzLXJvdXRpbmctaGFuZGxlcnNcIjtcbmltcG9ydCB7IFRpbWVzaGVldFNlcnZpY2UgfSBmcm9tIFwiLi4vLi4vZW50aXRpZXNcIjtcbmltcG9ydCB7IFNlcnZpY2UgfSBmcm9tIFwidHlwZWRpXCI7XG4vKlxuQEhhbmRsZXIoKVxuQFNlcnZpY2UoKVxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgR2V0UHJvamVjdFdvcmtlZEhvdXJzSGFuZGxlciB7XG4gIEBGdW5jKFRpbWVzaGVldFNlcnZpY2UuRnVuY0dldFByb2plY3RXb3JrZWRIb3Vycy5uYW1lKVxuICBwdWJsaWMgYXN5bmMgR2V0UHJvamVjdFdvcmtlZEhvdXJzKFxuICAgIEBSZXEoKSByZXE6IGFueSxcbiAgICBAUGFyYW0oVGltZXNoZWV0U2VydmljZS5GdW5jR2V0UHJvamVjdFdvcmtlZEhvdXJzLnBhcmFtRW1wbG95ZWVOdW1iZXIpIGVtcGxveWVlTnVtYmVyOiBudW1iZXIsXG4gICAgQFBhcmFtKFRpbWVzaGVldFNlcnZpY2UuRnVuY0dldFByb2plY3RXb3JrZWRIb3Vycy5wYXJhbVByb2plY3RJRCkgcHJvamVjdElEOiBzdHJpbmdcbiAgKTogUHJvbWlzZTxUaW1lc2hlZXRTZXJ2aWNlLklDdXN0X1Byb2plY3RFbXBsb3llZUFJRFtdPiB7XG4gICAgY29uc29sZS5sb2coZW1wbG95ZWVOdW1iZXIpXG5cbiAgICAvLyBHZXQgdG90YWwgaG91cnMgYXNzaWduZWQgdG8gZW1wbG95ZWUgb24gdGhpcyBwcm9qZWN0IFxuICAgIGxldCBxdWVyeVByb2plY3RBc3NpZ25tZW50ID0gU0VMRUNULmZyb20oJ1Byb2plY3RBc3NpZ25tZW50Jykud2hlcmUoeyBwcm9qZWN0SUQ6IHByb2plY3RJRCwgZW1wbG95ZWU6IGVtcGxveWVlTnVtYmVyIH0pXG4gICAgICAuY29sdW1ucyhlbCA9PiB7XG4gICAgICAgIGVsLmFzc2lnbmVkSG91cnNcbiAgICAgIH0pXG4gICAgbGV0IGhvdXJzQXNzaWduZWQgPSAoYXdhaXQgY2RzLnJ1bihxdWVyeVByb2plY3RBc3NpZ25tZW50KSlbMF0uYXNzaWduZWRIb3Vyc1xuICAgIC8vIEdldCB2YWxpZCBBSURzIGFuZCBzYXZlIHRvIGEgbWFwXG4gICAgbGV0IHF1ZXJ5QUlEID0gU0VMRUNULmZyb20oJ0Fic2VuY2VBdHRlbmRhbmNlVHlwZScpLndoZXJlKHsgaXNBYnNlbmNlOiBmYWxzZSB9KVxuICAgICAgLmNvbHVtbnMoZWwgPT4ge1xuICAgICAgICBlbC5BSUQsXG4gICAgICAgICAgZWwuQUFUeXBlXG4gICAgICB9KVxuICAgIGxldCB2YWxpZEFJRHMgPSBhd2FpdCBjZHMucnVuKHF1ZXJ5QUlEKVxuICAgIGxldCBBSURzTWFwID0gbmV3IE1hcCgpIGFzIE1hcDxudW1iZXIsIHN0cmluZz5cbiAgICB2YWxpZEFJRHMuZm9yRWFjaCh2YWxpZEFJRCA9PiB7XG4gICAgICBBSURzTWFwLnNldCh2YWxpZEFJRC5BSUQsIHZhbGlkQUlELkFBVHlwZSlcbiAgICB9KTtcblxuICAgIC8vIEdldCBlbXBsb3llZXMgd29ya2luZyBob3VycyBvbiB0aGUgcHJvamVjdFxuICAgIGxldCBxdWVyeUhvdXJzID0gU0VMRUNULmZyb20oJ1dvcmtIb3VycycpLndoZXJlKHsgcHJvamVjdElEOiBwcm9qZWN0SUQsIGVtcGxveWVlOiBlbXBsb3llZU51bWJlciB9KVxuICAgIGxldCB3b3JrSG91cnMgPSBhd2FpdCBjZHMucnVuKHF1ZXJ5SG91cnMpXG4gICAgbGV0IGhvdXJzQUlEbWFwID0gbmV3IE1hcCgpIGFzIE1hcDxudW1iZXIsIG51bWJlcj5cblxuICAgIC8vIEdldCB0aGUgdG90YWwgb2Ygd29ya2luZyBob3VycyBzcGVudCBvbiBlYWNoIEFJRCBcbiAgICBpZiAod29ya0hvdXJzLmxlbmd0aCA+IDApIHtcbiAgICAgIHdvcmtIb3Vycy5mb3JFYWNoKGVsZW1lbnQgPT4ge1xuICAgICAgICBpZiAoQUlEc01hcC5oYXMoZWxlbWVudC5BSUQpKSB7XG4gICAgICAgICAgdmFyIGQxID0gbmV3IERhdGUoZWxlbWVudC5mcm9tVGltZSk7XG4gICAgICAgICAgdmFyIGQyID0gbmV3IERhdGUoZWxlbWVudC50b1RpbWUpO1xuICAgICAgICAgIHZhciBzdWIgPSAoZDIuZ2V0VGltZSgpIC0gZDEuZ2V0VGltZSgpKSAvIDM2MDAwMDA7XG4gICAgICAgICAgY29uc29sZS5sb2coc3ViKVxuICAgICAgICAgIGlmICghaG91cnNBSURtYXAuZ2V0KGVsZW1lbnQuQUlEKSkge1xuICAgICAgICAgICAgaG91cnNBSURtYXAuc2V0KGVsZW1lbnQuQUlELCBzdWIpXG4gICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIGhvdXJzQUlEbWFwLnNldChlbGVtZW50LkFJRCwgc3ViICsgaG91cnNBSURtYXAuZ2V0KGVsZW1lbnQuQUlEKSlcbiAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgIH0pO1xuICAgIH1cblxuICAgIGNvbnN0IEFJRG92ZXJ2aWV3OiBUaW1lc2hlZXRTZXJ2aWNlLklDdXN0X1Byb2plY3RFbXBsb3llZUFJRFtdID0gW107XG5cbiAgICBob3Vyc0FJRG1hcC5mb3JFYWNoKCh0b3RhbEhvdXJzLCBBSUQpID0+IHtcbiAgICAgIGNvbnNvbGUubG9nKFwidG90YWxIb3VycyBcIiArIHRvdGFsSG91cnMpXG4gICAgICBjb25zb2xlLmxvZyhcIkFJRCBcIiArIEFJRClcblxuICAgICAgQUlEb3ZlcnZpZXcucHVzaCh7XG4gICAgICAgIHRvdGFsSG91cnM6IE1hdGgucm91bmQodG90YWxIb3VycyksXG4gICAgICAgIEFJRDogQUlELFxuICAgICAgICBBQVR5cGU6IEFJRHNNYXAuZ2V0KEFJRCksXG4gICAgICAgIHBlcmNlbnRhZ2U6IE1hdGgucm91bmQoKHRvdGFsSG91cnMvaG91cnNBc3NpZ25lZCkqMTAwKVxuICAgICAgfSBhcyBUaW1lc2hlZXRTZXJ2aWNlLklDdXN0X1Byb2plY3RFbXBsb3llZUFJRClcbiAgICB9KTtcblxuICAgIGNvbnNvbGUubG9nKEFJRG92ZXJ2aWV3KVxuXG4gICAgcmV0dXJuIEFJRG92ZXJ2aWV3O1xuICB9XG59Ki9cbiJdfQ==