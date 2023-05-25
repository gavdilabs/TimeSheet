"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
require("reflect-metadata");
const cds_routing_handlers_1 = require("cds-routing-handlers");
const cds_1 = __importDefault(require("@sap/cds"));
const express_1 = __importDefault(require("express"));
const LoggingMiddleware_1 = require("./middleware/LoggingMiddleware");
const caplog_1 = require("@gavdi/caplog");
const typedi_1 = __importDefault(require("typedi"));
const dependencies_1 = __importDefault(require("./dependencies"));
/**
 * Entry point for the entire CAP service.
 * All service connections and/or other external dependencies should be resolved here.
 */
class Server {
    /**
     * Boots up and runs the CAP server.
     */
    static async Run() {
        const app = await this.Bootstrap();
        const port = process.env.PORT || 3001;
        app.listen(port, async () => {
            caplog_1.Logger.getInstance().info(`Server is listening at http://localhost:${port}`);
        });
    }
    /**
    * Bootstraps the service configuration and returns the express server app.
    * Primarily used for automated tests but also part of run process.
    */
    static async Bootstrap() {
        const app = (0, express_1.default)();
        await this.serviceConfiguration(app);
        return app;
    }
    /**
     * CAP service configuration function.
     * Sets up the middleware, handlers and routes.
     * MUST ONLY BE RUN AT START-UP!
     * @param app Express app
     */
    static async serviceConfiguration(app) {
        caplog_1.Logger.getInstance().info("Configuring service setup...");
        // First we register our handlers and middleware
        const hdl = (0, cds_routing_handlers_1.createCombinedHandler)({
            handler: [
                `${__dirname}/api/entities/**/*.js`,
                `${__dirname}/api/functions/**/*.js`,
                `${__dirname}/api/actions/**/*.js`,
                `${__dirname}/api/external/**/*.js`
            ],
            middlewares: [
                LoggingMiddleware_1.LoggingMiddleware
            ]
        });
        // We then tell CDS to server our project with our custom logic
        await cds_1.default
            .serve("all")
            .at("odata")
            .in(app)
            .with(srv => hdl(srv));
        await cds_1.default.connect.to("db");
        // Setup the DI Container
        await (0, dependencies_1.default)();
        // Needed by our handler constructor for dependency injection
        (0, cds_routing_handlers_1.useContainer)(typedi_1.default);
        // Redirection to OData service
        app.get("/", (req, res) => {
            res.redirect("/odata/$metadata");
        });
        caplog_1.Logger.getInstance().info("Service configured and ready");
    }
}
exports.default = Server;
// Entrypoint (using Dependency Injection)
Server.Run();
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic2VydmVyLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vc3JjL3NlcnZlci50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7OztBQUFBLDRCQUEwQjtBQUMxQiwrREFBMkU7QUFDM0UsbURBQTJCO0FBQzNCLHNEQUE2QjtBQUU3QixzRUFBbUU7QUFDbkUsMENBQXVDO0FBQ3ZDLG9EQUErQjtBQUMvQixrRUFBNkM7QUFFN0M7OztHQUdHO0FBQ0gsTUFBcUIsTUFBTTtJQUV2Qjs7T0FFRztJQUNJLE1BQU0sQ0FBQyxLQUFLLENBQUMsR0FBRztRQUNuQixNQUFNLEdBQUcsR0FBRyxNQUFNLElBQUksQ0FBQyxTQUFTLEVBQUUsQ0FBQztRQUNuQyxNQUFNLElBQUksR0FBRyxPQUFPLENBQUMsR0FBRyxDQUFDLElBQUksSUFBSSxJQUFJLENBQUM7UUFDdEMsR0FBRyxDQUFDLE1BQU0sQ0FBQyxJQUFJLEVBQUUsS0FBSyxJQUFJLEVBQUU7WUFDeEIsZUFBTSxDQUFDLFdBQVcsRUFBRSxDQUFDLElBQUksQ0FBQywyQ0FBMkMsSUFBSSxFQUFFLENBQUMsQ0FBQztRQUNqRixDQUFDLENBQUMsQ0FBQztJQUNQLENBQUM7SUFFRDs7O01BR0U7SUFDSyxNQUFNLENBQUMsS0FBSyxDQUFDLFNBQVM7UUFDekIsTUFBTSxHQUFHLEdBQUcsSUFBQSxpQkFBTyxHQUFFLENBQUM7UUFDdEIsTUFBTSxJQUFJLENBQUMsb0JBQW9CLENBQUMsR0FBRyxDQUFDLENBQUM7UUFDckMsT0FBTyxHQUFHLENBQUM7SUFDZixDQUFDO0lBRUQ7Ozs7O09BS0c7SUFDSyxNQUFNLENBQUMsS0FBSyxDQUFDLG9CQUFvQixDQUFDLEdBQWdCO1FBQ3RELGVBQU0sQ0FBQyxXQUFXLEVBQUUsQ0FBQyxJQUFJLENBQUMsOEJBQThCLENBQUMsQ0FBQztRQUUxRCxnREFBZ0Q7UUFDaEQsTUFBTSxHQUFHLEdBQUcsSUFBQSw0Q0FBcUIsRUFBQztZQUM5QixPQUFPLEVBQUU7Z0JBQ0wsR0FBRyxTQUFTLHVCQUF1QjtnQkFDbkMsR0FBRyxTQUFTLHdCQUF3QjtnQkFDcEMsR0FBRyxTQUFTLHNCQUFzQjtnQkFDbEMsR0FBRyxTQUFTLHVCQUF1QjthQUN0QztZQUNELFdBQVcsRUFBRTtnQkFDVCxxQ0FBaUI7YUFDcEI7U0FDSixDQUFDLENBQUM7UUFFSCwrREFBK0Q7UUFDL0QsTUFBTSxhQUFHO2FBQ0osS0FBSyxDQUFDLEtBQUssQ0FBQzthQUNaLEVBQUUsQ0FBQyxPQUFPLENBQUM7YUFDWCxFQUFFLENBQUMsR0FBRyxDQUFDO2FBQ1AsSUFBSSxDQUFDLEdBQUcsQ0FBQyxFQUFFLENBQUMsR0FBRyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUM7UUFDM0IsTUFBTSxhQUFHLENBQUMsT0FBTyxDQUFDLEVBQUUsQ0FBQyxJQUFJLENBQUMsQ0FBQTtRQUMxQix5QkFBeUI7UUFDekIsTUFBTSxJQUFBLHNCQUFlLEdBQUUsQ0FBQztRQUV4Qiw2REFBNkQ7UUFDN0QsSUFBQSxtQ0FBWSxFQUFDLGdCQUFTLENBQUMsQ0FBQztRQUV4QiwrQkFBK0I7UUFDL0IsR0FBRyxDQUFDLEdBQUcsQ0FBQyxHQUFHLEVBQUUsQ0FBQyxHQUFHLEVBQUUsR0FBRyxFQUFFLEVBQUU7WUFDdEIsR0FBRyxDQUFDLFFBQVEsQ0FBQyxrQkFBa0IsQ0FBQyxDQUFDO1FBQ3JDLENBQUMsQ0FBQyxDQUFDO1FBRUgsZUFBTSxDQUFDLFdBQVcsRUFBRSxDQUFDLElBQUksQ0FBQyw4QkFBOEIsQ0FBQyxDQUFDO0lBQzlELENBQUM7Q0FDSjtBQWpFRCx5QkFpRUM7QUFFRCwwQ0FBMEM7QUFDMUMsTUFBTSxDQUFDLEdBQUcsRUFBRSxDQUFDIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IFwicmVmbGVjdC1tZXRhZGF0YVwiO1xuaW1wb3J0IHsgY3JlYXRlQ29tYmluZWRIYW5kbGVyLCB1c2VDb250YWluZXIgfSBmcm9tIFwiY2RzLXJvdXRpbmctaGFuZGxlcnNcIjtcbmltcG9ydCBjZHMgZnJvbSBcIkBzYXAvY2RzXCI7XG5pbXBvcnQgZXhwcmVzcyBmcm9tIFwiZXhwcmVzc1wiXG5pbXBvcnQgeyBBcHBsaWNhdGlvbiB9IGZyb20gXCJleHByZXNzXCI7XG5pbXBvcnQgeyBMb2dnaW5nTWlkZGxld2FyZSB9IGZyb20gXCIuL21pZGRsZXdhcmUvTG9nZ2luZ01pZGRsZXdhcmVcIjtcbmltcG9ydCB7IExvZ2dlciB9IGZyb20gXCJAZ2F2ZGkvY2FwbG9nXCI7XG5pbXBvcnQgQ29udGFpbmVyIGZyb20gXCJ0eXBlZGlcIjtcbmltcG9ydCBJbml0RElDb250YWluZXIgZnJvbSBcIi4vZGVwZW5kZW5jaWVzXCI7XG5cbi8qKlxuICogRW50cnkgcG9pbnQgZm9yIHRoZSBlbnRpcmUgQ0FQIHNlcnZpY2UuXG4gKiBBbGwgc2VydmljZSBjb25uZWN0aW9ucyBhbmQvb3Igb3RoZXIgZXh0ZXJuYWwgZGVwZW5kZW5jaWVzIHNob3VsZCBiZSByZXNvbHZlZCBoZXJlLlxuICovXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBTZXJ2ZXIge1xuXG4gICAgLyoqXG4gICAgICogQm9vdHMgdXAgYW5kIHJ1bnMgdGhlIENBUCBzZXJ2ZXIuXG4gICAgICovXG4gICAgcHVibGljIHN0YXRpYyBhc3luYyBSdW4oKTogUHJvbWlzZTx2b2lkPiB7XG4gICAgICAgIGNvbnN0IGFwcCA9IGF3YWl0IHRoaXMuQm9vdHN0cmFwKCk7XG4gICAgICAgIGNvbnN0IHBvcnQgPSBwcm9jZXNzLmVudi5QT1JUIHx8IDMwMDE7XG4gICAgICAgIGFwcC5saXN0ZW4ocG9ydCwgYXN5bmMgKCkgPT4ge1xuICAgICAgICAgICAgTG9nZ2VyLmdldEluc3RhbmNlKCkuaW5mbyhgU2VydmVyIGlzIGxpc3RlbmluZyBhdCBodHRwOi8vbG9jYWxob3N0OiR7cG9ydH1gKTtcbiAgICAgICAgfSk7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgKiBCb290c3RyYXBzIHRoZSBzZXJ2aWNlIGNvbmZpZ3VyYXRpb24gYW5kIHJldHVybnMgdGhlIGV4cHJlc3Mgc2VydmVyIGFwcC5cbiAgICAqIFByaW1hcmlseSB1c2VkIGZvciBhdXRvbWF0ZWQgdGVzdHMgYnV0IGFsc28gcGFydCBvZiBydW4gcHJvY2Vzcy5cbiAgICAqL1xuICAgIHB1YmxpYyBzdGF0aWMgYXN5bmMgQm9vdHN0cmFwKCk6IFByb21pc2U8QXBwbGljYXRpb24+IHtcbiAgICAgICAgY29uc3QgYXBwID0gZXhwcmVzcygpO1xuICAgICAgICBhd2FpdCB0aGlzLnNlcnZpY2VDb25maWd1cmF0aW9uKGFwcCk7XG4gICAgICAgIHJldHVybiBhcHA7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogQ0FQIHNlcnZpY2UgY29uZmlndXJhdGlvbiBmdW5jdGlvbi5cbiAgICAgKiBTZXRzIHVwIHRoZSBtaWRkbGV3YXJlLCBoYW5kbGVycyBhbmQgcm91dGVzLlxuICAgICAqIE1VU1QgT05MWSBCRSBSVU4gQVQgU1RBUlQtVVAhXG4gICAgICogQHBhcmFtIGFwcCBFeHByZXNzIGFwcFxuICAgICAqL1xuICAgIHByaXZhdGUgc3RhdGljIGFzeW5jIHNlcnZpY2VDb25maWd1cmF0aW9uKGFwcDogQXBwbGljYXRpb24pOiBQcm9taXNlPHZvaWQ+IHtcbiAgICAgICAgTG9nZ2VyLmdldEluc3RhbmNlKCkuaW5mbyhcIkNvbmZpZ3VyaW5nIHNlcnZpY2Ugc2V0dXAuLi5cIik7XG5cbiAgICAgICAgLy8gRmlyc3Qgd2UgcmVnaXN0ZXIgb3VyIGhhbmRsZXJzIGFuZCBtaWRkbGV3YXJlXG4gICAgICAgIGNvbnN0IGhkbCA9IGNyZWF0ZUNvbWJpbmVkSGFuZGxlcih7XG4gICAgICAgICAgICBoYW5kbGVyOiBbXG4gICAgICAgICAgICAgICAgYCR7X19kaXJuYW1lfS9hcGkvZW50aXRpZXMvKiovKi5qc2AsXG4gICAgICAgICAgICAgICAgYCR7X19kaXJuYW1lfS9hcGkvZnVuY3Rpb25zLyoqLyouanNgLFxuICAgICAgICAgICAgICAgIGAke19fZGlybmFtZX0vYXBpL2FjdGlvbnMvKiovKi5qc2AsXG4gICAgICAgICAgICAgICAgYCR7X19kaXJuYW1lfS9hcGkvZXh0ZXJuYWwvKiovKi5qc2BcbiAgICAgICAgICAgIF0sXG4gICAgICAgICAgICBtaWRkbGV3YXJlczogW1xuICAgICAgICAgICAgICAgIExvZ2dpbmdNaWRkbGV3YXJlXG4gICAgICAgICAgICBdXG4gICAgICAgIH0pO1xuXG4gICAgICAgIC8vIFdlIHRoZW4gdGVsbCBDRFMgdG8gc2VydmVyIG91ciBwcm9qZWN0IHdpdGggb3VyIGN1c3RvbSBsb2dpY1xuICAgICAgICBhd2FpdCBjZHNcbiAgICAgICAgICAgIC5zZXJ2ZShcImFsbFwiKVxuICAgICAgICAgICAgLmF0KFwib2RhdGFcIilcbiAgICAgICAgICAgIC5pbihhcHApXG4gICAgICAgICAgICAud2l0aChzcnYgPT4gaGRsKHNydikpO1xuICAgICAgICBhd2FpdCBjZHMuY29ubmVjdC50byhcImRiXCIpXG4gICAgICAgIC8vIFNldHVwIHRoZSBESSBDb250YWluZXJcbiAgICAgICAgYXdhaXQgSW5pdERJQ29udGFpbmVyKCk7XG5cbiAgICAgICAgLy8gTmVlZGVkIGJ5IG91ciBoYW5kbGVyIGNvbnN0cnVjdG9yIGZvciBkZXBlbmRlbmN5IGluamVjdGlvblxuICAgICAgICB1c2VDb250YWluZXIoQ29udGFpbmVyKTtcblxuICAgICAgICAvLyBSZWRpcmVjdGlvbiB0byBPRGF0YSBzZXJ2aWNlXG4gICAgICAgIGFwcC5nZXQoXCIvXCIsIChyZXEsIHJlcykgPT4ge1xuICAgICAgICAgICAgcmVzLnJlZGlyZWN0KFwiL29kYXRhLyRtZXRhZGF0YVwiKTtcbiAgICAgICAgfSk7XG5cbiAgICAgICAgTG9nZ2VyLmdldEluc3RhbmNlKCkuaW5mbyhcIlNlcnZpY2UgY29uZmlndXJlZCBhbmQgcmVhZHlcIik7XG4gICAgfVxufVxuXG4vLyBFbnRyeXBvaW50ICh1c2luZyBEZXBlbmRlbmN5IEluamVjdGlvbilcblNlcnZlci5SdW4oKTtcbiJdfQ==