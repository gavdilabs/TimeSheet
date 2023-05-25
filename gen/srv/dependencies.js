"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const typedi_1 = __importDefault(require("typedi"));
const LoggingMiddleware_1 = require("./middleware/LoggingMiddleware");
// DI Container retrieval function
async function InitDIContainer() {
    // Our dependency registration goes here!
    typedi_1.default.set([
        // Dependencies are set using the following structure:
        // {id: 'dependencyID', value: new YourDependency()}
        // OR
        // {id: 'dependencyValue', value: "SomeKeyValue"}
        { id: 'middleware-loggin', value: new LoggingMiddleware_1.LoggingMiddleware() },
    ]);
}
exports.default = InitDIContainer;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZGVwZW5kZW5jaWVzLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vc3JjL2RlcGVuZGVuY2llcy50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7OztBQUFBLG9EQUErQjtBQUUvQixzRUFBbUU7QUFFbkUsa0NBQWtDO0FBQ25CLEtBQUssVUFBVSxlQUFlO0lBRXpDLHlDQUF5QztJQUN6QyxnQkFBUyxDQUFDLEdBQUcsQ0FBQztRQUNWLHNEQUFzRDtRQUN0RCxvREFBb0Q7UUFDcEQsS0FBSztRQUNMLGlEQUFpRDtRQUNqRCxFQUFDLEVBQUUsRUFBRSxtQkFBbUIsRUFBRSxLQUFLLEVBQUUsSUFBSSxxQ0FBaUIsRUFBRSxFQUFDO0tBQzVELENBQUMsQ0FBQztBQUNQLENBQUM7QUFWRCxrQ0FVQyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCBDb250YWluZXIgZnJvbSBcInR5cGVkaVwiO1xuaW1wb3J0IEV4dGVybmFsU2VydmljZUZhY3RvcnkgZnJvbSBcIi4vY29yZS9zZXJ2aWNlcy9FeHRlcm5hbFNlcnZpY2VGYWN0b3J5XCI7XG5pbXBvcnQgeyBMb2dnaW5nTWlkZGxld2FyZSB9IGZyb20gXCIuL21pZGRsZXdhcmUvTG9nZ2luZ01pZGRsZXdhcmVcIjtcblxuLy8gREkgQ29udGFpbmVyIHJldHJpZXZhbCBmdW5jdGlvblxuZXhwb3J0IGRlZmF1bHQgYXN5bmMgZnVuY3Rpb24gSW5pdERJQ29udGFpbmVyKCk6IFByb21pc2U8dm9pZD4ge1xuXG4gICAgLy8gT3VyIGRlcGVuZGVuY3kgcmVnaXN0cmF0aW9uIGdvZXMgaGVyZSFcbiAgICBDb250YWluZXIuc2V0KFtcbiAgICAgICAgLy8gRGVwZW5kZW5jaWVzIGFyZSBzZXQgdXNpbmcgdGhlIGZvbGxvd2luZyBzdHJ1Y3R1cmU6XG4gICAgICAgIC8vIHtpZDogJ2RlcGVuZGVuY3lJRCcsIHZhbHVlOiBuZXcgWW91ckRlcGVuZGVuY3koKX1cbiAgICAgICAgLy8gT1JcbiAgICAgICAgLy8ge2lkOiAnZGVwZW5kZW5jeVZhbHVlJywgdmFsdWU6IFwiU29tZUtleVZhbHVlXCJ9XG4gICAgICAgIHtpZDogJ21pZGRsZXdhcmUtbG9nZ2luJywgdmFsdWU6IG5ldyBMb2dnaW5nTWlkZGxld2FyZSgpfSxcbiAgICBdKTtcbn1cbiJdfQ==