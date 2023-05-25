"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
const cds_routing_handlers_1 = require("cds-routing-handlers");
const entities_1 = require("../../entities");
const typedi_1 = require("typedi");
let GetWeekProgressHandler = class GetWeekProgressHandler {
    async GetWeekProgress(req, weekStartDate, numberOfDays, employeeNumber) {
        let workScheduleMap = new Map();
        let workHoursMap = new Map();
        let totalWorkedHours = 0;
        let totalHours = 0;
        const calendarStartDate = new Date(weekStartDate);
        const calendarEndDate = this.addDays(calendarStartDate, numberOfDays);
        let queryEmployeeSchedule = SELECT.from('WorkSchedule').where({ employee: employeeNumber });
        let employeeSchedule = await cds.run(queryEmployeeSchedule);
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
        });
        let workHours = await cds.run(queryWorkHours);
        workHours.forEach(shift => {
            if (shift._absAttendance.isAbsence == false) {
                var d1 = new Date(shift.fromTime);
                var d2 = new Date(shift.toTime);
                if (d1 >= calendarStartDate && d2 <= calendarEndDate) {
                    var sub = (d2.getTime() - d1.getTime()) / 3600000;
                    totalWorkedHours = totalWorkedHours + sub;
                    if (workHoursMap.has(shift.workingDay)) {
                        workHoursMap.set(shift.workingDay, workHoursMap.get(shift.workingDay) + sub);
                    }
                    else {
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
        };
        return weekOverview;
    }
    formatDateToString(dateIn) {
        var yyyy = dateIn.getFullYear();
        var mm = dateIn.getMonth() + 1; // getMonth() is zero-based
        var dd = dateIn.getDate();
        return String(yyyy) + "-" + (mm < 10 ? "0" : "") + String(mm) + "-" + (dd < 10 ? "0" : "") + String(dd); // Leading zeros for mm and dd
    }
    addDays(date, days) {
        var result = new Date(date);
        result.setDate(result.getDate() + days);
        return result;
    }
};
__decorate([
    (0, cds_routing_handlers_1.Func)(entities_1.TimesheetService.FuncGetWeekProgress.name),
    __param(0, (0, cds_routing_handlers_1.Req)()),
    __param(1, (0, cds_routing_handlers_1.Param)(entities_1.TimesheetService.FuncGetWeekProgress.paramStartDate)),
    __param(2, (0, cds_routing_handlers_1.Param)(entities_1.TimesheetService.FuncGetWeekProgress.paramNumberOfDays)),
    __param(3, (0, cds_routing_handlers_1.Param)(entities_1.TimesheetService.FuncGetWeekProgress.paramEmployeeNumber)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, String, Number, Number]),
    __metadata("design:returntype", Promise)
], GetWeekProgressHandler.prototype, "GetWeekProgress", null);
GetWeekProgressHandler = __decorate([
    (0, cds_routing_handlers_1.Handler)(),
    (0, typedi_1.Service)()
], GetWeekProgressHandler);
exports.default = GetWeekProgressHandler;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiR2V0V2Vla1Byb2dyZXNzSGFuZGxlci5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uL3NyYy9hcGkvZnVuY3Rpb25zL0dldFdlZWtQcm9ncmVzc0hhbmRsZXIudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7QUFBQSwrREFBaUU7QUFDakUsNkNBQWtEO0FBQ2xELG1DQUFpQztBQUlsQixJQUFNLHNCQUFzQixHQUE1QixNQUFNLHNCQUFzQjtJQUUxQixBQUFOLEtBQUssQ0FBQyxlQUFlLENBQ2pCLEdBQVEsRUFDNkMsYUFBcUIsRUFDbEIsWUFBb0IsRUFDbEIsY0FBc0I7UUFHdkYsSUFBSSxlQUFlLEdBQUcsSUFBSSxHQUFHLEVBQXlCLENBQUM7UUFDdkQsSUFBSSxZQUFZLEdBQUcsSUFBSSxHQUFHLEVBQXVCLENBQUM7UUFDbEQsSUFBSSxnQkFBZ0IsR0FBRyxDQUFDLENBQUM7UUFDekIsSUFBSSxVQUFVLEdBQUcsQ0FBQyxDQUFDO1FBRW5CLE1BQU0saUJBQWlCLEdBQUcsSUFBSSxJQUFJLENBQUMsYUFBYSxDQUFDLENBQUE7UUFDakQsTUFBTSxlQUFlLEdBQUcsSUFBSSxDQUFDLE9BQU8sQ0FBQyxpQkFBaUIsRUFBRSxZQUFZLENBQUMsQ0FBQTtRQUVyRSxJQUFJLHFCQUFxQixHQUFHLE1BQU0sQ0FBQyxJQUFJLENBQUMsY0FBYyxDQUFDLENBQUMsS0FBSyxDQUFDLEVBQUUsUUFBUSxFQUFFLGNBQWMsRUFBRSxDQUFDLENBQUE7UUFDM0YsSUFBSSxnQkFBZ0IsR0FBRyxNQUFNLEdBQUcsQ0FBQyxHQUFHLENBQUMscUJBQXFCLENBQXFDLENBQUE7UUFFL0YsZ0JBQWdCLENBQUMsT0FBTyxDQUFDLE9BQU8sQ0FBQyxFQUFFO1lBQy9CLElBQUksWUFBWSxJQUFJLENBQUMsSUFBSSxDQUFDLFlBQVksSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDLE1BQU0sQ0FBQyxPQUFPLENBQUMsT0FBTyxDQUFDLElBQUks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QUFzQixDQWtGMUM7a0JBbEZvQixzQkFBc0IiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBGdW5jLCBIYW5kbGVyLCBQYXJhbSwgUmVxIH0gZnJvbSBcImNkcy1yb3V0aW5nLWhhbmRsZXJzXCI7XG5pbXBvcnQgeyBUaW1lc2hlZXRTZXJ2aWNlIH0gZnJvbSBcIi4uLy4uL2VudGl0aWVzXCI7XG5pbXBvcnQgeyBTZXJ2aWNlIH0gZnJvbSBcInR5cGVkaVwiO1xuXG5ASGFuZGxlcigpXG5AU2VydmljZSgpXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBHZXRXZWVrUHJvZ3Jlc3NIYW5kbGVyIHtcbiAgICBARnVuYyhUaW1lc2hlZXRTZXJ2aWNlLkZ1bmNHZXRXZWVrUHJvZ3Jlc3MubmFtZSlcbiAgICBwdWJsaWMgYXN5bmMgR2V0V2Vla1Byb2dyZXNzKFxuICAgICAgICBAUmVxKCkgcmVxOiBhbnksXG4gICAgICAgIEBQYXJhbShUaW1lc2hlZXRTZXJ2aWNlLkZ1bmNHZXRXZWVrUHJvZ3Jlc3MucGFyYW1TdGFydERhdGUpIHdlZWtTdGFydERhdGU6IHN0cmluZyxcbiAgICAgICAgQFBhcmFtKFRpbWVzaGVldFNlcnZpY2UuRnVuY0dldFdlZWtQcm9ncmVzcy5wYXJhbU51bWJlck9mRGF5cykgbnVtYmVyT2ZEYXlzOiBudW1iZXIsXG4gICAgICAgIEBQYXJhbShUaW1lc2hlZXRTZXJ2aWNlLkZ1bmNHZXRXZWVrUHJvZ3Jlc3MucGFyYW1FbXBsb3llZU51bWJlcikgZW1wbG95ZWVOdW1iZXI6IG51bWJlclxuICAgICk6IFByb21pc2U8VGltZXNoZWV0U2VydmljZS5JQ3VzdF93ZWVrT3ZlcnZpZXc+IHtcblxuICAgICAgICBsZXQgd29ya1NjaGVkdWxlTWFwID0gbmV3IE1hcCgpIGFzIE1hcDxzdHJpbmcsIG51bWJlcj47XG4gICAgICAgIGxldCB3b3JrSG91cnNNYXAgPSBuZXcgTWFwKCkgYXMgTWFwPERhdGUsIG51bWJlcj47XG4gICAgICAgIGxldCB0b3RhbFdvcmtlZEhvdXJzID0gMDtcbiAgICAgICAgbGV0IHRvdGFsSG91cnMgPSAwO1xuXG4gICAgICAgIGNvbnN0IGNhbGVuZGFyU3RhcnREYXRlID0gbmV3IERhdGUod2Vla1N0YXJ0RGF0ZSlcbiAgICAgICAgY29uc3QgY2FsZW5kYXJFbmREYXRlID0gdGhpcy5hZGREYXlzKGNhbGVuZGFyU3RhcnREYXRlLCBudW1iZXJPZkRheXMpXG5cbiAgICAgICAgbGV0IHF1ZXJ5RW1wbG95ZWVTY2hlZHVsZSA9IFNFTEVDVC5mcm9tKCdXb3JrU2NoZWR1bGUnKS53aGVyZSh7IGVtcGxveWVlOiBlbXBsb3llZU51bWJlciB9KVxuICAgICAgICBsZXQgZW1wbG95ZWVTY2hlZHVsZSA9IGF3YWl0IGNkcy5ydW4ocXVlcnlFbXBsb3llZVNjaGVkdWxlKSBhcyBUaW1lc2hlZXRTZXJ2aWNlLklXb3JrU2NoZWR1bGVbXVxuXG4gICAgICAgIGVtcGxveWVlU2NoZWR1bGUuZm9yRWFjaCh3b3JrRGF5ID0+IHtcbiAgICAgICAgICAgIGlmIChudW1iZXJPZkRheXMgPT0gNyB8fCAobnVtYmVyT2ZEYXlzID09IDUgJiYgIShTdHJpbmcod29ya0RheS53ZWVrZGF5KSA9PSBcInNhdHVyZGF5XCIgfHwgU3RyaW5nKHdvcmtEYXkud2Vla2RheSkgPT0gXCJzdW5kYXlcIikpKSB7XG4gICAgICAgICAgICAgICAgdmFyIGQxID0gbmV3IERhdGUoXCIxOTcwLTAxLTAxVFwiICsgd29ya0RheS5zdGFydHRpbWUpO1xuICAgICAgICAgICAgICAgIHZhciBkMiA9IG5ldyBEYXRlKFwiMTk3MC0wMS0wMVRcIiArIHdvcmtEYXkuZW5kdGltZSk7XG4gICAgICAgICAgICAgICAgdmFyIHN1YiA9IChkMi5nZXRUaW1lKCkgLSBkMS5nZXRUaW1lKCkpIC8gMzYwMDAwMDtcbiAgICAgICAgICAgICAgICBpZiAoc3ViICE9IDApIHtcbiAgICAgICAgICAgICAgICAgICAgd29ya1NjaGVkdWxlTWFwLnNldChTdHJpbmcod29ya0RheS53ZWVrZGF5KSwgc3ViKTtcbiAgICAgICAgICAgICAgICAgICAgdG90YWxIb3VycyA9IHRvdGFsSG91cnMgKyBzdWI7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICB9KTtcblxuICAgICAgICBsZXQgcXVlcnlXb3JrSG91cnMgPSBTRUxFQ1QuZnJvbSgnV29ya0hvdXJzJykud2hlcmUoeyBlbXBsb3llZTogZW1wbG95ZWVOdW1iZXIgfSlcbiAgICAgICAgICAgIC5jb2x1bW5zKGVsID0+IHtcbiAgICAgICAgICAgICAgICAgICAgZWwuZnJvbVRpbWUsXG4gICAgICAgICAgICAgICAgICAgIGVsLnRvVGltZSxcbiAgICAgICAgICAgICAgICAgICAgZWwud29ya2luZ0RheSxcbiAgICAgICAgICAgICAgICAgICAgZWwuX2Fic0F0dGVuZGFuY2UoanIgPT4ge1xuICAgICAgICAgICAgICAgICAgICAgICAganIuaXNBYnNlbmNlO1xuICAgICAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIH0pXG5cbiAgICAgICAgbGV0IHdvcmtIb3VycyA9IGF3YWl0IGNkcy5ydW4ocXVlcnlXb3JrSG91cnMpIGFzIFRpbWVzaGVldFNlcnZpY2UuSVdvcmtIb3Vyc1tdXG4gICAgICAgIHdvcmtIb3Vycy5mb3JFYWNoKHNoaWZ0ID0+IHtcbiAgICAgICAgICAgIGlmIChzaGlmdC5fYWJzQXR0ZW5kYW5jZS5pc0Fic2VuY2UgPT0gZmFsc2UpIHtcbiAgICAgICAgICAgICAgICB2YXIgZDEgPSBuZXcgRGF0ZShzaGlmdC5mcm9tVGltZSk7XG4gICAgICAgICAgICAgICAgdmFyIGQyID0gbmV3IERhdGUoc2hpZnQudG9UaW1lKTtcbiAgICAgICAgICAgICAgICBpZiAoZDEgPj0gY2FsZW5kYXJTdGFydERhdGUgJiYgZDIgPD0gY2FsZW5kYXJFbmREYXRlKSB7XG4gICAgICAgICAgICAgICAgICAgIHZhciBzdWIgPSAoZDIuZ2V0VGltZSgpIC0gZDEuZ2V0VGltZSgpKSAvIDM2MDAwMDA7XG4gICAgICAgICAgICAgICAgICAgIHRvdGFsV29ya2VkSG91cnMgPSB0b3RhbFdvcmtlZEhvdXJzICsgc3ViO1xuXG4gICAgICAgICAgICAgICAgICAgIGlmICh3b3JrSG91cnNNYXAuaGFzKHNoaWZ0LndvcmtpbmdEYXkpKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICB3b3JrSG91cnNNYXAuc2V0KHNoaWZ0LndvcmtpbmdEYXksIHdvcmtIb3Vyc01hcC5nZXQoc2hpZnQud29ya2luZ0RheSkgKyBzdWIpO1xuICAgICAgICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICAgICAgd29ya0hvdXJzTWFwLnNldChzaGlmdC53b3JraW5nRGF5LCBzdWIpO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICB9KTtcblxuICAgICAgICBjb25zdCB3ZWVrT3ZlcnZpZXcgPSB7XG4gICAgICAgICAgICB0b3RhbFdvcmtlZEhvdXJzOiB0b3RhbFdvcmtlZEhvdXJzLFxuICAgICAgICAgICAgdG90YWxTY2hlZHVsZWRIb3VyczogdG90YWxIb3VycyxcbiAgICAgICAgICAgIHRvdGFsV29ya2VkRGF5czogd29ya0hvdXJzTWFwLnNpemUsXG4gICAgICAgICAgICB0b3RhbFNjaGVkdWxlc0RheXM6IHdvcmtTY2hlZHVsZU1hcC5zaXplXG4gICAgICAgIH1cblxuICAgICAgICByZXR1cm4gd2Vla092ZXJ2aWV3O1xuICAgIH1cblxuICAgIGZvcm1hdERhdGVUb1N0cmluZyhkYXRlSW46IERhdGUpIHtcbiAgICAgICAgdmFyIHl5eXkgPSBkYXRlSW4uZ2V0RnVsbFllYXIoKTtcbiAgICAgICAgdmFyIG1tID0gZGF0ZUluLmdldE1vbnRoKCkgKyAxOyAvLyBnZXRNb250aCgpIGlzIHplcm8tYmFzZWRcbiAgICAgICAgdmFyIGRkID0gZGF0ZUluLmdldERhdGUoKTtcbiAgICAgICAgcmV0dXJuIFN0cmluZyh5eXl5KSArIFwiLVwiICsgKG1tIDwgMTAgPyBcIjBcIiA6IFwiXCIpICsgU3RyaW5nKG1tKSArIFwiLVwiICsgKGRkIDwgMTAgPyBcIjBcIiA6IFwiXCIpICsgU3RyaW5nKGRkKTsgLy8gTGVhZGluZyB6ZXJvcyBmb3IgbW0gYW5kIGRkXG4gICAgfVxuXG4gICAgYWRkRGF5cyhkYXRlOiBEYXRlLCBkYXlzOiBudW1iZXIpOiBEYXRlIHtcbiAgICAgICAgdmFyIHJlc3VsdCA9IG5ldyBEYXRlKGRhdGUpO1xuICAgICAgICByZXN1bHQuc2V0RGF0ZShyZXN1bHQuZ2V0RGF0ZSgpICsgZGF5cyk7XG4gICAgICAgIHJldHVybiByZXN1bHQ7XG4gICAgfVxufVxuIl19