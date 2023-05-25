"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * External Service Factory.
 * To be used for user authenticated service connections.
 */
class ExternalServiceFactory {
    /**
     * Creates an instance of the desired service for user authenticated usage.
     * @returns User authenticated service instance
     */
    static async createInstance(c) {
        const srv = this.create(c);
        await srv.Connect();
        return srv;
    }
    /**
     * Creates a instance of a service connection.
     * @param srv Typeof service instance
     * @returns Service instance
     */
    static create(srv) {
        return new srv();
    }
}
exports.default = ExternalServiceFactory;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiRXh0ZXJuYWxTZXJ2aWNlRmFjdG9yeS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uL3NyYy9jb3JlL3NlcnZpY2VzL0V4dGVybmFsU2VydmljZUZhY3RvcnkudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7QUFHQTs7O0dBR0c7QUFDSCxNQUFxQixzQkFBc0I7SUFDdkM7OztPQUdHO0lBQ0ksTUFBTSxDQUFDLEtBQUssQ0FBQyxjQUFjLENBQTRCLENBQWM7UUFDeEUsTUFBTSxHQUFHLEdBQUcsSUFBSSxDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUMsQ0FBQztRQUMzQixNQUFNLEdBQUcsQ0FBQyxPQUFPLEVBQUUsQ0FBQztRQUNwQixPQUFPLEdBQUcsQ0FBQztJQUNmLENBQUM7SUFFRDs7OztPQUlHO0lBQ0ssTUFBTSxDQUFDLE1BQU0sQ0FBMEIsR0FBTTtRQUNqRCxPQUFPLElBQUksR0FBRyxFQUFFLENBQUM7SUFDckIsQ0FBQztDQUNKO0FBbkJELHlDQW1CQyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IENvbnN0cnVjdGlibGUgfSBmcm9tIFwiLi4vVENvbnN0cnVjdGlibGVcIjtcbmltcG9ydCBFeHRlcm5hbFNlcnZpY2UgZnJvbSBcIi4vRXh0ZXJuYWxTZXJ2aWNlXCI7XG5cbi8qKlxuICogRXh0ZXJuYWwgU2VydmljZSBGYWN0b3J5LlxuICogVG8gYmUgdXNlZCBmb3IgdXNlciBhdXRoZW50aWNhdGVkIHNlcnZpY2UgY29ubmVjdGlvbnMuXG4gKi9cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIEV4dGVybmFsU2VydmljZUZhY3Rvcnkge1xuICAgIC8qKlxuICAgICAqIENyZWF0ZXMgYW4gaW5zdGFuY2Ugb2YgdGhlIGRlc2lyZWQgc2VydmljZSBmb3IgdXNlciBhdXRoZW50aWNhdGVkIHVzYWdlLlxuICAgICAqIEByZXR1cm5zIFVzZXIgYXV0aGVudGljYXRlZCBzZXJ2aWNlIGluc3RhbmNlXG4gICAgICovXG4gICAgcHVibGljIHN0YXRpYyBhc3luYyBjcmVhdGVJbnN0YW5jZTxUIGV4dGVuZHMgRXh0ZXJuYWxTZXJ2aWNlPihjOiBuZXcgKCkgPT4gVCk6IFByb21pc2U8VD4ge1xuICAgICAgICBjb25zdCBzcnYgPSB0aGlzLmNyZWF0ZShjKTtcbiAgICAgICAgYXdhaXQgc3J2LkNvbm5lY3QoKTtcbiAgICAgICAgcmV0dXJuIHNydjtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBDcmVhdGVzIGEgaW5zdGFuY2Ugb2YgYSBzZXJ2aWNlIGNvbm5lY3Rpb24uXG4gICAgICogQHBhcmFtIHNydiBUeXBlb2Ygc2VydmljZSBpbnN0YW5jZVxuICAgICAqIEByZXR1cm5zIFNlcnZpY2UgaW5zdGFuY2VcbiAgICAgKi9cbiAgICBwcml2YXRlIHN0YXRpYyBjcmVhdGU8VCBleHRlbmRzIENvbnN0cnVjdGlibGU+KHNydjogVCk6IEluc3RhbmNlVHlwZTxUPiB7XG4gICAgICAgIHJldHVybiBuZXcgc3J2KCk7XG4gICAgfVxufVxuXG4iXX0=