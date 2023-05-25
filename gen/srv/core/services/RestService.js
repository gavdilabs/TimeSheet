"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const ExternalService_1 = __importDefault(require("./ExternalService"));
class RestService extends ExternalService_1.default {
    async Get(uri, req, headers) {
        return this.Send("GET", uri, req, undefined, headers);
    }
    async Post(uri, req, body, headers) {
        return this.Send("POST", uri, req, body, headers);
    }
    async Put(uri, req, body, headers) {
        return this.Send("PUT", uri, req, body, headers);
    }
    async Delete(uri, req, headers) {
        return this.Send("DELETE", uri, req, undefined, headers);
    }
    async Send(method, uri, req, body, headers) {
        return this.serviceConnection.tx(req).send(method, uri, body, headers);
    }
}
exports.default = RestService;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiUmVzdFNlcnZpY2UuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi9zcmMvY29yZS9zZXJ2aWNlcy9SZXN0U2VydmljZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7OztBQUFBLHdFQUFnRDtBQUloRCxNQUE4QixXQUFZLFNBQVEseUJBQWU7SUFFdEQsS0FBSyxDQUFDLEdBQUcsQ0FBQyxHQUFXLEVBQUUsR0FBWSxFQUFFLE9BQWdCO1FBQ3hELE9BQU8sSUFBSSxDQUFDLElBQUksQ0FBQyxLQUFLLEVBQUUsR0FBRyxFQUFFLEdBQUcsRUFBRSxTQUFTLEVBQUUsT0FBTyxDQUFDLENBQUM7SUFDMUQsQ0FBQztJQUVNLEtBQUssQ0FBQyxJQUFJLENBQUMsR0FBVyxFQUFFLEdBQVksRUFBRSxJQUFZLEVBQUUsT0FBZ0I7UUFDdkUsT0FBTyxJQUFJLENBQUMsSUFBSSxDQUFDLE1BQU0sRUFBRSxHQUFHLEVBQUUsR0FBRyxFQUFFLElBQUksRUFBRSxPQUFPLENBQUMsQ0FBQztJQUN0RCxDQUFDO0lBRU0sS0FBSyxDQUFDLEdBQUcsQ0FBQyxHQUFXLEVBQUUsR0FBWSxFQUFFLElBQVksRUFBRSxPQUFnQjtRQUN0RSxPQUFPLElBQUksQ0FBQyxJQUFJLENBQUMsS0FBSyxFQUFFLEdBQUcsRUFBRSxHQUFHLEVBQUUsSUFBSSxFQUFFLE9BQU8sQ0FBQyxDQUFDO0lBQ3JELENBQUM7SUFFTSxLQUFLLENBQUMsTUFBTSxDQUFDLEdBQVcsRUFBRSxHQUFZLEVBQUUsT0FBZ0I7UUFDM0QsT0FBTyxJQUFJLENBQUMsSUFBSSxDQUFDLFFBQVEsRUFBRSxHQUFHLEVBQUUsR0FBRyxFQUFFLFNBQVMsRUFBRSxPQUFPLENBQUMsQ0FBQztJQUM3RCxDQUFDO0lBRU0sS0FBSyxDQUFDLElBQUksQ0FBQyxNQUFjLEVBQUUsR0FBVyxFQUFFLEdBQVksRUFBRSxJQUFhLEVBQUUsT0FBZ0I7UUFDeEYsT0FBTyxJQUFJLENBQUMsaUJBQWlCLENBQUMsRUFBRSxDQUFDLEdBQUcsQ0FBQyxDQUFDLElBQUksQ0FBQyxNQUFNLEVBQUUsR0FBRyxFQUFFLElBQUksRUFBRSxPQUFPLENBQUMsQ0FBQztJQUMzRSxDQUFDO0NBRUo7QUF0QkQsOEJBc0JDIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IEV4dGVybmFsU2VydmljZSBmcm9tIFwiLi9FeHRlcm5hbFNlcnZpY2VcIjtcbmltcG9ydCB7IFJlcXVlc3QgfSBmcm9tIFwiQHNhcC9jZHMvYXBpcy9zZXJ2aWNlc1wiO1xuaW1wb3J0IGNkcyBmcm9tIFwiQHNhcC9jZHNcIjsgLy9OT1RFOiBUaGlzIHNob3VsZCBub3QgYmUgcmVtb3ZlZCFcblxuZXhwb3J0IGRlZmF1bHQgYWJzdHJhY3QgY2xhc3MgUmVzdFNlcnZpY2UgZXh0ZW5kcyBFeHRlcm5hbFNlcnZpY2Uge1xuXG4gICAgcHVibGljIGFzeW5jIEdldCh1cmk6IHN0cmluZywgcmVxOiBSZXF1ZXN0LCBoZWFkZXJzPzogb2JqZWN0KTogUHJvbWlzZTx1bmtub3duPiB7XG4gICAgICAgIHJldHVybiB0aGlzLlNlbmQoXCJHRVRcIiwgdXJpLCByZXEsIHVuZGVmaW5lZCwgaGVhZGVycyk7XG4gICAgfVxuXG4gICAgcHVibGljIGFzeW5jIFBvc3QodXJpOiBzdHJpbmcsIHJlcTogUmVxdWVzdCwgYm9keTogb2JqZWN0LCBoZWFkZXJzPzogb2JqZWN0KTogUHJvbWlzZTx1bmtub3duPiB7XG4gICAgICAgIHJldHVybiB0aGlzLlNlbmQoXCJQT1NUXCIsIHVyaSwgcmVxLCBib2R5LCBoZWFkZXJzKTtcbiAgICB9XG5cbiAgICBwdWJsaWMgYXN5bmMgUHV0KHVyaTogc3RyaW5nLCByZXE6IFJlcXVlc3QsIGJvZHk6IG9iamVjdCwgaGVhZGVycz86IG9iamVjdCk6IFByb21pc2U8dW5rbm93bj4ge1xuICAgICAgICByZXR1cm4gdGhpcy5TZW5kKFwiUFVUXCIsIHVyaSwgcmVxLCBib2R5LCBoZWFkZXJzKTtcbiAgICB9XG5cbiAgICBwdWJsaWMgYXN5bmMgRGVsZXRlKHVyaTogc3RyaW5nLCByZXE6IFJlcXVlc3QsIGhlYWRlcnM/OiBvYmplY3QpOiBQcm9taXNlPHVua25vd24+IHtcbiAgICAgICAgcmV0dXJuIHRoaXMuU2VuZChcIkRFTEVURVwiLCB1cmksIHJlcSwgdW5kZWZpbmVkLCBoZWFkZXJzKTtcbiAgICB9XG5cbiAgICBwdWJsaWMgYXN5bmMgU2VuZChtZXRob2Q6IHN0cmluZywgdXJpOiBzdHJpbmcsIHJlcTogUmVxdWVzdCwgYm9keT86IG9iamVjdCwgaGVhZGVycz86IG9iamVjdCk6IFByb21pc2U8dW5rbm93bj4ge1xuICAgICAgICByZXR1cm4gdGhpcy5zZXJ2aWNlQ29ubmVjdGlvbi50eChyZXEpLnNlbmQobWV0aG9kLCB1cmksIGJvZHksIGhlYWRlcnMpO1xuICAgIH1cblxufVxuIl19