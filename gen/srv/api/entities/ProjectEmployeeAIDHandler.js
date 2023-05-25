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
        const projectID = this.getFilterValue(req.query, 'projectID', "=");
        const isRemaining = this.getFilterValue(req.query, 'isRemaining', "=");
        const countedHours = this.onCountHours(projectID, employeeNumber, isRemaining);
        return countedHours;
    }
    async onCountHours(projectID, employeeNumber, isRemaining) {
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
        let AIDsMap = new Map();
        validAIDs.forEach((validAID) => {
            AIDsMap.set(validAID.AID, validAID.AAType);
        });
        // Get employees working hours on the project
        let queryHours = SELECT.from("WorkHours").where({
            projectID: projectID,
            employee: employeeNumber,
        });
        let workHours = await cds.run(queryHours);
        let hoursAIDmap = new Map();
        // Get the total of working hours spent on each AID
        if (workHours.length > 0) {
            workHours.forEach((element) => {
                if (AIDsMap.has(element.AID)) {
                    var d1 = new Date(element.fromTime);
                    var d2 = new Date(element.toTime);
                    var sub = (d2.getTime() - d1.getTime()) / 3600000;
                    if (!hoursAIDmap.get(element.AID)) {
                        hoursAIDmap.set(element.AID, sub);
                    }
                    else {
                        hoursAIDmap.set(element.AID, sub + hoursAIDmap.get(element.AID));
                    }
                }
            });
        }
        const AIDoverview = [];
        let hoursInTotal = 0;
        hoursAIDmap.forEach((totalHours, AID) => {
            hoursInTotal = hoursInTotal + totalHours;
            AIDoverview.push({
                employeeNumber: employeeNumber,
                projectID: projectID,
                totalHours: Math.round(totalHours),
                AID: AID,
                AAType: AIDsMap.get(AID),
                percentage: Math.round((totalHours / hoursAssigned) * 100),
                isRemaining: isRemaining
            });
        });
        // Add one more object which stands for remaining hours
        if (isRemaining) {
            AIDoverview.push({
                employeeNumber: employeeNumber,
                projectID: projectID,
                totalHours: Math.round(hoursAssigned - hoursInTotal),
                AID: undefined,
                AAType: "Remaining",
                percentage: Math.round(((hoursAssigned - hoursInTotal) / hoursAssigned) * 100),
                isRemaining: isRemaining
            });
        }
        return AIDoverview;
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiUHJvamVjdEVtcGxveWVlQUlESGFuZGxlci5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uL3NyYy9hcGkvZW50aXRpZXMvUHJvamVjdEVtcGxveWVlQUlESGFuZGxlci50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7QUFBQSwrREFBZ0Y7QUFDaEYsNkNBQWtEO0FBRWxELG1DQUFpQztBQUsxQixJQUFNLHlCQUF5QixHQUEvQixNQUFNLHlCQUF5QjtJQUEvQjtRQXFGTCxtQkFBYyxHQUFHLENBQUMsS0FBSyxFQUFFLE1BQU0sRUFBRSxRQUFRLEVBQUUsRUFBRTtZQUMzQyxJQUFJLEtBQUssR0FBRyxJQUFJLENBQUM7WUFDakIsSUFBSSxXQUFXLEdBQUcsSUFBSSxDQUFDO1lBQ3ZCLE1BQU0sS0FBSyxHQUFHLEtBQUssQ0FBQyxNQUFNLENBQUMsS0FBSyxDQUFDO1lBQ2pDLElBQUksS0FBSyxLQUFLLFNBQVMsRUFBRTtnQkFDdkIsS0FBSyxJQUFJLEtBQUssR0FBRyxDQUFDLEVBQUUsS0FBSyxHQUFHLEtBQUssQ0FBQyxNQUFNLEVBQUUsS0FBSyxFQUFFLEVBQUU7b0JBQ2pELE1BQU0sT0FBTyxHQUFHLEtBQUssQ0FBQyxLQUFLLENBQUMsQ0FBQztvQkFDN0IsTUFBTSxFQUFFLEdBQUcsRUFBRSxHQUFHLE9BQU8sQ0FBQztvQkFDeEIsSUFBSSxDQUFDLEdBQUc7d0JBQUUsU0FBUztvQkFDbkIsSUFBSSxHQUFHLENBQUMsUUFBUSxDQUFDLE1BQU0sQ0FBQyxJQUFJLEtBQUssQ0FBQyxLQUFLLEdBQUcsQ0FBQyxDQUFDLEtBQUssUUFBUSxFQUFFO3dCQUN6RCxXQUFXLEdBQUcsS0FBSyxDQUFDO3dCQUNwQixNQUFNO3FCQUNQO2lCQUNGO2dCQUNELElBQUksV0FBVyxLQUFLLElBQUksRUFBRTtvQkFDeEIsS0FBSyxHQUFHLEtBQUssQ0FBQyxXQUFXLEdBQUcsQ0FBQyxDQUFDLENBQUMsR0FBRyxDQUFDO2lCQUNwQzthQUNGO1lBQ0QsT0FBTyxLQUFLLENBQUM7UUFFZixDQUFDLENBQUE7SUFDSCxDQUFDO0lBeEdjLEFBQU4sS0FBSyxDQUFDLFlBQVksQ0FBUSxHQUFRO1FBQ3ZDLE1BQU0sY0FBYyxHQUFHLElBQUksQ0FBQyxjQUFjLENBQUMsR0FBRyxDQUFDLEtBQUssRUFBRSxnQkFBZ0IsRUFBRSxHQUFHLENBQUMsQ0FBQztRQUM3RSxNQUFNLFNBQVMsR0FBRyxJQUFJLENBQUMsY0FBYyxDQUFDLEdBQUcsQ0FBQyxLQUFLLEVBQUUsV0FBVyxFQUFFLEdBQUcsQ0FBQyxDQUFDO1FBQ25FLE1BQU0sV0FBVyxHQUFHLElBQUksQ0FBQyxjQUFjLENBQUMsR0FBRyxDQUFDLEtBQUssRUFBRSxhQUFhLEVBQUUsR0FBRyxDQUFDLENBQUM7UUFDdkUsTUFBTSxZQUFZLEdBQUcsSUFBSSxDQUFDLFlBQVksQ0FBQyxTQUFTLEVBQUUsY0FBYyxFQUFFLFdBQVcsQ0FBQyxDQUFDO1FBQy9FLE9BQU8sWUFBWSxDQUFBO0lBQ3JCLENBQUM7SUFFRCxLQUFLLENBQUMsWUFBWSxDQUFDLFNBQWlCLEVBQUUsY0FBc0IsRUFBRSxXQUFvQjtRQUNoRix1REFBdUQ7UUFDdkQsSUFBSSxzQkFBc0IsR0FBRyxNQUFNLENBQUMsSUFBSSxDQUFDLG1CQUFtQixDQUFDO2FBQzFELEtBQUssQ0FBQyxFQUFFLFNBQVMsRUFBRSxTQUFTLEVBQUUsUUFBUSxFQUFFLGNBQWMsRUFBRSxDQUFDO2FBQ3pELE9BQU8sQ0FBQyxDQUFDLEVBQUUsRUFBRSxFQUFFO1lBQ2QsRUFBRSxDQUFDLGFBQWEsQ0FBQztRQUNuQixDQUFDLENBQUMsQ0FBQztRQUNMLElBQUksYUFBYSxHQUFHLENBQUMsTUFBTSxHQUFHLENBQUMsR0FBRyxDQUFDLHNCQUFzQixDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7YUFDM0QsYUFBYSxDQUFDO1FBQ2pCLG1DQUFtQztRQUNuQyxJQUFJLFFBQVEsR0FBRyxNQUFNLENBQUMsSUFBSSxDQUFDLHVCQUF1QixDQUFDO2FBQ2hELEtBQUssQ0FBQyxFQUFFLFNBQVMsRUFBRSxLQUFLLEVBQUUsQ0FBQzthQUMzQixPQUFPLENBQUMsQ0FBQyxFQUFFLEVBQUUsRUFBRTtZQUNkLEVBQUUsQ0FBQyxHQUFHLEVBQUUsRUFBRSxDQUFDLE1BQU0sQ0FBQztRQUNwQixDQUFDLENBQUMsQ0FBQztRQUNMLElBQUksU0FBUyxHQUFHLE1BQU0sR0FBRyxDQUFDLEdBQUcsQ0FBQyxRQUFRLENBQUMsQ0FBQztRQUN4QyxJQUFJLE9BQU8sR0FBRyxJQUFJLEdBQUcsRUFBeUIsQ0FBQztRQUMvQyxTQUFTLENBQUMsT0FBTyxDQUFDLENBQUMsUUFBUSxFQUFFLEVBQUU7WUFDN0IsT0FBTyxDQUFDLEdBQUcsQ0FBQyxRQUFRLENBQUMsR0FBRyxFQUFFLFFBQVEsQ0FBQyxNQUFNLENBQUMsQ0FBQztRQUM3QyxDQUFDLENBQUMsQ0FBQztRQUVILDZDQUE2QztRQUM3QyxJQUFJLFVBQVUsR0FBRyxNQUFNLENBQUMsSUFBSSxDQUFDLFdBQVcsQ0FBQyxDQUFDLEtBQUssQ0FBQztZQUM5QyxTQUFTLEVBQUUsU0FBUztZQUNwQixRQUFRLEVBQUUsY0FBYztTQUN6QixDQUFDLENBQUM7UUFDSCxJQUFJLFNBQVMsR0FBRyxNQUFNLEdBQUcsQ0FBQyxHQUFHLENBQUMsVUFBVSxDQUFDLENBQUM7UUFDMUMsSUFBSSxXQUFXLEdBQUcsSUFBSSxHQUFHLEVBQXlCLENBQUM7UUFFbkQsbURBQW1EO1FBQ25ELElBQUksU0FBUyxDQUFDLE1BQU0sR0FBRyxDQUFDLEVBQUU7WUFDeEIsU0FBUyxDQUFDLE9BQU8sQ0FBQyxDQUFDLE9BQU8sRUFBRSxFQUFFO2dCQUM1QixJQUFJLE9BQU8sQ0FBQyxHQUFHLENBQUMsT0FBTyxDQUFDLEdBQUcsQ0FBQyxFQUFFO29CQUM1QixJQUFJLEVBQUUsR0FBRyxJQUFJLElBQUksQ0FBQyxPQUFPLENBQUMsUUFBUSxDQUFDLENBQUM7b0JBQ3BDLElBQUksRUFBRSxHQUFHLElBQUksSUFBSSxDQUFDLE9BQU8sQ0FBQyxNQUFNLENBQUMsQ0FBQztvQkFDbEMsSUFBSSxHQUFHLEdBQUcsQ0FBQyxFQUFFLENBQUMsT0FBTyxFQUFFLEdBQUcsRUFBRSxDQUFDLE9BQU8sRUFBRSxDQUFDLEdBQUcsT0FBTyxDQUFDO29CQUNsRCxJQUFJLENBQUMsV0FBVyxDQUFDLEdBQUcsQ0FBQyxPQUFPLENBQUMsR0FBRyxDQUFDLEVBQUU7d0JBQ2pDLFdBQVcsQ0FBQyxHQUFHLENBQUMsT0FBTyxDQUFDLEdBQUcsRUFBRSxHQUFHLENBQUMsQ0FBQztxQkFDbkM7eUJBQU07d0JBQ0wsV0FBVyxDQUFDLEdBQUcsQ0FBQyxPQUFPLENBQUMsR0FBRyxFQUFFLEdBQUcsR0FBRyxXQUFXLENBQUMsR0FBRyxDQUFDLE9BQU8sQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDO3FCQUNsRTtpQkFDRjtZQUNILENBQUMsQ0FBQyxDQUFDO1NBQ0o7UUFFRCxNQUFNLFdBQVcsR0FBMkMsRUFBRSxDQUFDO1FBQy9ELElBQUksWUFBWSxHQUFHLENBQVcsQ0FBQTtRQUM5QixXQUFXLENBQUMsT0FBTyxDQUFDLENBQUMsVUFBVSxFQUFFLEdBQUcsRUFBRSxFQUFFO1lBQ3RDLFlBQVksR0FBRyxZQUFZLEdBQUcsVUFBVSxDQUFBO1lBQ3hDLFdBQVcsQ0FBQyxJQUFJLENBQUM7Z0JBQ2YsY0FBYyxFQUFFLGNBQWM7Z0JBQzlCLFNBQVMsRUFBRSxTQUFTO2dCQUNwQixVQUFVLEVBQUUsSUFBSSxDQUFDLEtBQUssQ0FBQyxVQUFVLENBQUM7Z0JBQ2xDLEdBQUcsRUFBRSxHQUFHO2dCQUNSLE1BQU0sRUFBRSxPQUFPLENBQUMsR0FBRyxDQUFDLEdBQUcsQ0FBQztnQkFDeEIsVUFBVSxFQUFFLElBQUksQ0FBQyxLQUFLLENBQUMsQ0FBQyxVQUFVLEdBQUcsYUFBYSxDQUFDLEdBQUcsR0FBRyxDQUFDO2dCQUMxRCxXQUFXLEVBQUUsV0FBVzthQUNlLENBQUMsQ0FBQztRQUM3QyxDQUFDLENBQUMsQ0FBQztRQUVILHVEQUF1RDtRQUN2RCxJQUFHLFdBQVcsRUFBQztZQUNiLFdBQVcsQ0FBQyxJQUFJLENBQUM7Z0JBQ2YsY0FBYyxFQUFFLGNBQWM7Z0JBQzlCLFNBQVMsRUFBRSxTQUFTO2dCQUNwQixVQUFVLEVBQUUsSUFBSSxDQUFDLEtBQUssQ0FBQyxhQUFhLEdBQUUsWUFBWSxDQUFDO2dCQUNuRCxHQUFHLEVBQUUsU0FBUztnQkFDZCxNQUFNLEVBQUUsV0FBVztnQkFDbkIsVUFBVSxFQUFFLElBQUksQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDLGFBQWEsR0FBRSxZQUFZLENBQUMsR0FBRyxhQUFhLENBQUMsR0FBRyxHQUFHLENBQUM7Z0JBQzdFLFdBQVcsRUFBRSxXQUFXO2FBQ2UsQ0FBQyxDQUFDO1NBQzVDO1FBQ0QsT0FBTyxXQUFXLENBQUM7SUFDckIsQ0FBQztDQXVCRixDQUFBO0FBeEdjO0lBRFosSUFBQSw2QkFBTSxHQUFFO0lBQ2tCLFdBQUEsSUFBQSwwQkFBRyxHQUFFLENBQUE7Ozs7NkRBTS9CO0FBUlUseUJBQXlCO0lBRnJDLElBQUEsOEJBQU8sRUFBQywyQkFBZ0IsQ0FBQyxNQUFNLENBQUMsa0JBQWtCLENBQUM7SUFDbkQsSUFBQSxnQkFBTyxHQUFFO0dBQ0cseUJBQXlCLENBMEdyQztBQTFHWSw4REFBeUIiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBIYW5kbGVyLCBPblJlYWQsIFJlcSwgT25DcmVhdGUsIE9uVXBkYXRlIH0gZnJvbSBcImNkcy1yb3V0aW5nLWhhbmRsZXJzXCI7XG5pbXBvcnQgeyBUaW1lc2hlZXRTZXJ2aWNlIH0gZnJvbSBcIi4uLy4uL2VudGl0aWVzXCI7XG5pbXBvcnQgRXh0ZXJuYWxTZXJ2aWNlRmFjdG9yeSBmcm9tIFwiLi4vLi4vY29yZS9zZXJ2aWNlcy9FeHRlcm5hbFNlcnZpY2VGYWN0b3J5XCI7XG5pbXBvcnQgeyBTZXJ2aWNlIH0gZnJvbSBcInR5cGVkaVwiO1xuaW1wb3J0IHsgQ29uc29sZSB9IGZyb20gXCJjb25zb2xlXCI7XG5cbkBIYW5kbGVyKFRpbWVzaGVldFNlcnZpY2UuRW50aXR5LlByb2plY3RFbXBsb3llZUFJRClcbkBTZXJ2aWNlKClcbmV4cG9ydCBjbGFzcyBQcm9qZWN0RW1wbG95ZWVBSURIYW5kbGVyIHtcbiAgQE9uUmVhZCgpXG4gIHB1YmxpYyBhc3luYyBPblJlYWRFbnRpdHkoQFJlcSgpIHJlcTogYW55KSB7XG4gICAgY29uc3QgZW1wbG95ZWVOdW1iZXIgPSB0aGlzLmdldEZpbHRlclZhbHVlKHJlcS5xdWVyeSwgJ2VtcGxveWVlTnVtYmVyJywgXCI9XCIpO1xuICAgIGNvbnN0IHByb2plY3RJRCA9IHRoaXMuZ2V0RmlsdGVyVmFsdWUocmVxLnF1ZXJ5LCAncHJvamVjdElEJywgXCI9XCIpO1xuICAgIGNvbnN0IGlzUmVtYWluaW5nID0gdGhpcy5nZXRGaWx0ZXJWYWx1ZShyZXEucXVlcnksICdpc1JlbWFpbmluZycsIFwiPVwiKTtcbiAgICBjb25zdCBjb3VudGVkSG91cnMgPSB0aGlzLm9uQ291bnRIb3Vycyhwcm9qZWN0SUQsIGVtcGxveWVlTnVtYmVyLCBpc1JlbWFpbmluZyk7XG4gICAgcmV0dXJuIGNvdW50ZWRIb3Vyc1xuICB9XG5cbiAgYXN5bmMgb25Db3VudEhvdXJzKHByb2plY3RJRDogc3RyaW5nLCBlbXBsb3llZU51bWJlcjogbnVtYmVyLCBpc1JlbWFpbmluZzogYm9vbGVhbikge1xuICAgIC8vIEdldCB0b3RhbCBob3VycyBhc3NpZ25lZCB0byBlbXBsb3llZSBvbiB0aGlzIHByb2plY3RcbiAgICBsZXQgcXVlcnlQcm9qZWN0QXNzaWdubWVudCA9IFNFTEVDVC5mcm9tKFwiUHJvamVjdEFzc2lnbm1lbnRcIilcbiAgICAgIC53aGVyZSh7IHByb2plY3RJRDogcHJvamVjdElELCBlbXBsb3llZTogZW1wbG95ZWVOdW1iZXIgfSlcbiAgICAgIC5jb2x1bW5zKChlbCkgPT4ge1xuICAgICAgICBlbC5hc3NpZ25lZEhvdXJzO1xuICAgICAgfSk7XG4gICAgbGV0IGhvdXJzQXNzaWduZWQgPSAoYXdhaXQgY2RzLnJ1bihxdWVyeVByb2plY3RBc3NpZ25tZW50KSlbMF1cbiAgICAgIC5hc3NpZ25lZEhvdXJzO1xuICAgIC8vIEdldCB2YWxpZCBBSURzIGFuZCBzYXZlIHRvIGEgbWFwXG4gICAgbGV0IHF1ZXJ5QUlEID0gU0VMRUNULmZyb20oXCJBYnNlbmNlQXR0ZW5kYW5jZVR5cGVcIilcbiAgICAgIC53aGVyZSh7IGlzQWJzZW5jZTogZmFsc2UgfSlcbiAgICAgIC5jb2x1bW5zKChlbCkgPT4ge1xuICAgICAgICBlbC5BSUQsIGVsLkFBVHlwZTtcbiAgICAgIH0pO1xuICAgIGxldCB2YWxpZEFJRHMgPSBhd2FpdCBjZHMucnVuKHF1ZXJ5QUlEKTtcbiAgICBsZXQgQUlEc01hcCA9IG5ldyBNYXAoKSBhcyBNYXA8bnVtYmVyLCBzdHJpbmc+O1xuICAgIHZhbGlkQUlEcy5mb3JFYWNoKCh2YWxpZEFJRCkgPT4ge1xuICAgICAgQUlEc01hcC5zZXQodmFsaWRBSUQuQUlELCB2YWxpZEFJRC5BQVR5cGUpO1xuICAgIH0pO1xuXG4gICAgLy8gR2V0IGVtcGxveWVlcyB3b3JraW5nIGhvdXJzIG9uIHRoZSBwcm9qZWN0XG4gICAgbGV0IHF1ZXJ5SG91cnMgPSBTRUxFQ1QuZnJvbShcIldvcmtIb3Vyc1wiKS53aGVyZSh7XG4gICAgICBwcm9qZWN0SUQ6IHByb2plY3RJRCxcbiAgICAgIGVtcGxveWVlOiBlbXBsb3llZU51bWJlcixcbiAgICB9KTtcbiAgICBsZXQgd29ya0hvdXJzID0gYXdhaXQgY2RzLnJ1bihxdWVyeUhvdXJzKTtcbiAgICBsZXQgaG91cnNBSURtYXAgPSBuZXcgTWFwKCkgYXMgTWFwPG51bWJlciwgbnVtYmVyPjtcblxuICAgIC8vIEdldCB0aGUgdG90YWwgb2Ygd29ya2luZyBob3VycyBzcGVudCBvbiBlYWNoIEFJRFxuICAgIGlmICh3b3JrSG91cnMubGVuZ3RoID4gMCkge1xuICAgICAgd29ya0hvdXJzLmZvckVhY2goKGVsZW1lbnQpID0+IHtcbiAgICAgICAgaWYgKEFJRHNNYXAuaGFzKGVsZW1lbnQuQUlEKSkge1xuICAgICAgICAgIHZhciBkMSA9IG5ldyBEYXRlKGVsZW1lbnQuZnJvbVRpbWUpO1xuICAgICAgICAgIHZhciBkMiA9IG5ldyBEYXRlKGVsZW1lbnQudG9UaW1lKTtcbiAgICAgICAgICB2YXIgc3ViID0gKGQyLmdldFRpbWUoKSAtIGQxLmdldFRpbWUoKSkgLyAzNjAwMDAwO1xuICAgICAgICAgIGlmICghaG91cnNBSURtYXAuZ2V0KGVsZW1lbnQuQUlEKSkge1xuICAgICAgICAgICAgaG91cnNBSURtYXAuc2V0KGVsZW1lbnQuQUlELCBzdWIpO1xuICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICBob3Vyc0FJRG1hcC5zZXQoZWxlbWVudC5BSUQsIHN1YiArIGhvdXJzQUlEbWFwLmdldChlbGVtZW50LkFJRCkpO1xuICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgfSk7XG4gICAgfVxuXG4gICAgY29uc3QgQUlEb3ZlcnZpZXc6IFRpbWVzaGVldFNlcnZpY2UuSVByb2plY3RFbXBsb3llZUFJRFtdID0gW107XG4gICAgbGV0IGhvdXJzSW5Ub3RhbCA9IDAgYXMgbnVtYmVyXG4gICAgaG91cnNBSURtYXAuZm9yRWFjaCgodG90YWxIb3VycywgQUlEKSA9PiB7XG4gICAgICBob3Vyc0luVG90YWwgPSBob3Vyc0luVG90YWwgKyB0b3RhbEhvdXJzXG4gICAgICBBSURvdmVydmlldy5wdXNoKHtcbiAgICAgICAgZW1wbG95ZWVOdW1iZXI6IGVtcGxveWVlTnVtYmVyLFxuICAgICAgICBwcm9qZWN0SUQ6IHByb2plY3RJRCxcbiAgICAgICAgdG90YWxIb3VyczogTWF0aC5yb3VuZCh0b3RhbEhvdXJzKSxcbiAgICAgICAgQUlEOiBBSUQsXG4gICAgICAgIEFBVHlwZTogQUlEc01hcC5nZXQoQUlEKSxcbiAgICAgICAgcGVyY2VudGFnZTogTWF0aC5yb3VuZCgodG90YWxIb3VycyAvIGhvdXJzQXNzaWduZWQpICogMTAwKSxcbiAgICAgICAgaXNSZW1haW5pbmc6IGlzUmVtYWluaW5nXG4gICAgICB9IGFzIFRpbWVzaGVldFNlcnZpY2UuSVByb2plY3RFbXBsb3llZUFJRCk7XG4gICAgfSk7XG4gICAgXG4gICAgLy8gQWRkIG9uZSBtb3JlIG9iamVjdCB3aGljaCBzdGFuZHMgZm9yIHJlbWFpbmluZyBob3Vyc1xuICAgIGlmKGlzUmVtYWluaW5nKXtcbiAgICAgIEFJRG92ZXJ2aWV3LnB1c2goe1xuICAgICAgICBlbXBsb3llZU51bWJlcjogZW1wbG95ZWVOdW1iZXIsXG4gICAgICAgIHByb2plY3RJRDogcHJvamVjdElELFxuICAgICAgICB0b3RhbEhvdXJzOiBNYXRoLnJvdW5kKGhvdXJzQXNzaWduZWQtIGhvdXJzSW5Ub3RhbCksXG4gICAgICAgIEFJRDogdW5kZWZpbmVkLFxuICAgICAgICBBQVR5cGU6IFwiUmVtYWluaW5nXCIsXG4gICAgICAgIHBlcmNlbnRhZ2U6IE1hdGgucm91bmQoKChob3Vyc0Fzc2lnbmVkLSBob3Vyc0luVG90YWwpIC8gaG91cnNBc3NpZ25lZCkgKiAxMDApLFxuICAgICAgICBpc1JlbWFpbmluZzogaXNSZW1haW5pbmdcbiAgICAgIH0gYXMgVGltZXNoZWV0U2VydmljZS5JUHJvamVjdEVtcGxveWVlQUlEKTtcbiAgICB9XG4gICAgcmV0dXJuIEFJRG92ZXJ2aWV3O1xuICB9XG5cbiAgZ2V0RmlsdGVyVmFsdWUgPSAocXVlcnksIGZpbHRlciwgb3BlcmF0b3IpID0+IHtcbiAgICBsZXQgdmFsdWUgPSBudWxsO1xuICAgIGxldCBmaWx0ZXJJbmRleCA9IG51bGw7XG4gICAgY29uc3Qgd2hlcmUgPSBxdWVyeS5TRUxFQ1Qud2hlcmU7XG4gICAgaWYgKHdoZXJlICE9PSB1bmRlZmluZWQpIHtcbiAgICAgIGZvciAobGV0IGluZGV4ID0gMDsgaW5kZXggPCB3aGVyZS5sZW5ndGg7IGluZGV4KyspIHtcbiAgICAgICAgY29uc3QgZWxlbWVudCA9IHdoZXJlW2luZGV4XTtcbiAgICAgICAgY29uc3QgeyByZWYgfSA9IGVsZW1lbnQ7XG4gICAgICAgIGlmICghcmVmKSBjb250aW51ZTtcbiAgICAgICAgaWYgKHJlZi5pbmNsdWRlcyhmaWx0ZXIpICYmIHdoZXJlW2luZGV4ICsgMV0gPT09IG9wZXJhdG9yKSB7XG4gICAgICAgICAgZmlsdGVySW5kZXggPSBpbmRleDtcbiAgICAgICAgICBicmVhaztcbiAgICAgICAgfVxuICAgICAgfVxuICAgICAgaWYgKGZpbHRlckluZGV4ICE9PSBudWxsKSB7XG4gICAgICAgIHZhbHVlID0gd2hlcmVbZmlsdGVySW5kZXggKyAyXS52YWw7XG4gICAgICB9XG4gICAgfVxuICAgIHJldHVybiB2YWx1ZTtcblxuICB9XG59XG4iXX0=