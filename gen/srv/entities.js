"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SanitizedEntity = exports.Entity = exports.TimesheetService = exports.sap = exports.com = void 0;
var com;
(function (com) {
    var gavdilabs;
    (function (gavdilabs) {
        var timesheet;
        (function (timesheet) {
            let Weekday;
            (function (Weekday) {
                Weekday[Weekday["monday"] = 0] = "monday";
                Weekday[Weekday["tuesday"] = 1] = "tuesday";
                Weekday[Weekday["wednesday"] = 2] = "wednesday";
                Weekday[Weekday["thursday"] = 3] = "thursday";
                Weekday[Weekday["friday"] = 4] = "friday";
                Weekday[Weekday["saturday"] = 5] = "saturday";
                Weekday[Weekday["sunday"] = 6] = "sunday";
            })(Weekday = timesheet.Weekday || (timesheet.Weekday = {}));
            let Entity;
            (function (Entity) {
                Entity["AbsenceAttendanceType"] = "com.gavdilabs.timesheet.AbsenceAttendanceType";
                Entity["Employee"] = "com.gavdilabs.timesheet.Employee";
                Entity["WorkSchedule"] = "com.gavdilabs.timesheet.WorkSchedule";
                Entity["WorkHours"] = "com.gavdilabs.timesheet.WorkHours";
                Entity["Project"] = "com.gavdilabs.timesheet.Project";
                Entity["ProjectAssignment"] = "com.gavdilabs.timesheet.ProjectAssignment";
                Entity["ProjectEmployeeAID"] = "com.gavdilabs.timesheet.ProjectEmployeeAID";
                Entity["WeekOverview"] = "com.gavdilabs.timesheet.WeekOverview";
            })(Entity = timesheet.Entity || (timesheet.Entity = {}));
            let SanitizedEntity;
            (function (SanitizedEntity) {
                SanitizedEntity["AbsenceAttendanceType"] = "AbsenceAttendanceType";
                SanitizedEntity["Employee"] = "Employee";
                SanitizedEntity["WorkSchedule"] = "WorkSchedule";
                SanitizedEntity["WorkHours"] = "WorkHours";
                SanitizedEntity["Project"] = "Project";
                SanitizedEntity["ProjectAssignment"] = "ProjectAssignment";
                SanitizedEntity["ProjectEmployeeAID"] = "ProjectEmployeeAID";
                SanitizedEntity["WeekOverview"] = "WeekOverview";
            })(SanitizedEntity = timesheet.SanitizedEntity || (timesheet.SanitizedEntity = {}));
        })(timesheet = gavdilabs.timesheet || (gavdilabs.timesheet = {}));
    })(gavdilabs = com.gavdilabs || (com.gavdilabs = {}));
})(com = exports.com || (exports.com = {}));
var sap;
(function (sap) {
    var common;
    (function (common) {
        let Entity;
        (function (Entity) {
            Entity["Languages"] = "sap.common.Languages";
            Entity["Countries"] = "sap.common.Countries";
            Entity["Currencies"] = "sap.common.Currencies";
            Entity["Texts"] = "sap.common.Currencies.texts";
        })(Entity = common.Entity || (common.Entity = {}));
        let SanitizedEntity;
        (function (SanitizedEntity) {
            SanitizedEntity["Languages"] = "Languages";
            SanitizedEntity["Countries"] = "Countries";
            SanitizedEntity["Currencies"] = "Currencies";
            SanitizedEntity["Texts"] = "Texts";
        })(SanitizedEntity = common.SanitizedEntity || (common.SanitizedEntity = {}));
    })(common = sap.common || (sap.common = {}));
})(sap = exports.sap || (exports.sap = {}));
var TimesheetService;
(function (TimesheetService) {
    let FuncGetDateSpecificWorkSchedule;
    (function (FuncGetDateSpecificWorkSchedule) {
        FuncGetDateSpecificWorkSchedule["name"] = "GetDateSpecificWorkSchedule";
        FuncGetDateSpecificWorkSchedule["paramStartDate"] = "startDate";
        FuncGetDateSpecificWorkSchedule["paramEmployeeNumber"] = "employeeNumber";
    })(FuncGetDateSpecificWorkSchedule = TimesheetService.FuncGetDateSpecificWorkSchedule || (TimesheetService.FuncGetDateSpecificWorkSchedule = {}));
    let FuncGetWeekProgress;
    (function (FuncGetWeekProgress) {
        FuncGetWeekProgress["name"] = "GetWeekProgress";
        FuncGetWeekProgress["paramStartDate"] = "startDate";
        FuncGetWeekProgress["paramNumberOfDays"] = "numberOfDays";
        FuncGetWeekProgress["paramEmployeeNumber"] = "employeeNumber";
    })(FuncGetWeekProgress = TimesheetService.FuncGetWeekProgress || (TimesheetService.FuncGetWeekProgress = {}));
    let FuncGetProjectWorkedHours;
    (function (FuncGetProjectWorkedHours) {
        FuncGetProjectWorkedHours["name"] = "GetProjectWorkedHours";
        FuncGetProjectWorkedHours["paramEmployeeNumber"] = "employeeNumber";
        FuncGetProjectWorkedHours["paramProjectID"] = "projectID";
    })(FuncGetProjectWorkedHours = TimesheetService.FuncGetProjectWorkedHours || (TimesheetService.FuncGetProjectWorkedHours = {}));
    let Entity;
    (function (Entity) {
        Entity["Employees"] = "TimesheetService.Employees";
        Entity["AbsenceAttendanceType"] = "TimesheetService.AbsenceAttendanceType";
        Entity["WorkSchedule"] = "TimesheetService.WorkSchedule";
        Entity["WorkHours"] = "TimesheetService.WorkHours";
        Entity["Project"] = "TimesheetService.Project";
        Entity["ProjectAssignment"] = "TimesheetService.ProjectAssignment";
        Entity["ProjectEmployeeAID"] = "TimesheetService.ProjectEmployeeAID";
        Entity["WeekOverview"] = "TimesheetService.WeekOverview";
        Entity["Cust_scheduleToShifts"] = "TimesheetService.cust_scheduleToShifts";
        Entity["Cust_weekOverview"] = "TimesheetService.cust_weekOverview";
        Entity["Cust_ProjectEmployeeAID"] = "TimesheetService.cust_ProjectEmployeeAID";
    })(Entity = TimesheetService.Entity || (TimesheetService.Entity = {}));
    let SanitizedEntity;
    (function (SanitizedEntity) {
        SanitizedEntity["Employees"] = "Employees";
        SanitizedEntity["AbsenceAttendanceType"] = "AbsenceAttendanceType";
        SanitizedEntity["WorkSchedule"] = "WorkSchedule";
        SanitizedEntity["WorkHours"] = "WorkHours";
        SanitizedEntity["Project"] = "Project";
        SanitizedEntity["ProjectAssignment"] = "ProjectAssignment";
        SanitizedEntity["ProjectEmployeeAID"] = "ProjectEmployeeAID";
        SanitizedEntity["WeekOverview"] = "WeekOverview";
        SanitizedEntity["Cust_scheduleToShifts"] = "Cust_scheduleToShifts";
        SanitizedEntity["Cust_weekOverview"] = "Cust_weekOverview";
        SanitizedEntity["Cust_ProjectEmployeeAID"] = "Cust_ProjectEmployeeAID";
    })(SanitizedEntity = TimesheetService.SanitizedEntity || (TimesheetService.SanitizedEntity = {}));
})(TimesheetService = exports.TimesheetService || (exports.TimesheetService = {}));
var Entity;
(function (Entity) {
})(Entity = exports.Entity || (exports.Entity = {}));
var SanitizedEntity;
(function (SanitizedEntity) {
})(SanitizedEntity = exports.SanitizedEntity || (exports.SanitizedEntity = {}));
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZW50aXRpZXMuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi9zcmMvZW50aXRpZXMudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7O0FBQUEsSUFBaUIsR0FBRyxDQTBIbkI7QUExSEQsV0FBaUIsR0FBRztJQUFDLElBQUEsU0FBUyxDQTBIN0I7SUExSG9CLFdBQUEsU0FBUztRQUFDLElBQUEsU0FBUyxDQTBIdkM7UUExSDhCLFdBQUEsU0FBUztZQUt0QyxJQUFZLE9BUVg7WUFSRCxXQUFZLE9BQU87Z0JBQ2pCLHlDQUFNLENBQUE7Z0JBQ04sMkNBQU8sQ0FBQTtnQkFDUCwrQ0FBUyxDQUFBO2dCQUNULDZDQUFRLENBQUE7Z0JBQ1IseUNBQU0sQ0FBQTtnQkFDTiw2Q0FBUSxDQUFBO2dCQUNSLHlDQUFNLENBQUE7WUFDUixDQUFDLEVBUlcsT0FBTyxHQUFQLGlCQUFPLEtBQVAsaUJBQU8sUUFRbEI7WUF3RkQsSUFBWSxNQVNYO1lBVEQsV0FBWSxNQUFNO2dCQUNoQixpRkFBdUUsQ0FBQTtnQkFDdkUsdURBQTZDLENBQUE7Z0JBQzdDLCtEQUFxRCxDQUFBO2dCQUNyRCx5REFBK0MsQ0FBQTtnQkFDL0MscURBQTJDLENBQUE7Z0JBQzNDLHlFQUErRCxDQUFBO2dCQUMvRCwyRUFBaUUsQ0FBQTtnQkFDakUsK0RBQXFELENBQUE7WUFDdkQsQ0FBQyxFQVRXLE1BQU0sR0FBTixnQkFBTSxLQUFOLGdCQUFNLFFBU2pCO1lBRUQsSUFBWSxlQVNYO1lBVEQsV0FBWSxlQUFlO2dCQUN6QixrRUFBK0MsQ0FBQTtnQkFDL0Msd0NBQXFCLENBQUE7Z0JBQ3JCLGdEQUE2QixDQUFBO2dCQUM3QiwwQ0FBdUIsQ0FBQTtnQkFDdkIsc0NBQW1CLENBQUE7Z0JBQ25CLDBEQUF1QyxDQUFBO2dCQUN2Qyw0REFBeUMsQ0FBQTtnQkFDekMsZ0RBQTZCLENBQUE7WUFDL0IsQ0FBQyxFQVRXLGVBQWUsR0FBZix5QkFBZSxLQUFmLHlCQUFlLFFBUzFCO1FBQ0gsQ0FB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QixJQUFZLGVBQWtCO0FBQTlCLFdBQVksZUFBZTtBQUFFLENBQUMsRUFBbEIsZUFBZSxHQUFmLHVCQUFlLEtBQWYsdUJBQWUsUUFBRyIsInNvdXJjZXNDb250ZW50IjpbImV4cG9ydCBuYW1lc3BhY2UgY29tLmdhdmRpbGFicy50aW1lc2hlZXQge1xuICBleHBvcnQgdHlwZSBBdHlwZSA9IHN0cmluZztcbiAgZXhwb3J0IHR5cGUgRW1wbG95ZWVOdW1iZXIgPSBudW1iZXI7XG4gIGV4cG9ydCB0eXBlIEhvdXJzID0gbnVtYmVyO1xuXG4gIGV4cG9ydCBlbnVtIFdlZWtkYXkge1xuICAgIG1vbmRheSxcbiAgICB0dWVzZGF5LFxuICAgIHdlZG5lc2RheSxcbiAgICB0aHVyc2RheSxcbiAgICBmcmlkYXksXG4gICAgc2F0dXJkYXksXG4gICAgc3VuZGF5LFxuICB9XG5cbiAgZXhwb3J0IGludGVyZmFjZSBJQWJzZW5jZUF0dGVuZGFuY2VUeXBlIHtcbiAgICBBSUQ6IG51bWJlcjtcbiAgICBBQVR5cGU6IEF0eXBlO1xuICAgIGlzQWJzZW5jZTogYm9vbGVhbjtcbiAgfVxuXG4gIGV4cG9ydCBpbnRlcmZhY2UgSUVtcGxveWVlIHtcbiAgICB1c2VyTmFtZTogc3RyaW5nO1xuICAgIGVtcGxveWVlTnVtYmVyOiBFbXBsb3llZU51bWJlcjtcbiAgICBmaXJzdE5hbWU6IHN0cmluZztcbiAgICBsYXN0TmFtZTogc3RyaW5nO1xuICAgIHRpdGxlOiBzdHJpbmc7XG4gICAgcGljdHVyZVVybDogc3RyaW5nO1xuICAgIHBpY3R1cmVUeXBlOiBzdHJpbmc7XG4gICAgX3dvcmtTY2hlZHVsZT86IElXb3JrU2NoZWR1bGVbXTtcbiAgICBfd29ya0hvdXJzPzogSVdvcmtIb3Vyc1tdO1xuICAgIF9wcm9qZWN0QXNzaWdubWVudHM/OiBJUHJvamVjdEFzc2lnbm1lbnRbXTtcbiAgfVxuXG4gIGV4cG9ydCBpbnRlcmZhY2UgSVdvcmtTY2hlZHVsZSB7XG4gICAgSUQ6IHN0cmluZztcbiAgICB2YWxpZEZyb206IERhdGU7XG4gICAgdmFsaWRUbzogRGF0ZTtcbiAgICBlbXBsb3llZTogRW1wbG95ZWVOdW1iZXI7XG4gICAgd2Vla2RheTogV2Vla2RheTtcbiAgICBzdGFydHRpbWU6IERhdGU7XG4gICAgZW5kdGltZTogRGF0ZTtcbiAgICBfZW1wbG95ZWU/OiBJRW1wbG95ZWU7XG4gIH1cblxuICBleHBvcnQgaW50ZXJmYWNlIElXb3JrSG91cnMge1xuICAgIElEOiBzdHJpbmc7XG4gICAgY3JlYXRlZEF0PzogRGF0ZTtcbiAgICBjcmVhdGVkQnk/OiBzdHJpbmc7XG4gICAgbW9kaWZpZWRBdD86IERhdGU7XG4gICAgbW9kaWZpZWRCeT86IHN0cmluZztcbiAgICBlbXBsb3llZTogRW1wbG95ZWVOdW1iZXI7XG4gICAgd29ya2luZ0RheTogRGF0ZTtcbiAgICBmcm9tVGltZTogRGF0ZTtcbiAgICB0b1RpbWU6IERhdGU7XG4gICAgQUlEOiBudW1iZXI7XG4gICAgcHJvamVjdElEOiBzdHJpbmc7XG4gICAgX2VtcGxveWVlPzogSUVtcGxveWVlO1xuICAgIF9wcm9qZWN0PzogSVByb2plY3Q7XG4gICAgX2Fic0F0dGVuZGFuY2U/OiBJQWJzZW5jZUF0dGVuZGFuY2VUeXBlO1xuICB9XG5cbiAgZXhwb3J0IGludGVyZmFjZSBJUHJvamVjdCB7XG4gICAgdmFsaWRGcm9tOiBEYXRlO1xuICAgIHZhbGlkVG86IERhdGU7XG4gICAgSUQ6IHN0cmluZztcbiAgICBwcm9qZWN0TmFtZTogc3RyaW5nO1xuICAgIHRvdGFsSG91cnM6IEhvdXJzO1xuICAgIF9wcm9qZWN0QXNzaWdubWVudHM/OiBJUHJvamVjdEFzc2lnbm1lbnRbXTtcbiAgfVxuXG4gIGV4cG9ydCBpbnRlcmZhY2UgSVByb2plY3RBc3NpZ25tZW50IHtcbiAgICB2YWxpZEZyb206IERhdGU7XG4gICAgdmFsaWRUbzogRGF0ZTtcbiAgICBwcm9qZWN0SUQ6IHN0cmluZztcbiAgICBlbXBsb3llZTogRW1wbG95ZWVOdW1iZXI7XG4gICAgYXNzaWduZWRIb3VyczogSG91cnM7XG4gICAgX2VtcGxveWVlPzogSUVtcGxveWVlO1xuICAgIF9wcm9qZWN0PzogSVByb2plY3Q7XG4gIH1cblxuICBleHBvcnQgaW50ZXJmYWNlIElQcm9qZWN0RW1wbG95ZWVBSUQge1xuICAgIGVtcGxveWVlTnVtYmVyOiBudW1iZXI7XG4gICAgcHJvamVjdElEOiBzdHJpbmc7XG4gICAgdG90YWxIb3VyczogbnVtYmVyO1xuICAgIEFJRDogbnVtYmVyO1xuICAgIEFBVHlwZTogc3RyaW5nO1xuICAgIHBlcmNlbnRhZ2U6IG51bWJlcjtcbiAgICBpc1JlbWFpbmluZzogYm9vbGVhbjtcbiAgfVxuXG4gIGV4cG9ydCBpbnRlcmZhY2UgSVdlZWtPdmVydmlldyB7XG4gICAgc3RhcnREYXRlOiBzdHJpbmc7XG4gICAgbnVtYmVyT2ZEYXlzOiBudW1iZXI7XG4gICAgZW1wbG95ZWVOdW1iZXI6IG51bWJlcjtcbiAgICB0b3RhbFdvcmtlZEhvdXJzOiBudW1iZXI7XG4gICAgdG90YWxTY2hlZHVsZWRIb3VyczogbnVtYmVyO1xuICAgIHRvdGFsV29ya2VkRGF5czogbnVtYmVyO1xuICAgIHRvdGFsU2NoZWR1bGVzRGF5czogbnVtYmVyO1xuICB9XG5cbiAgZXhwb3J0IGVudW0gRW50aXR5IHtcbiAgICBBYnNlbmNlQXR0ZW5kYW5jZVR5cGUgPSBcImNvbS5nYXZkaWxhYnMudGltZXNoZWV0LkFic2VuY2VBdHRlbmRhbmNlVHlwZVwiLFxuICAgIEVtcGxveWVlID0gXCJjb20uZ2F2ZGlsYWJzLnRpbWVzaGVldC5FbXBsb3llZVwiLFxuICAgIFdvcmtTY2hlZHVsZSA9IFwiY29tLmdhdmRpbGFicy50aW1lc2hlZXQuV29ya1NjaGVkdWxlXCIsXG4gICAgV29ya0hvdXJzID0gXCJjb20uZ2F2ZGlsYWJzLnRpbWVzaGVldC5Xb3JrSG91cnNcIixcbiAgICBQcm9qZWN0ID0gXCJjb20uZ2F2ZGlsYWJzLnRpbWVzaGVldC5Qcm9qZWN0XCIsXG4gICAgUHJvamVjdEFzc2lnbm1lbnQgPSBcImNvbS5nYXZkaWxhYnMudGltZXNoZWV0LlByb2plY3RBc3NpZ25tZW50XCIsXG4gICAgUHJvamVjdEVtcGxveWVlQUlEID0gXCJjb20uZ2F2ZGlsYWJzLnRpbWVzaGVldC5Qcm9qZWN0RW1wbG95ZWVBSURcIixcbiAgICBXZWVrT3ZlcnZpZXcgPSBcImNvbS5nYXZkaWxhYnMudGltZXNoZWV0LldlZWtPdmVydmlld1wiLFxuICB9XG5cbiAgZXhwb3J0IGVudW0gU2FuaXRpemVkRW50aXR5IHtcbiAgICBBYnNlbmNlQXR0ZW5kYW5jZVR5cGUgPSBcIkFic2VuY2VBdHRlbmRhbmNlVHlwZVwiLFxuICAgIEVtcGxveWVlID0gXCJFbXBsb3llZVwiLFxuICAgIFdvcmtTY2hlZHVsZSA9IFwiV29ya1NjaGVkdWxlXCIsXG4gICAgV29ya0hvdXJzID0gXCJXb3JrSG91cnNcIixcbiAgICBQcm9qZWN0ID0gXCJQcm9qZWN0XCIsXG4gICAgUHJvamVjdEFzc2lnbm1lbnQgPSBcIlByb2plY3RBc3NpZ25tZW50XCIsXG4gICAgUHJvamVjdEVtcGxveWVlQUlEID0gXCJQcm9qZWN0RW1wbG95ZWVBSURcIixcbiAgICBXZWVrT3ZlcnZpZXcgPSBcIldlZWtPdmVydmlld1wiLFxuICB9XG59XG5cbmV4cG9ydCBuYW1lc3BhY2Ugc2FwLmNvbW1vbiB7XG4gIGV4cG9ydCBpbnRlcmZhY2UgSUxhbmd1YWdlcyB7XG4gICAgbmFtZTogc3RyaW5nO1xuICAgIGRlc2NyOiBzdHJpbmc7XG4gICAgY29kZTogc3RyaW5nO1xuICAgIHRleHRzOiBJVGV4dHNbXTtcbiAgICBsb2NhbGl6ZWQ/OiBJVGV4dHM7XG4gIH1cblxuICBleHBvcnQgaW50ZXJmYWNlIElDb3VudHJpZXMge1xuICAgIG5hbWU6IHN0cmluZztcbiAgICBkZXNjcjogc3RyaW5nO1xuICAgIGNvZGU6IHN0cmluZztcbiAgICB0ZXh0czogSVRleHRzW107XG4gICAgbG9jYWxpemVkPzogSVRleHRzO1xuICB9XG5cbiAgZXhwb3J0IGludGVyZmFjZSBJQ3VycmVuY2llcyB7XG4gICAgbmFtZTogc3RyaW5nO1xuICAgIGRlc2NyOiBzdHJpbmc7XG4gICAgY29kZTogc3RyaW5nO1xuICAgIHN5bWJvbDogc3RyaW5nO1xuICAgIHRleHRzOiBJVGV4dHNbXTtcbiAgICBsb2NhbGl6ZWQ/OiBJVGV4dHM7XG4gIH1cblxuICBleHBvcnQgaW50ZXJmYWNlIElUZXh0cyB7XG4gICAgbG9jYWxlOiBzdHJpbmc7XG4gICAgbmFtZTogc3RyaW5nO1xuICAgIGRlc2NyOiBzdHJpbmc7XG4gICAgY29kZTogc3RyaW5nO1xuICB9XG5cbiAgZXhwb3J0IGludGVyZmFjZSBJVGV4dHMge1xuICAgIGxvY2FsZTogc3RyaW5nO1xuICAgIG5hbWU6IHN0cmluZztcbiAgICBkZXNjcjogc3RyaW5nO1xuICAgIGNvZGU6IHN0cmluZztcbiAgfVxuXG4gIGV4cG9ydCBpbnRlcmZhY2UgSVRleHRzIHtcbiAgICBsb2NhbGU6IHN0cmluZztcbiAgICBuYW1lOiBzdHJpbmc7XG4gICAgZGVzY3I6IHN0cmluZztcbiAgICBjb2RlOiBzdHJpbmc7XG4gIH1cblxuICBleHBvcnQgZW51bSBFbnRpdHkge1xuICAgIExhbmd1YWdlcyA9IFwic2FwLmNvbW1vbi5MYW5ndWFnZXNcIixcbiAgICBDb3VudHJpZXMgPSBcInNhcC5jb21tb24uQ291bnRyaWVzXCIsXG4gICAgQ3VycmVuY2llcyA9IFwic2FwLmNvbW1vbi5DdXJyZW5jaWVzXCIsXG4gICAgVGV4dHMgPSBcInNhcC5jb21tb24uQ3VycmVuY2llcy50ZXh0c1wiLFxuICB9XG5cbiAgZXhwb3J0IGVudW0gU2FuaXRpemVkRW50aXR5IHtcbiAgICBMYW5ndWFnZXMgPSBcIkxhbmd1YWdlc1wiLFxuICAgIENvdW50cmllcyA9IFwiQ291bnRyaWVzXCIsXG4gICAgQ3VycmVuY2llcyA9IFwiQ3VycmVuY2llc1wiLFxuICAgIFRleHRzID0gXCJUZXh0c1wiLFxuICB9XG59XG5cbmV4cG9ydCBuYW1lc3BhY2UgVGltZXNoZWV0U2VydmljZSB7XG4gIGV4cG9ydCBpbnRlcmZhY2UgSUVtcGxveWVlcyB7XG4gICAgdXNlck5hbWU6IHN0cmluZztcbiAgICBlbXBsb3llZU51bWJlcjogY29tLmdhdmRpbGFicy50aW1lc2hlZXQuRW1wbG95ZWVOdW1iZXI7XG4gICAgZmlyc3ROYW1lOiBzdHJpbmc7XG4gICAgbGFzdE5hbWU6IHN0cmluZztcbiAgICB0aXRsZTogc3RyaW5nO1xuICAgIHBpY3R1cmVVcmw6IHN0cmluZztcbiAgICBwaWN0dXJlVHlwZTogc3RyaW5nO1xuICAgIF93b3JrU2NoZWR1bGU/OiBJV29ya1NjaGVkdWxlW107XG4gICAgX3dvcmtIb3Vycz86IElXb3JrSG91cnNbXTtcbiAgICBfcHJvamVjdEFzc2lnbm1lbnRzPzogSVByb2plY3RBc3NpZ25tZW50W107XG4gIH1cblxuICBleHBvcnQgaW50ZXJmYWNlIElBYnNlbmNlQXR0ZW5kYW5jZVR5cGUge1xuICAgIEFJRDogbnVtYmVyO1xuICAgIEFBVHlwZTogY29tLmdhdmRpbGFicy50aW1lc2hlZXQuQXR5cGU7XG4gICAgaXNBYnNlbmNlOiBib29sZWFuO1xuICB9XG5cbiAgZXhwb3J0IGludGVyZmFjZSBJV29ya1NjaGVkdWxlIHtcbiAgICBJRDogc3RyaW5nO1xuICAgIHZhbGlkRnJvbTogRGF0ZTtcbiAgICB2YWxpZFRvOiBEYXRlO1xuICAgIGVtcGxveWVlOiBjb20uZ2F2ZGlsYWJzLnRpbWVzaGVldC5FbXBsb3llZU51bWJlcjtcbiAgICB3ZWVrZGF5OiBjb20uZ2F2ZGlsYWJzLnRpbWVzaGVldC5XZWVrZGF5O1xuICAgIHN0YXJ0dGltZTogRGF0ZTtcbiAgICBlbmR0aW1lOiBEYXRlO1xuICAgIF9lbXBsb3llZT86IElFbXBsb3llZXM7XG4gIH1cblxuICBleHBvcnQgaW50ZXJmYWNlIElXb3JrSG91cnMge1xuICAgIElEOiBzdHJpbmc7XG4gICAgY3JlYXRlZEF0PzogRGF0ZTtcbiAgICBjcmVhdGVkQnk/OiBzdHJpbmc7XG4gICAgbW9kaWZpZWRBdD86IERhdGU7XG4gICAgbW9kaWZpZWRCeT86IHN0cmluZztcbiAgICBlbXBsb3llZTogY29tLmdhdmRpbGFicy50aW1lc2hlZXQuRW1wbG95ZWVOdW1iZXI7XG4gICAgd29ya2luZ0RheTogRGF0ZTtcbiAgICBmcm9tVGltZTogRGF0ZTtcbiAgICB0b1RpbWU6IERhdGU7XG4gICAgQUlEOiBudW1iZXI7XG4gICAgcHJvamVjdElEOiBzdHJpbmc7XG4gICAgX2VtcGxveWVlPzogSUVtcGxveWVlcztcbiAgICBfcHJvamVjdD86IElQcm9qZWN0O1xuICAgIF9hYnNBdHRlbmRhbmNlPzogSUFic2VuY2VBdHRlbmRhbmNlVHlwZTtcbiAgfVxuXG4gIGV4cG9ydCBpbnRlcmZhY2UgSVByb2plY3Qge1xuICAgIHZhbGlkRnJvbTogRGF0ZTtcbiAgICB2YWxpZFRvOiBEYXRlO1xuICAgIElEOiBzdHJpbmc7XG4gICAgcHJvamVjdE5hbWU6IHN0cmluZztcbiAgICB0b3RhbEhvdXJzOiBjb20uZ2F2ZGlsYWJzLnRpbWVzaGVldC5Ib3VycztcbiAgICBfcHJvamVjdEFzc2lnbm1lbnRzPzogSVByb2plY3RBc3NpZ25tZW50W107XG4gIH1cblxuICBleHBvcnQgaW50ZXJmYWNlIElQcm9qZWN0QXNzaWdubWVudCB7XG4gICAgdmFsaWRGcm9tOiBEYXRlO1xuICAgIHZhbGlkVG86IERhdGU7XG4gICAgcHJvamVjdElEOiBzdHJpbmc7XG4gICAgZW1wbG95ZWU6IGNvbS5nYXZkaWxhYnMudGltZXNoZWV0LkVtcGxveWVlTnVtYmVyO1xuICAgIGFzc2lnbmVkSG91cnM6IGNvbS5nYXZkaWxhYnMudGltZXNoZWV0LkhvdXJzO1xuICAgIF9lbXBsb3llZT86IElFbXBsb3llZXM7XG4gICAgX3Byb2plY3Q/OiBJUHJvamVjdDtcbiAgfVxuXG4gIGV4cG9ydCBpbnRlcmZhY2UgSVByb2plY3RFbXBsb3llZUFJRCB7XG4gICAgZW1wbG95ZWVOdW1iZXI6IG51bWJlcjtcbiAgICBwcm9qZWN0SUQ6IHN0cmluZztcbiAgICB0b3RhbEhvdXJzOiBudW1iZXI7XG4gICAgQUlEOiBudW1iZXI7XG4gICAgQUFUeXBlOiBzdHJpbmc7XG4gICAgcGVyY2VudGFnZTogbnVtYmVyO1xuICAgIGlzUmVtYWluaW5nOiBib29sZWFuO1xuICB9XG5cbiAgZXhwb3J0IGludGVyZmFjZSBJV2Vla092ZXJ2aWV3IHtcbiAgICBzdGFydERhdGU6IHN0cmluZztcbiAgICBudW1iZXJPZkRheXM6IG51bWJlcjtcbiAgICBlbXBsb3llZU51bWJlcjogbnVtYmVyO1xuICAgIHRvdGFsV29ya2VkSG91cnM6IG51bWJlcjtcbiAgICB0b3RhbFNjaGVkdWxlZEhvdXJzOiBudW1iZXI7XG4gICAgdG90YWxXb3JrZWREYXlzOiBudW1iZXI7XG4gICAgdG90YWxTY2hlZHVsZXNEYXlzOiBudW1iZXI7XG4gIH1cblxuICBleHBvcnQgaW50ZXJmYWNlIElDdXN0X3NjaGVkdWxlVG9TaGlmdHMge1xuICAgIHN0YXJ0VGltZTogRGF0ZTtcbiAgICBlbmRUaW1lOiBEYXRlO1xuICB9XG5cbiAgZXhwb3J0IGludGVyZmFjZSBJQ3VzdF93ZWVrT3ZlcnZpZXcge1xuICAgIHRvdGFsV29ya2VkSG91cnM6IG51bWJlcjtcbiAgICB0b3RhbFNjaGVkdWxlZEhvdXJzOiBudW1iZXI7XG4gICAgdG90YWxXb3JrZWREYXlzOiBudW1iZXI7XG4gICAgdG90YWxTY2hlZHVsZXNEYXlzOiBudW1iZXI7XG4gIH1cblxuICBleHBvcnQgaW50ZXJmYWNlIElDdXN0X1Byb2plY3RFbXBsb3llZUFJRCB7XG4gICAgdG90YWxIb3VyczogbnVtYmVyO1xuICAgIEFJRDogbnVtYmVyO1xuICAgIEFBVHlwZTogc3RyaW5nO1xuICAgIHBlcmNlbnRhZ2U6IG51bWJlcjtcbiAgfVxuXG4gIGV4cG9ydCBlbnVtIEZ1bmNHZXREYXRlU3BlY2lmaWNXb3JrU2NoZWR1bGUge1xuICAgIG5hbWUgPSBcIkdldERhdGVTcGVjaWZpY1dvcmtTY2hlZHVsZVwiLFxuICAgIHBhcmFtU3RhcnREYXRlID0gXCJzdGFydERhdGVcIixcbiAgICBwYXJhbUVtcGxveWVlTnVtYmVyID0gXCJlbXBsb3llZU51bWJlclwiLFxuICB9XG5cbiAgZXhwb3J0IGludGVyZmFjZSBJRnVuY0dldERhdGVTcGVjaWZpY1dvcmtTY2hlZHVsZVBhcmFtcyB7XG4gICAgc3RhcnREYXRlOiBzdHJpbmc7XG4gICAgZW1wbG95ZWVOdW1iZXI6IG51bWJlcjtcbiAgfVxuXG4gIGV4cG9ydCB0eXBlIEZ1bmNHZXREYXRlU3BlY2lmaWNXb3JrU2NoZWR1bGVSZXR1cm4gPSBJQ3VzdF9zY2hlZHVsZVRvU2hpZnRzW107XG5cbiAgZXhwb3J0IGVudW0gRnVuY0dldFdlZWtQcm9ncmVzcyB7XG4gICAgbmFtZSA9IFwiR2V0V2Vla1Byb2dyZXNzXCIsXG4gICAgcGFyYW1TdGFydERhdGUgPSBcInN0YXJ0RGF0ZVwiLFxuICAgIHBhcmFtTnVtYmVyT2ZEYXlzID0gXCJudW1iZXJPZkRheXNcIixcbiAgICBwYXJhbUVtcGxveWVlTnVtYmVyID0gXCJlbXBsb3llZU51bWJlclwiLFxuICB9XG5cbiAgZXhwb3J0IGludGVyZmFjZSBJRnVuY0dldFdlZWtQcm9ncmVzc1BhcmFtcyB7XG4gICAgc3RhcnREYXRlOiBzdHJpbmc7XG4gICAgbnVtYmVyT2ZEYXlzOiBudW1iZXI7XG4gICAgZW1wbG95ZWVOdW1iZXI6IG51bWJlcjtcbiAgfVxuXG4gIGV4cG9ydCB0eXBlIEZ1bmNHZXRXZWVrUHJvZ3Jlc3NSZXR1cm4gPSBJQ3VzdF93ZWVrT3ZlcnZpZXc7XG5cbiAgZXhwb3J0IGVudW0gRnVuY0dldFByb2plY3RXb3JrZWRIb3VycyB7XG4gICAgbmFtZSA9IFwiR2V0UHJvamVjdFdvcmtlZEhvdXJzXCIsXG4gICAgcGFyYW1FbXBsb3llZU51bWJlciA9IFwiZW1wbG95ZWVOdW1iZXJcIixcbiAgICBwYXJhbVByb2plY3RJRCA9IFwicHJvamVjdElEXCIsXG4gIH1cblxuICBleHBvcnQgaW50ZXJmYWNlIElGdW5jR2V0UHJvamVjdFdvcmtlZEhvdXJzUGFyYW1zIHtcbiAgICBlbXBsb3llZU51bWJlcjogbnVtYmVyO1xuICAgIHByb2plY3RJRDogc3RyaW5nO1xuICB9XG5cbiAgZXhwb3J0IHR5cGUgRnVuY0dldFByb2plY3RXb3JrZWRIb3Vyc1JldHVybiA9IElDdXN0X1Byb2plY3RFbXBsb3llZUFJRFtdO1xuXG4gIGV4cG9ydCBlbnVtIEVudGl0eSB7XG4gICAgRW1wbG95ZWVzID0gXCJUaW1lc2hlZXRTZXJ2aWNlLkVtcGxveWVlc1wiLFxuICAgIEFic2VuY2VBdHRlbmRhbmNlVHlwZSA9IFwiVGltZXNoZWV0U2VydmljZS5BYnNlbmNlQXR0ZW5kYW5jZVR5cGVcIixcbiAgICBXb3JrU2NoZWR1bGUgPSBcIlRpbWVzaGVldFNlcnZpY2UuV29ya1NjaGVkdWxlXCIsXG4gICAgV29ya0hvdXJzID0gXCJUaW1lc2hlZXRTZXJ2aWNlLldvcmtIb3Vyc1wiLFxuICAgIFByb2plY3QgPSBcIlRpbWVzaGVldFNlcnZpY2UuUHJvamVjdFwiLFxuICAgIFByb2plY3RBc3NpZ25tZW50ID0gXCJUaW1lc2hlZXRTZXJ2aWNlLlByb2plY3RBc3NpZ25tZW50XCIsXG4gICAgUHJvamVjdEVtcGxveWVlQUlEID0gXCJUaW1lc2hlZXRTZXJ2aWNlLlByb2plY3RFbXBsb3llZUFJRFwiLFxuICAgIFdlZWtPdmVydmlldyA9IFwiVGltZXNoZWV0U2VydmljZS5XZWVrT3ZlcnZpZXdcIixcbiAgICBDdXN0X3NjaGVkdWxlVG9TaGlmdHMgPSBcIlRpbWVzaGVldFNlcnZpY2UuY3VzdF9zY2hlZHVsZVRvU2hpZnRzXCIsXG4gICAgQ3VzdF93ZWVrT3ZlcnZpZXcgPSBcIlRpbWVzaGVldFNlcnZpY2UuY3VzdF93ZWVrT3ZlcnZpZXdcIixcbiAgICBDdXN0X1Byb2plY3RFbXBsb3llZUFJRCA9IFwiVGltZXNoZWV0U2VydmljZS5jdXN0X1Byb2plY3RFbXBsb3llZUFJRFwiLFxuICB9XG5cbiAgZXhwb3J0IGVudW0gU2FuaXRpemVkRW50aXR5IHtcbiAgICBFbXBsb3llZXMgPSBcIkVtcGxveWVlc1wiLFxuICAgIEFic2VuY2VBdHRlbmRhbmNlVHlwZSA9IFwiQWJzZW5jZUF0dGVuZGFuY2VUeXBlXCIsXG4gICAgV29ya1NjaGVkdWxlID0gXCJXb3JrU2NoZWR1bGVcIixcbiAgICBXb3JrSG91cnMgPSBcIldvcmtIb3Vyc1wiLFxuICAgIFByb2plY3QgPSBcIlByb2plY3RcIixcbiAgICBQcm9qZWN0QXNzaWdubWVudCA9IFwiUHJvamVjdEFzc2lnbm1lbnRcIixcbiAgICBQcm9qZWN0RW1wbG95ZWVBSUQgPSBcIlByb2plY3RFbXBsb3llZUFJRFwiLFxuICAgIFdlZWtPdmVydmlldyA9IFwiV2Vla092ZXJ2aWV3XCIsXG4gICAgQ3VzdF9zY2hlZHVsZVRvU2hpZnRzID0gXCJDdXN0X3NjaGVkdWxlVG9TaGlmdHNcIixcbiAgICBDdXN0X3dlZWtPdmVydmlldyA9IFwiQ3VzdF93ZWVrT3ZlcnZpZXdcIixcbiAgICBDdXN0X1Byb2plY3RFbXBsb3llZUFJRCA9IFwiQ3VzdF9Qcm9qZWN0RW1wbG95ZWVBSURcIixcbiAgfVxufVxuXG5leHBvcnQgdHlwZSBVc2VyID0gc3RyaW5nO1xuXG5leHBvcnQgZW51bSBFbnRpdHkge31cblxuZXhwb3J0IGVudW0gU2FuaXRpemVkRW50aXR5IHt9XG4iXX0=