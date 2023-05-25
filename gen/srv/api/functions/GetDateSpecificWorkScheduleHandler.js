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
let GetDateSpecificWorkScheduleHandler = class GetDateSpecificWorkScheduleHandler {
    async GetDateSpecificWorkSchedule(req, weekStartDate, employeeNumber) {
        let queryEmployeeSchedule = SELECT.from('WorkSchedule').where({ employee: employeeNumber });
        let employeeSchedule = await cds.run(queryEmployeeSchedule);
        const startDate = new Date(weekStartDate);
        const schedule = [];
        const endDate = this.addDays(startDate, 7);
        employeeSchedule.forEach(workScheduleDay => {
            if (startDate >= new Date(workScheduleDay.validFrom) && endDate <= new Date(workScheduleDay.validTo)) {
                if (workScheduleDay.starttime !== workScheduleDay.endtime) {
                    let additionalDays;
                    let startDateTime;
                    let endDateTime;
                    switch (String(workScheduleDay.weekday)) {
                        case "monday":
                            additionalDays = 0;
                            break;
                        case "tuesday":
                            additionalDays = 1;
                            break;
                        case "wednesday":
                            additionalDays = 2;
                            break;
                        case "thursday":
                            additionalDays = 3;
                            break;
                        case "friday":
                            additionalDays = 4;
                            break;
                        case "saturday":
                            additionalDays = 5;
                            break;
                        case "sunday":
                            additionalDays = 6;
                            break;
                        default:
                            break;
                    }
                    startDateTime = this.formatDateToString(this.addDays(startDate, additionalDays)) + "T" + workScheduleDay.starttime + "Z";
                    endDateTime = this.formatDateToString(this.addDays(startDate, additionalDays)) + "T" + workScheduleDay.endtime + "Z";
                    schedule.push({
                        startTime: startDateTime,
                        endTime: endDateTime
                    });
                }
            }
        });
        return schedule;
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
    (0, cds_routing_handlers_1.Func)(entities_1.TimesheetService.FuncGetDateSpecificWorkSchedule.name),
    __param(0, (0, cds_routing_handlers_1.Req)()),
    __param(1, (0, cds_routing_handlers_1.Param)(entities_1.TimesheetService.FuncGetDateSpecificWorkSchedule.paramStartDate)),
    __param(2, (0, cds_routing_handlers_1.Param)(entities_1.TimesheetService.FuncGetDateSpecificWorkSchedule.paramEmployeeNumber)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, String, Number]),
    __metadata("design:returntype", Promise)
], GetDateSpecificWorkScheduleHandler.prototype, "GetDateSpecificWorkSchedule", null);
GetDateSpecificWorkScheduleHandler = __decorate([
    (0, cds_routing_handlers_1.Handler)(),
    (0, typedi_1.Service)()
], GetDateSpecificWorkScheduleHandler);
exports.default = GetDateSpecificWorkScheduleHandler;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiR2V0RGF0ZVNwZWNpZmljV29ya1NjaGVkdWxlSGFuZGxlci5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uL3NyYy9hcGkvZnVuY3Rpb25zL0dldERhdGVTcGVjaWZpY1dvcmtTY2hlZHVsZUhhbmRsZXIudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7QUFBQSwrREFBaUU7QUFDakUsNkNBQWtEO0FBQ2xELG1DQUFpQztBQUlsQixJQUFNLGtDQUFrQyxHQUF4QyxNQUFNLGtDQUFrQztJQUV4QyxBQUFOLEtBQUssQ0FBQywyQkFBMkIsQ0FDL0IsR0FBUSxFQUN5RCxhQUFxQixFQUNoQixjQUFzQjtRQUVuRyxJQUFJLHFCQUFxQixHQUFHLE1BQU0sQ0FBQyxJQUFJLENBQUMsY0FBYyxDQUFDLENBQUMsS0FBSyxDQUFDLEVBQUUsUUFBUSxFQUFFLGNBQWMsRUFBQyxDQUFDLENBQUE7UUFDMUYsSUFBSSxnQkFBZ0IsR0FBRyxNQUFNLEdBQUcsQ0FBQyxHQUFHLENBQUMscUJBQXFCLENBQXFDLENBQUE7UUFDL0YsTUFBTSxTQUFTLEdBQUcsSUFBSSxJQUFJLENBQUMsYUFBYSxDQUFDLENBQUE7UUFDekMsTUFBTSxRQUFRLEdBQUcsRUFBK0MsQ0FBQTtRQUNoRSxNQUFNLE9BQU8sR0FBRyxJQUFJLENBQUMsT0FBTyxDQUFDLFNBQVMsRUFBRSxDQUFDLENBQUMsQ0FBQTtRQUMxQyxnQkFBZ0IsQ0FBQyxPQUFPLENBQUMsZUFBZSxDQUFDLEVBQUU7WUFDdkMsSUFBRyxTQUFTLElBQUksSUFBSSxJQUFJLENBQUMsZUFBZSxDQUFDLFNBQVMsQ0FBQyxJQUFJLE9BQU8sSUFBSSxJQUFJLElBQUksQ0FBQyxlQUFlLENBQUMsT0FBTyxDQUFDLEVBQUM7Z0JBQ2hHLElBQUcsZUFBZSxDQUFDLFNBQVMsS0FBSyxlQUFlLENBQUMsT0FBTyxFQUFDO29CQUNyRCxJQUFJLGNBQWMsQ0FBQTtvQkFDbEIsSUFBSSxhQUFhLENBQUM7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Z0JBQU8sR0FBRTtHQUNXLGtDQUFrQyxDQXFFdEQ7a0JBckVvQixrQ0FBa0MiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBGdW5jLCBIYW5kbGVyLCBQYXJhbSwgUmVxIH0gZnJvbSBcImNkcy1yb3V0aW5nLWhhbmRsZXJzXCI7XG5pbXBvcnQgeyBUaW1lc2hlZXRTZXJ2aWNlIH0gZnJvbSBcIi4uLy4uL2VudGl0aWVzXCI7XG5pbXBvcnQgeyBTZXJ2aWNlIH0gZnJvbSBcInR5cGVkaVwiO1xuXG5ASGFuZGxlcigpXG5AU2VydmljZSgpXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBHZXREYXRlU3BlY2lmaWNXb3JrU2NoZWR1bGVIYW5kbGVyIHtcbiAgQEZ1bmMoVGltZXNoZWV0U2VydmljZS5GdW5jR2V0RGF0ZVNwZWNpZmljV29ya1NjaGVkdWxlLm5hbWUpXG4gIHB1YmxpYyBhc3luYyBHZXREYXRlU3BlY2lmaWNXb3JrU2NoZWR1bGUoXG4gICAgQFJlcSgpIHJlcTogYW55LFxuICAgIEBQYXJhbShUaW1lc2hlZXRTZXJ2aWNlLkZ1bmNHZXREYXRlU3BlY2lmaWNXb3JrU2NoZWR1bGUucGFyYW1TdGFydERhdGUpIHdlZWtTdGFydERhdGU6IHN0cmluZyxcbiAgICBAUGFyYW0oVGltZXNoZWV0U2VydmljZS5GdW5jR2V0RGF0ZVNwZWNpZmljV29ya1NjaGVkdWxlLnBhcmFtRW1wbG95ZWVOdW1iZXIpIGVtcGxveWVlTnVtYmVyOiBudW1iZXJcbiAgKTogUHJvbWlzZTxUaW1lc2hlZXRTZXJ2aWNlLklDdXN0X3NjaGVkdWxlVG9TaGlmdHNbXT4ge1xuICAgIGxldCBxdWVyeUVtcGxveWVlU2NoZWR1bGUgPSBTRUxFQ1QuZnJvbSgnV29ya1NjaGVkdWxlJykud2hlcmUoeyBlbXBsb3llZTogZW1wbG95ZWVOdW1iZXJ9KVxuICAgIGxldCBlbXBsb3llZVNjaGVkdWxlID0gYXdhaXQgY2RzLnJ1bihxdWVyeUVtcGxveWVlU2NoZWR1bGUpIGFzIFRpbWVzaGVldFNlcnZpY2UuSVdvcmtTY2hlZHVsZVtdXG4gICAgY29uc3Qgc3RhcnREYXRlID0gbmV3IERhdGUod2Vla1N0YXJ0RGF0ZSlcbiAgICBjb25zdCBzY2hlZHVsZSA9IFtdIGFzIFRpbWVzaGVldFNlcnZpY2UuSUN1c3Rfc2NoZWR1bGVUb1NoaWZ0c1tdXG4gICAgY29uc3QgZW5kRGF0ZSA9IHRoaXMuYWRkRGF5cyhzdGFydERhdGUsIDcpXG4gICAgZW1wbG95ZWVTY2hlZHVsZS5mb3JFYWNoKHdvcmtTY2hlZHVsZURheSA9PiB7XG4gICAgICAgIGlmKHN0YXJ0RGF0ZSA+PSBuZXcgRGF0ZSh3b3JrU2NoZWR1bGVEYXkudmFsaWRGcm9tKSAmJiBlbmREYXRlIDw9IG5ldyBEYXRlKHdvcmtTY2hlZHVsZURheS52YWxpZFRvKSl7XG4gICAgICAgICAgICBpZih3b3JrU2NoZWR1bGVEYXkuc3RhcnR0aW1lICE9PSB3b3JrU2NoZWR1bGVEYXkuZW5kdGltZSl7XG4gICAgICAgICAgICAgICAgbGV0IGFkZGl0aW9uYWxEYXlzXG4gICAgICAgICAgICAgICAgbGV0IHN0YXJ0RGF0ZVRpbWU7XG4gICAgICAgICAgICAgICAgbGV0IGVuZERhdGVUaW1lO1xuICAgICAgICAgICAgICAgIHN3aXRjaCAoU3RyaW5nKHdvcmtTY2hlZHVsZURheS53ZWVrZGF5KSkge1xuICAgICAgICAgICAgICAgICAgY2FzZSBcIm1vbmRheVwiOlxuICAgICAgICAgICAgICAgICAgICBhZGRpdGlvbmFsRGF5cyA9IDBcbiAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgICAgICBjYXNlIFwidHVlc2RheVwiOlxuICAgICAgICAgICAgICAgICAgICBhZGRpdGlvbmFsRGF5cyA9IDFcbiAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgICAgICBjYXNlIFwid2VkbmVzZGF5XCI6XG4gICAgICAgICAgICAgICAgICAgIGFkZGl0aW9uYWxEYXlzID0gMlxuICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgICAgIGNhc2UgXCJ0aHVyc2RheVwiOlxuICAgICAgICAgICAgICAgICAgICBhZGRpdGlvbmFsRGF5cyA9IDNcbiAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgICAgICBjYXNlIFwiZnJpZGF5XCI6XG4gICAgICAgICAgICAgICAgICAgIGFkZGl0aW9uYWxEYXlzID0gNFxuICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgICAgIGNhc2UgXCJzYXR1cmRheVwiOlxuICAgICAgICAgICAgICAgICAgICBhZGRpdGlvbmFsRGF5cyA9IDVcbiAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgICAgICBjYXNlIFwic3VuZGF5XCI6XG4gICAgICAgICAgICAgICAgICAgIGFkZGl0aW9uYWxEYXlzID0gNlxuICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgICAgIGRlZmF1bHQ6XG4gICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBzdGFydERhdGVUaW1lID0gdGhpcy5mb3JtYXREYXRlVG9TdHJpbmcodGhpcy5hZGREYXlzKHN0YXJ0RGF0ZSwgYWRkaXRpb25hbERheXMpKSArIFwiVFwiICsgd29ya1NjaGVkdWxlRGF5LnN0YXJ0dGltZSArIFwiWlwiXG4gICAgICAgICAgICAgICAgZW5kRGF0ZVRpbWUgPSB0aGlzLmZvcm1hdERhdGVUb1N0cmluZyh0aGlzLmFkZERheXMoc3RhcnREYXRlLCBhZGRpdGlvbmFsRGF5cykpICsgXCJUXCIgKyB3b3JrU2NoZWR1bGVEYXkuZW5kdGltZSArIFwiWlwiXG4gICAgICAgICAgICAgICAgc2NoZWR1bGUucHVzaCh7XG4gICAgICAgICAgICAgICAgICAgIHN0YXJ0VGltZTogc3RhcnREYXRlVGltZSxcbiAgICAgICAgICAgICAgICAgICAgZW5kVGltZTogZW5kRGF0ZVRpbWVcbiAgICAgICAgICAgICAgICB9KVxuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgfSk7XG5cblxuICAgIHJldHVybiBzY2hlZHVsZTtcbiAgfVxuXG4gIGZvcm1hdERhdGVUb1N0cmluZyhkYXRlSW46IERhdGUpIHtcbiAgICB2YXIgeXl5eSA9IGRhdGVJbi5nZXRGdWxsWWVhcigpO1xuICAgIHZhciBtbSA9IGRhdGVJbi5nZXRNb250aCgpICsgMTsgLy8gZ2V0TW9udGgoKSBpcyB6ZXJvLWJhc2VkXG4gICAgdmFyIGRkID0gZGF0ZUluLmdldERhdGUoKTtcbiAgICByZXR1cm4gU3RyaW5nKHl5eXkpICsgXCItXCIgKyAobW08MTAgPyBcIjBcIiA6IFwiXCIpICsgU3RyaW5nKG1tKSArIFwiLVwiICsgKGRkPDEwID8gXCIwXCIgOiBcIlwiKSArIFN0cmluZyhkZCk7IC8vIExlYWRpbmcgemVyb3MgZm9yIG1tIGFuZCBkZFxuICB9XG5cbiAgYWRkRGF5cyhkYXRlOiBEYXRlLCBkYXlzOiBudW1iZXIpOiBEYXRlIHtcbiAgICB2YXIgcmVzdWx0ID0gbmV3IERhdGUoZGF0ZSk7XG4gICAgcmVzdWx0LnNldERhdGUocmVzdWx0LmdldERhdGUoKSArIGRheXMpO1xuICAgIHJldHVybiByZXN1bHQ7XG4gIH1cbn1cbiJdfQ==