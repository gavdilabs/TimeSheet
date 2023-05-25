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
exports.LoggingMiddleware = void 0;
const caplog_1 = require("@gavdi/caplog");
const cds_routing_handlers_1 = require("cds-routing-handlers");
const typedi_1 = require("typedi");
let LoggingMiddleware = class LoggingMiddleware {
    async use(req) {
        caplog_1.Logger.getInstance().info(`Request received, targeting event: ${req}`);
    }
};
__decorate([
    __param(0, (0, cds_routing_handlers_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], LoggingMiddleware.prototype, "use", null);
LoggingMiddleware = __decorate([
    (0, cds_routing_handlers_1.Middleware)({ global: true, priority: 1 }),
    (0, typedi_1.Service)()
], LoggingMiddleware);
exports.LoggingMiddleware = LoggingMiddleware;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiTG9nZ2luZ01pZGRsZXdhcmUuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi9zcmMvbWlkZGxld2FyZS9Mb2dnaW5nTWlkZGxld2FyZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7QUFBQSwwQ0FBdUM7QUFFdkMsK0RBQXVFO0FBQ3ZFLG1DQUFpQztBQUkxQixJQUFNLGlCQUFpQixHQUF2QixNQUFNLGlCQUFpQjtJQUViLEFBQU4sS0FBSyxDQUFDLEdBQUcsQ0FBUSxHQUFZO1FBQ2hDLGVBQU0sQ0FBQyxXQUFXLEVBQUUsQ0FBQyxJQUFJLENBQUMsc0NBQXNDLEdBQUcsRUFBRSxDQUFDLENBQUM7SUFDM0UsQ0FBQztDQUVKLENBQUE7QUFKZ0I7SUFBSyxXQUFBLElBQUEsMEJBQUcsR0FBRSxDQUFBOzs7OzRDQUV0QjtBQUpRLGlCQUFpQjtJQUY3QixJQUFBLGlDQUFVLEVBQUMsRUFBQyxNQUFNLEVBQUUsSUFBSSxFQUFFLFFBQVEsRUFBRSxDQUFDLEVBQUUsQ0FBQztJQUN4QyxJQUFBLGdCQUFPLEdBQUU7R0FDRyxpQkFBaUIsQ0FNN0I7QUFOWSw4Q0FBaUIiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBMb2dnZXIgfSBmcm9tIFwiQGdhdmRpL2NhcGxvZ1wiO1xuaW1wb3J0IHsgUmVxdWVzdCB9IGZyb20gXCJAc2FwL2Nkcy9hcGlzL3NlcnZpY2VzXCI7XG5pbXBvcnQgeyBJQ2RzTWlkZGxld2FyZSwgTWlkZGxld2FyZSwgUmVxIH0gZnJvbSBcImNkcy1yb3V0aW5nLWhhbmRsZXJzXCI7XG5pbXBvcnQgeyBTZXJ2aWNlIH0gZnJvbSBcInR5cGVkaVwiO1xuXG5ATWlkZGxld2FyZSh7Z2xvYmFsOiB0cnVlLCBwcmlvcml0eTogMSB9KVxuQFNlcnZpY2UoKVxuZXhwb3J0IGNsYXNzIExvZ2dpbmdNaWRkbGV3YXJlIGltcGxlbWVudHMgSUNkc01pZGRsZXdhcmUge1xuXG4gICAgcHVibGljIGFzeW5jIHVzZShAUmVxKCkgcmVxOiBSZXF1ZXN0KTogUHJvbWlzZTx2b2lkPiB7XG4gICAgICAgIExvZ2dlci5nZXRJbnN0YW5jZSgpLmluZm8oYFJlcXVlc3QgcmVjZWl2ZWQsIHRhcmdldGluZyBldmVudDogJHtyZXF9YCk7XG4gICAgfVxuXG59XG5cblxuIl19