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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const typedi_1 = require("typedi");
const DbService_1 = __importDefault(require("../core/services/DbService"));
let Postgres = class Postgres extends DbService_1.default {
    constructor() {
        super("db");
    }
};
Postgres = __decorate([
    (0, typedi_1.Service)({ id: "postgres" }),
    __metadata("design:paramtypes", [])
], Postgres);
exports.default = Postgres;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiUG9zdGdyZXMuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi9zcmMvc2VydmljZXMvUG9zdGdyZXMudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7QUFBQSxtQ0FBaUM7QUFDakMsMkVBQW1EO0FBR3BDLElBQU0sUUFBUSxHQUFkLE1BQU0sUUFBUyxTQUFRLG1CQUFTO0lBRTNDO1FBQ0ksS0FBSyxDQUFDLElBQUksQ0FBQyxDQUFDO0lBQ2hCLENBQUM7Q0FFSixDQUFBO0FBTm9CLFFBQVE7SUFENUIsSUFBQSxnQkFBTyxFQUFDLEVBQUMsRUFBRSxFQUFFLFVBQVUsRUFBQyxDQUFDOztHQUNMLFFBQVEsQ0FNNUI7a0JBTm9CLFFBQVEiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBTZXJ2aWNlIH0gZnJvbSBcInR5cGVkaVwiO1xuaW1wb3J0IERCU2VydmljZSBmcm9tIFwiLi4vY29yZS9zZXJ2aWNlcy9EYlNlcnZpY2VcIjtcblxuQFNlcnZpY2Uoe2lkOiBcInBvc3RncmVzXCJ9KVxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgUG9zdGdyZXMgZXh0ZW5kcyBEQlNlcnZpY2Uge1xuXG4gICAgY29uc3RydWN0b3IoKSB7XG4gICAgICAgIHN1cGVyKFwiZGJcIik7XG4gICAgfVxuXG59XG4iXX0=