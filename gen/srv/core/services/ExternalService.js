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
const cds_1 = __importDefault(require("@sap/cds"));
const caplog_1 = require("@gavdi/caplog");
const typedi_1 = require("typedi");
/**
 * Abstract base class for remote/external service connections with CDS.
 */
let ExternalService = class ExternalService {
    /**
     * Default constructor
     * @param serviceName Service name as defined in package.json or .cdsrc.json
     */
    constructor(serviceName) {
        caplog_1.Logger.getInstance().info(`Created new external service class instance for service: ${serviceName}`);
        this.serviceName = serviceName;
    }
    /**
     * Establishes connection to external service.
     * Should be executed on server startup only.
     */
    async Connect() {
        caplog_1.Logger.getInstance().info(`Attempting connection to external service: ${this.serviceName}`);
        try {
            this.serviceConnection = await cds_1.default.connect.to(this.serviceName);
        }
        catch (e) {
            caplog_1.Logger.getInstance().error(`Failed to connect to external service '${this.serviceName}'`, e);
            throw `Failed to initialize external service connection, aborting...`;
        }
    }
    /**
     * Retrieves the active service connection.
     * @returns Established service connection.
     */
    GetConnection() {
        return this.serviceConnection;
    }
};
ExternalService = __decorate([
    (0, typedi_1.Service)(),
    __metadata("design:paramtypes", [String])
], ExternalService);
exports.default = ExternalService;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiRXh0ZXJuYWxTZXJ2aWNlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vc3JjL2NvcmUvc2VydmljZXMvRXh0ZXJuYWxTZXJ2aWNlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7O0FBQ0EsbURBQTJCO0FBQzNCLDBDQUF1QztBQUN2QyxtQ0FBaUM7QUFFakM7O0dBRUc7QUFFWSxJQUFlLGVBQWUsR0FBOUIsTUFBZSxlQUFlO0lBV3pDOzs7T0FHRztJQUNILFlBQVksV0FBbUI7UUFDM0IsZUFBTSxDQUFDLFdBQVcsRUFBRSxDQUFDLElBQUksQ0FDckIsNERBQTRELFdBQVcsRUFBRSxDQUM1RSxDQUFDO1FBQ0YsSUFBSSxDQUFDLFdBQVcsR0FBRyxXQUFXLENBQUM7SUFDbkMsQ0FBQztJQUVEOzs7T0FHRztJQUNJLEtBQUssQ0FBQyxPQUFPO1FBQ2hCLGVBQU0sQ0FBQyxXQUFXLEVBQUUsQ0FBQyxJQUFJLENBQ3JCLDhDQUE4QyxJQUFJLENBQUMsV0FBVyxFQUFFLENBQ25FLENBQUM7UUFDRixJQUFJO1lBQ0EsSUFBSSxDQUFDLGlCQUFpQixHQUFHLE1BQU0sYUFBRyxDQUFDLE9BQU8sQ0FBQyxFQUFFLENBQUMsSUFBSSxDQUFDLFdBQVcsQ0FBQyxDQUFDO1NBQ25FO1FBQUMsT0FBTyxDQUFDLEVBQUU7WUFDUixlQUFNLENBQUMsV0FBVyxFQUFFLENBQUMsS0FBSyxDQUN0QiwwQ0FBMEMsSUFBSSxDQUFDLFdBQVcsR0FBRyxFQUM3RCxDQUFDLENBQ0osQ0FBQztZQUNGLE1BQU0sK0RBQStELENBQUM7U0FDekU7SUFDTCxDQUFDO0lBRUQ7OztPQUdHO0lBQ0ksYUFBYTtRQUNoQixPQUFPLElBQUksQ0FBQyxpQkFBaUIsQ0FBQztJQUNsQyxDQUFDO0NBQ0osQ0FBQTtBQWhENkIsZUFBZTtJQUQ1QyxJQUFBLGdCQUFPLEdBQUU7O0dBQ29CLGVBQWUsQ0FnRDVDO2tCQWhENkIsZUFBZSIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IFNlcnZpY2UgYXMgQ2RzU2VydmljZSB9IGZyb20gXCJAc2FwL2Nkcy9hcGlzL3NlcnZpY2VzXCI7XG5pbXBvcnQgY2RzIGZyb20gXCJAc2FwL2Nkc1wiO1xuaW1wb3J0IHsgTG9nZ2VyIH0gZnJvbSBcIkBnYXZkaS9jYXBsb2dcIjtcbmltcG9ydCB7IFNlcnZpY2UgfSBmcm9tIFwidHlwZWRpXCI7XG5cbi8qKlxuICogQWJzdHJhY3QgYmFzZSBjbGFzcyBmb3IgcmVtb3RlL2V4dGVybmFsIHNlcnZpY2UgY29ubmVjdGlvbnMgd2l0aCBDRFMuXG4gKi9cbkBTZXJ2aWNlKClcbmV4cG9ydCBkZWZhdWx0IGFic3RyYWN0IGNsYXNzIEV4dGVybmFsU2VydmljZSB7XG4gICAgLyoqXG4gICAgICogU2VydmljZSBuYW1lIGFzIGRlZmluZWQgaW4gcGFja2FnZS5qc29uIG9yIC5jZHNyYy5qc29uXG4gICAgICovXG4gICAgcHJvdGVjdGVkIHNlcnZpY2VOYW1lOiBzdHJpbmc7XG5cbiAgICAvKipcbiAgICAgKiBUaGUgZXN0YWJsaXNoZWQgY29ubmVjdGlvbiB0byB0aGUgZXh0ZXJuYWwgc2VydmljZVxuICAgICAqL1xuICAgIHByb3RlY3RlZCBzZXJ2aWNlQ29ubmVjdGlvbjogYW55OyAvL05PVEU6IFRoaXMgaXMgc2V0IHRvIGFueSBiZWNhdXNlIFNBUCBoYXNuJ3QgdXBkYXRlZCB0aGVpciBTZXJ2aWNlIGVudGl0eSBkZWNsYXJhdGlvbiBhcyBvZiB5ZXRcblxuICAgIC8qKlxuICAgICAqIERlZmF1bHQgY29uc3RydWN0b3JcbiAgICAgKiBAcGFyYW0gc2VydmljZU5hbWUgU2VydmljZSBuYW1lIGFzIGRlZmluZWQgaW4gcGFja2FnZS5qc29uIG9yIC5jZHNyYy5qc29uXG4gICAgICovXG4gICAgY29uc3RydWN0b3Ioc2VydmljZU5hbWU6IHN0cmluZykge1xuICAgICAgICBMb2dnZXIuZ2V0SW5zdGFuY2UoKS5pbmZvKFxuICAgICAgICAgICAgYENyZWF0ZWQgbmV3IGV4dGVybmFsIHNlcnZpY2UgY2xhc3MgaW5zdGFuY2UgZm9yIHNlcnZpY2U6ICR7c2VydmljZU5hbWV9YFxuICAgICAgICApO1xuICAgICAgICB0aGlzLnNlcnZpY2VOYW1lID0gc2VydmljZU5hbWU7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogRXN0YWJsaXNoZXMgY29ubmVjdGlvbiB0byBleHRlcm5hbCBzZXJ2aWNlLlxuICAgICAqIFNob3VsZCBiZSBleGVjdXRlZCBvbiBzZXJ2ZXIgc3RhcnR1cCBvbmx5LlxuICAgICAqL1xuICAgIHB1YmxpYyBhc3luYyBDb25uZWN0KCk6IFByb21pc2U8dm9pZD4ge1xuICAgICAgICBMb2dnZXIuZ2V0SW5zdGFuY2UoKS5pbmZvKFxuICAgICAgICAgICAgYEF0dGVtcHRpbmcgY29ubmVjdGlvbiB0byBleHRlcm5hbCBzZXJ2aWNlOiAke3RoaXMuc2VydmljZU5hbWV9YFxuICAgICAgICApO1xuICAgICAgICB0cnkge1xuICAgICAgICAgICAgdGhpcy5zZXJ2aWNlQ29ubmVjdGlvbiA9IGF3YWl0IGNkcy5jb25uZWN0LnRvKHRoaXMuc2VydmljZU5hbWUpO1xuICAgICAgICB9IGNhdGNoIChlKSB7XG4gICAgICAgICAgICBMb2dnZXIuZ2V0SW5zdGFuY2UoKS5lcnJvcihcbiAgICAgICAgICAgICAgICBgRmFpbGVkIHRvIGNvbm5lY3QgdG8gZXh0ZXJuYWwgc2VydmljZSAnJHt0aGlzLnNlcnZpY2VOYW1lfSdgLFxuICAgICAgICAgICAgICAgIGVcbiAgICAgICAgICAgICk7XG4gICAgICAgICAgICB0aHJvdyBgRmFpbGVkIHRvIGluaXRpYWxpemUgZXh0ZXJuYWwgc2VydmljZSBjb25uZWN0aW9uLCBhYm9ydGluZy4uLmA7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBSZXRyaWV2ZXMgdGhlIGFjdGl2ZSBzZXJ2aWNlIGNvbm5lY3Rpb24uXG4gICAgICogQHJldHVybnMgRXN0YWJsaXNoZWQgc2VydmljZSBjb25uZWN0aW9uLlxuICAgICAqL1xuICAgIHB1YmxpYyBHZXRDb25uZWN0aW9uKCk6IENkc1NlcnZpY2Uge1xuICAgICAgICByZXR1cm4gdGhpcy5zZXJ2aWNlQ29ubmVjdGlvbjtcbiAgICB9XG59XG5cbiJdfQ==