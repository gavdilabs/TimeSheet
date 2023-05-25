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
exports.ProjectEmployeeAIDHandler = void 0;
const cds_routing_handlers_1 = require("cds-routing-handlers");
const entities_1 = require("../../entities");
const typedi_1 = require("typedi");
let ProjectEmployeeAIDHandler = class ProjectEmployeeAIDHandler {
    constructor() {
        this.getFilterValue = (query, filter, operator) => {
            let value = null;
            let filterIndex = null;
            const where = query.SELECT.where;
            if (where !== undefined) {
                for (let index = 0; index < where.length; index++) {
                    const element = where[index];
                    const { ref } = element;
                    if (!ref)
                        continue;
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
        };
    }
    async OnReadEntity(req) {
        const employeeNumber = this.getFilterValue(req.query, 'employeeNumber', "=");
        const numberOfDays = this.getFilterValue(req.query, 'numberOfDays', "=");
        const startDate = this.getFilterValue(req.query, 'startDate', "=");
        const weekCount = this.getWeekCount(numberOfDays, startDate, employeeNumber);
        return weekCount;
    }
    async getWeekCount(numberOfDays, startDate, employeeNumber) {
        let workScheduleMap = new Map();
        let workHoursMap = new Map();
        let totalWorkedHours = 0;
        let totalHours = 0;
        const calendarStartDate = new Date(startDate);
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
    (0, cds_routing_handlers_1.OnRead)(),
    __param(0, (0, cds_routing_handlers_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], ProjectEmployeeAIDHandler.prototype, "OnReadEntity", null);
ProjectEmployeeAIDHandler = __decorate([
    (0, cds_routing_handlers_1.Handler)(entities_1.TimesheetService.Entity.ProjectEmployeeAID),
    (0, typedi_1.Service)()
], ProjectEmployeeAIDHandler);
exports.ProjectEmployeeAIDHandler = ProjectEmployeeAIDHandler;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiV2Vla092ZXJ2aWV3SGFuZGxlci5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uL3NyYy9hcGkvZW50aXRpZXMvV2Vla092ZXJ2aWV3SGFuZGxlci50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7QUFBQSwrREFBZ0Y7QUFDaEYsNkNBQWtEO0FBQ2xELG1DQUFpQztBQUkxQixJQUFNLHlCQUF5QixHQUEvQixNQUFNLHlCQUF5QjtJQUEvQjtRQW9GSCxtQkFBYyxHQUFHLENBQUMsS0FBSyxFQUFFLE1BQU0sRUFBRSxRQUFRLEVBQUUsRUFBRTtZQUN6QyxJQUFJLEtBQUssR0FBRyxJQUFJLENBQUM7WUFDakIsSUFBSSxXQUFXLEdBQUcsSUFBSSxDQUFDO1lBQ3ZCLE1BQU0sS0FBSyxHQUFHLEtBQUssQ0FBQyxNQUFNLENBQUMsS0FBSyxDQUFDO1lBQ2pDLElBQUksS0FBSyxLQUFLLFNBQVMsRUFBRTtnQkFDckIsS0FBSyxJQUFJLEtBQUssR0FBRyxDQUFDLEVBQUUsS0FBSyxHQUFHLEtBQUssQ0FBQyxNQUFNLEVBQUUsS0FBSyxFQUFFLEVBQUU7b0JBQy9DLE1BQU0sT0FBTyxHQUFHLEtBQUssQ0FBQyxLQUFLLENBQUMsQ0FBQztvQkFDN0IsTUFBTSxFQUFFLEdBQUcsRUFBRSxHQUFHLE9BQU8sQ0FBQztvQkFDeEIsSUFBSSxDQUFDLEdBQUc7d0JBQUUsU0FBUztvQkFDbkIsSUFBSSxHQUFHLENBQUMsUUFBUSxDQUFDLE1BQU0sQ0FBQyxJQUFJLEtBQUssQ0FBQyxLQUFLLEdBQUcsQ0FBQyxDQUFDLEtBQUssUUFBUSxFQUFFO3dCQUN2RCxXQUFXLEdBQUcsS0FBSyxDQUFDO3dCQUNwQixNQUFNO3FCQUNUO2lCQUNKO2dCQUNELElBQUksV0FBVyxLQUFLLElBQUksRUFBRTtvQkFDdEIsS0FBSyxHQUFHLEtBQUssQ0FBQyxXQUFXLEdBQUcsQ0FBQyxDQUFDLENBQUMsR0FBRyxDQUFDO2lCQUN0QzthQUNKO1lB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OERBQXlCIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgSGFuZGxlciwgT25SZWFkLCBSZXEsIE9uQ3JlYXRlLCBPblVwZGF0ZSB9IGZyb20gXCJjZHMtcm91dGluZy1oYW5kbGVyc1wiO1xuaW1wb3J0IHsgVGltZXNoZWV0U2VydmljZSB9IGZyb20gXCIuLi8uLi9lbnRpdGllc1wiO1xuaW1wb3J0IHsgU2VydmljZSB9IGZyb20gXCJ0eXBlZGlcIjtcblxuQEhhbmRsZXIoVGltZXNoZWV0U2VydmljZS5FbnRpdHkuUHJvamVjdEVtcGxveWVlQUlEKVxuQFNlcnZpY2UoKVxuZXhwb3J0IGNsYXNzIFByb2plY3RFbXBsb3llZUFJREhhbmRsZXIge1xuICAgIEBPblJlYWQoKVxuICAgIHB1YmxpYyBhc3luYyBPblJlYWRFbnRpdHkoQFJlcSgpIHJlcTogYW55KSB7XG4gICAgICAgIGNvbnN0IGVtcGxveWVlTnVtYmVyID0gdGhpcy5nZXRGaWx0ZXJWYWx1ZShyZXEucXVlcnksICdlbXBsb3llZU51bWJlcicsIFwiPVwiKTtcbiAgICAgICAgY29uc3QgbnVtYmVyT2ZEYXlzID0gdGhpcy5nZXRGaWx0ZXJWYWx1ZShyZXEucXVlcnksICdudW1iZXJPZkRheXMnLCBcIj1cIik7XG4gICAgICAgIGNvbnN0IHN0YXJ0RGF0ZSA9IHRoaXMuZ2V0RmlsdGVyVmFsdWUocmVxLnF1ZXJ5LCAnc3RhcnREYXRlJywgXCI9XCIpO1xuICAgICAgICBjb25zdCB3ZWVrQ291bnQgPSB0aGlzLmdldFdlZWtDb3VudChudW1iZXJPZkRheXMsIHN0YXJ0RGF0ZSwgZW1wbG95ZWVOdW1iZXIpO1xuICAgICAgICByZXR1cm4gd2Vla0NvdW50XG4gICAgfVxuXG4gICAgYXN5bmMgZ2V0V2Vla0NvdW50KG51bWJlck9mRGF5czogbnVtYmVyLCBzdGFydERhdGU6IHN0cmluZywgZW1wbG95ZWVOdW1iZXI6IHN0cmluZykge1xuICAgICAgICBsZXQgd29ya1NjaGVkdWxlTWFwID0gbmV3IE1hcCgpIGFzIE1hcDxzdHJpbmcsIG51bWJlcj47XG4gICAgICAgIGxldCB3b3JrSG91cnNNYXAgPSBuZXcgTWFwKCkgYXMgTWFwPERhdGUsIG51bWJlcj47XG4gICAgICAgIGxldCB0b3RhbFdvcmtlZEhvdXJzID0gMDtcbiAgICAgICAgbGV0IHRvdGFsSG91cnMgPSAwO1xuXG4gICAgICAgIGNvbnN0IGNhbGVuZGFyU3RhcnREYXRlID0gbmV3IERhdGUoc3RhcnREYXRlKVxuICAgICAgICBjb25zdCBjYWxlbmRhckVuZERhdGUgPSB0aGlzLmFkZERheXMoY2FsZW5kYXJTdGFydERhdGUsIG51bWJlck9mRGF5cylcblxuICAgICAgICBsZXQgcXVlcnlFbXBsb3llZVNjaGVkdWxlID0gU0VMRUNULmZyb20oJ1dvcmtTY2hlZHVsZScpLndoZXJlKHsgZW1wbG95ZWU6IGVtcGxveWVlTnVtYmVyIH0pXG4gICAgICAgIGxldCBlbXBsb3llZVNjaGVkdWxlID0gYXdhaXQgY2RzLnJ1bihxdWVyeUVtcGxveWVlU2NoZWR1bGUpIGFzIFRpbWVzaGVldFNlcnZpY2UuSVdvcmtTY2hlZHVsZVtdXG5cbiAgICAgICAgZW1wbG95ZWVTY2hlZHVsZS5mb3JFYWNoKHdvcmtEYXkgPT4ge1xuICAgICAgICAgICAgaWYgKG51bWJlck9mRGF5cyA9PSA3IHx8IChudW1iZXJPZkRheXMgPT0gNSAmJiAhKFN0cmluZyh3b3JrRGF5LndlZWtkYXkpID09IFwic2F0dXJkYXlcIiB8fCBTdHJpbmcod29ya0RheS53ZWVrZGF5KSA9PSBcInN1bmRheVwiKSkpIHtcbiAgICAgICAgICAgICAgICB2YXIgZDEgPSBuZXcgRGF0ZShcIjE5NzAtMDEtMDFUXCIgKyB3b3JrRGF5LnN0YXJ0dGltZSk7XG4gICAgICAgICAgICAgICAgdmFyIGQyID0gbmV3IERhdGUoXCIxOTcwLTAxLTAxVFwiICsgd29ya0RheS5lbmR0aW1lKTtcbiAgICAgICAgICAgICAgICB2YXIgc3ViID0gKGQyLmdldFRpbWUoKSAtIGQxLmdldFRpbWUoKSkgLyAzNjAwMDAwO1xuICAgICAgICAgICAgICAgIGlmIChzdWIgIT0gMCkge1xuICAgICAgICAgICAgICAgICAgICB3b3JrU2NoZWR1bGVNYXAuc2V0KFN0cmluZyh3b3JrRGF5LndlZWtkYXkpLCBzdWIpO1xuICAgICAgICAgICAgICAgICAgICB0b3RhbEhvdXJzID0gdG90YWxIb3VycyArIHN1YjtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgIH0pO1xuXG4gICAgICAgIGxldCBxdWVyeVdvcmtIb3VycyA9IFNFTEVDVC5mcm9tKCdXb3JrSG91cnMnKS53aGVyZSh7IGVtcGxveWVlOiBlbXBsb3llZU51bWJlciB9KVxuICAgICAgICAgICAgLmNvbHVtbnMoZWwgPT4ge1xuICAgICAgICAgICAgICAgIGVsLmZyb21UaW1lLFxuICAgICAgICAgICAgICAgICAgICBlbC50b1RpbWUsXG4gICAgICAgICAgICAgICAgICAgIGVsLndvcmtpbmdEYXksXG4gICAgICAgICAgICAgICAgICAgIGVsLl9hYnNBdHRlbmRhbmNlKGpyID0+IHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGpyLmlzQWJzZW5jZTtcbiAgICAgICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICB9KVxuXG4gICAgICAgIGxldCB3b3JrSG91cnMgPSBhd2FpdCBjZHMucnVuKHF1ZXJ5V29ya0hvdXJzKSBhcyBUaW1lc2hlZXRTZXJ2aWNlLklXb3JrSG91cnNbXVxuICAgICAgICB3b3JrSG91cnMuZm9yRWFjaChzaGlmdCA9PiB7XG4gICAgICAgICAgICBpZiAoc2hpZnQuX2Fic0F0dGVuZGFuY2UuaXNBYnNlbmNlID09IGZhbHNlKSB7XG4gICAgICAgICAgICAgICAgdmFyIGQxID0gbmV3IERhdGUoc2hpZnQuZnJvbVRpbWUpO1xuICAgICAgICAgICAgICAgIHZhciBkMiA9IG5ldyBEYXRlKHNoaWZ0LnRvVGltZSk7XG4gICAgICAgICAgICAgICAgaWYgKGQxID49IGNhbGVuZGFyU3RhcnREYXRlICYmIGQyIDw9IGNhbGVuZGFyRW5kRGF0ZSkge1xuICAgICAgICAgICAgICAgICAgICB2YXIgc3ViID0gKGQyLmdldFRpbWUoKSAtIGQxLmdldFRpbWUoKSkgLyAzNjAwMDAwO1xuICAgICAgICAgICAgICAgICAgICB0b3RhbFdvcmtlZEhvdXJzID0gdG90YWxXb3JrZWRIb3VycyArIHN1YjtcblxuICAgICAgICAgICAgICAgICAgICBpZiAod29ya0hvdXJzTWFwLmhhcyhzaGlmdC53b3JraW5nRGF5KSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgd29ya0hvdXJzTWFwLnNldChzaGlmdC53b3JraW5nRGF5LCB3b3JrSG91cnNNYXAuZ2V0KHNoaWZ0LndvcmtpbmdEYXkpICsgc3ViKTtcbiAgICAgICAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHdvcmtIb3Vyc01hcC5zZXQoc2hpZnQud29ya2luZ0RheSwgc3ViKTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgfSk7XG5cbiAgICAgICAgY29uc3Qgd2Vla092ZXJ2aWV3ID0ge1xuICAgICAgICAgICAgdG90YWxXb3JrZWRIb3VyczogdG90YWxXb3JrZWRIb3VycyxcbiAgICAgICAgICAgIHRvdGFsU2NoZWR1bGVkSG91cnM6IHRvdGFsSG91cnMsXG4gICAgICAgICAgICB0b3RhbFdvcmtlZERheXM6IHdvcmtIb3Vyc01hcC5zaXplLFxuICAgICAgICAgICAgdG90YWxTY2hlZHVsZXNEYXlzOiB3b3JrU2NoZWR1bGVNYXAuc2l6ZVxuICAgICAgICB9XG5cbiAgICAgICAgcmV0dXJuIHdlZWtPdmVydmlldztcbiAgICB9XG5cbiAgICBmb3JtYXREYXRlVG9TdHJpbmcoZGF0ZUluOiBEYXRlKSB7XG4gICAgICAgIHZhciB5eXl5ID0gZGF0ZUluLmdldEZ1bGxZZWFyKCk7XG4gICAgICAgIHZhciBtbSA9IGRhdGVJbi5nZXRNb250aCgpICsgMTsgLy8gZ2V0TW9udGgoKSBpcyB6ZXJvLWJhc2VkXG4gICAgICAgIHZhciBkZCA9IGRhdGVJbi5nZXREYXRlKCk7XG4gICAgICAgIHJldHVybiBTdHJpbmcoeXl5eSkgKyBcIi1cIiArIChtbSA8IDEwID8gXCIwXCIgOiBcIlwiKSArIFN0cmluZyhtbSkgKyBcIi1cIiArIChkZCA8IDEwID8gXCIwXCIgOiBcIlwiKSArIFN0cmluZyhkZCk7IC8vIExlYWRpbmcgemVyb3MgZm9yIG1tIGFuZCBkZFxuICAgIH1cblxuICAgIGFkZERheXMoZGF0ZTogRGF0ZSwgZGF5czogbnVtYmVyKTogRGF0ZSB7XG4gICAgICAgIHZhciByZXN1bHQgPSBuZXcgRGF0ZShkYXRlKTtcbiAgICAgICAgcmVzdWx0LnNldERhdGUocmVzdWx0LmdldERhdGUoKSArIGRheXMpO1xuICAgICAgICByZXR1cm4gcmVzdWx0O1xuICAgIH1cbiAgICBnZXRGaWx0ZXJWYWx1ZSA9IChxdWVyeSwgZmlsdGVyLCBvcGVyYXRvcikgPT4ge1xuICAgICAgICBsZXQgdmFsdWUgPSBudWxsO1xuICAgICAgICBsZXQgZmlsdGVySW5kZXggPSBudWxsO1xuICAgICAgICBjb25zdCB3aGVyZSA9IHF1ZXJ5LlNFTEVDVC53aGVyZTtcbiAgICAgICAgaWYgKHdoZXJlICE9PSB1bmRlZmluZWQpIHtcbiAgICAgICAgICAgIGZvciAobGV0IGluZGV4ID0gMDsgaW5kZXggPCB3aGVyZS5sZW5ndGg7IGluZGV4KyspIHtcbiAgICAgICAgICAgICAgICBjb25zdCBlbGVtZW50ID0gd2hlcmVbaW5kZXhdO1xuICAgICAgICAgICAgICAgIGNvbnN0IHsgcmVmIH0gPSBlbGVtZW50O1xuICAgICAgICAgICAgICAgIGlmICghcmVmKSBjb250aW51ZTtcbiAgICAgICAgICAgICAgICBpZiAocmVmLmluY2x1ZGVzKGZpbHRlcikgJiYgd2hlcmVbaW5kZXggKyAxXSA9PT0gb3BlcmF0b3IpIHtcbiAgICAgICAgICAgICAgICAgICAgZmlsdGVySW5kZXggPSBpbmRleDtcbiAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICAgICAgaWYgKGZpbHRlckluZGV4ICE9PSBudWxsKSB7XG4gICAgICAgICAgICAgICAgdmFsdWUgPSB3aGVyZVtmaWx0ZXJJbmRleCArIDJdLnZhbDtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gdmFsdWU7XG5cbiAgICB9XG59Il19