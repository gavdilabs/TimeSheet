"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const ExternalService_1 = __importDefault(require("./ExternalService"));
const caplog_1 = require("@gavdi/caplog");
/**
 * Abstraction of ExternalService with OData CRUD operations
 */
class ODataService extends ExternalService_1.default {
    constructor() {
        super(...arguments);
        /**
         * Default request headers for Create and Update calls
         */
        this._defaultHeaders = {
            "Content-Type": "application/json",
        };
    }
    /**
     * Read Operation for OData Remote Service
     * @param entityName Name of target entity on remote service
     * @param req Request object received during API call
     * @returns Response from remote service
     */
    async Read(entityName, req) {
        let query = SELECT.from(entityName).limit(req.query.SELECT.limit);
        if (req.query.SELECT.where) {
            query.where(req.query.SELECT.where);
        }
        else if (req.query.SELECT.from.ref[0].where) {
            query.where(req.query.SELECT.from.ref[0].where);
        }
        if (req.query.SELECT.orderBy) {
            query.orderBy(req.query.SELECT.orderBy);
        }
        if (req.query.SELECT.columns) {
            let columns = req.query.SELECT.columns;
            let result = columns.filter(el => {
                if (el.expand) {
                    el.expand[0] = el.ref[0];
                }
                return el !== "*";
            });
            query.columns(result);
        }
        caplog_1.Logger.getInstance().info(`Performing OData READ query on service: ${this.serviceName}`, query);
        return await this.serviceConnection.tx(req).send({
            query: query,
        });
    }
    /**
     * Create Operation for OData Remote Service
     * @param entityName Name of target entity on remote service
     * @param req Request object received during API call
     * @param data Optional data to send in create request. Overrides request data.
     * @returns Response from remote service
     */
    async Create(entityName, req, data) {
        let query = INSERT.into(entityName);
        if (!data && !req.data) {
            throw "No data body detected, aborting request";
        }
        query.entries([data ? data : req.data]);
        caplog_1.Logger.getInstance().info(`Performing OData CREATE call on service: ${this.serviceName}`, query);
        return await this.serviceConnection.tx(req).send({
            query: query,
            headers: this._defaultHeaders,
            body: data ? data : req.data,
        });
    }
    /**
     * Delete Operation for OData Remote Service
     * @param entityName Name of target entity on remote service
     * @param req Request object received during API call
     * @param key Optional key to send in delete request. Overrides request key.
     * @returns Response from remote service
     */
    async Delete(entityName, req, key) {
        let query = DELETE.from(entityName);
        if (!req.query.DELETE.byKey && !key) {
            throw "Missing key for deletion operation";
        }
        query.byKey(key ? key : req.query.DELETE.byKey);
        caplog_1.Logger.getInstance().info(`Performing OData DELETE call on service: ${this.serviceName}`, query);
        return await this.serviceConnection.tx(req).send({
            query: query,
        });
    }
    /**
     * Update Operation for OData Remote Service
     * @param entityName Name of target entity on remote service
     * @param req Request object received during API call
     * @param data Optional data body to send in request. Overrides request data.
     * @param key Optional key to send in update request. Overrides request key.
     * @returns Response from remote service
     */
    async Update(entityName, req, data, key) {
        let query = UPDATE.entity(entityName);
        if (!req.query.UPDATE.byKey && !key) {
            throw "Missing key for update operation";
        }
        if (!req.data && !data) {
            throw "Missing data for update operation";
        }
        query.byKey(key ? key : req.query.UPDATE.byKey);
        caplog_1.Logger.getInstance().info(`Performing OData UPDATE call on service: ${this.serviceName}`, query);
        return await this.serviceConnection.tx(req).send({
            query: query,
            headers: this._defaultHeaders,
            body: data ? data : req.data,
        });
    }
    /**
     * Run a SELECT query against an OData service
     * @param query SELECT query statement
     * @param req Request object received during API call
     * @returns Response from remote service
     */
    async RunSelectQuery(query, req) {
        caplog_1.Logger.getInstance().info(`Performing custom SELECT query on OData service: ${this.serviceName}`, query);
        return await this.serviceConnection.tx(req).send({
            query: query,
        });
    }
    /**
     * Run CREATE query against OData service
     * @param query CREATE query statement
     * @param req Request object received during API call
     * @param body Optional custom create object body
     * @returns Response from remote service
     */
    async RunCreateQuery(query, req, body) {
        caplog_1.Logger.getInstance().info(`Performing custom CREATE query on OData service: ${this.serviceName}`, query);
        return await this.serviceConnection.tx(req).send({
            query: query,
            headers: this._defaultHeaders,
            body: body ? body : req.data,
        });
    }
    /**
     * Run DELETE query against OData service
     * @param query DELETE query statement
     * @param req Request object received during API call
     * @returns Response from remote service
     */
    async RunDeleteQuery(query, req) {
        caplog_1.Logger.getInstance().info(`Performing custom DELETE query on OData service: ${this.serviceName}`, query);
        return await this.serviceConnection.tx(req).send({
            query: query,
        });
    }
    /**
     * Run a UPDATE query against OData service
     * @param query UPDATE query statement
     * @param req Request object received during API call
     * @param body Optional custom update body
     * @returns Response from remote service
     */
    async RunUpdateQuery(query, req, body) {
        caplog_1.Logger.getInstance().info(`Performing custom UPDATE query on OData service: ${this.serviceName}`, query);
        return await this.serviceConnection.tx(req).send({
            query: query,
            headers: this._defaultHeaders,
            body: body ? body : req.data,
        });
    }
}
exports.default = ODataService;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiT0RhdGFTZXJ2aWNlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vc3JjL2NvcmUvc2VydmljZXMvT0RhdGFTZXJ2aWNlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7O0FBQUEsd0VBQWdEO0FBQ2hELDBDQUF1QztBQUd2Qzs7R0FFRztBQUNILE1BQThCLFlBQWEsU0FBUSx5QkFBZTtJQUFsRTs7UUFDSTs7V0FFRztRQUNPLG9CQUFlLEdBQUc7WUFDeEIsY0FBYyxFQUFFLGtCQUFrQjtTQUNyQyxDQUFDO0lBMEtOLENBQUM7SUF4S0c7Ozs7O09BS0c7SUFDSSxLQUFLLENBQUMsSUFBSSxDQUFDLFVBQWtCLEVBQUUsR0FBUTtRQUMxQyxJQUFJLEtBQUssR0FBRyxNQUFNLENBQUMsSUFBSSxDQUFDLFVBQVUsQ0FBQyxDQUFDLEtBQUssQ0FBQyxHQUFHLENBQUMsS0FBSyxDQUFDLE1BQU0sQ0FBQyxLQUFLLENBQUMsQ0FBQztRQUVsRSxJQUFJLEdBQUcsQ0FBQyxLQUFLLENBQUMsTUFBTSxDQUFDLEtBQUssRUFBRTtZQUN4QixLQUFLLENBQUMsS0FBSyxDQUFDLEdBQUcsQ0FBQyxLQUFLLENBQUMsTUFBTSxDQUFDLEtBQUssQ0FBQyxDQUFDO1NBQ3ZDO2FBQU0sSUFBSSxHQUFHLENBQUMsS0FBSyxDQUFDLE1BQU0sQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDLEtBQUssRUFBRTtZQUMzQyxLQUFLLENBQUMsS0FBSyxDQUFDLEdBQUcsQ0FBQyxLQUFLLENBQUMsTUFBTSxDQUFDLElBQUksQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUMsS0FBSyxDQUFDLENBQUM7U0FDbkQ7UUFFRCxJQUFJLEdBQUcsQ0FBQyxLQUFLLENBQUMsTUFBTSxDQUFDLE9BQU8sRUFBRTtZQUMxQixLQUFLLENBQUMsT0FBTyxDQUFDLEdBQUcsQ0FBQyxLQUFLLENBQUMsTUFBTSxDQUFDLE9BQU8sQ0FBQyxDQUFDO1NB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QzdDLEtBQUssRUFBRSxLQUFLO1lBQ1osT0FBTyxFQUFFLElBQUksQ0FBQyxlQUFlO1lBQzdCLElBQUksRUFBRSxJQUFJLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsR0FBRyxDQUFDLElBQUk7U0FDL0IsQ0FBQyxDQUFDO0lBQ1AsQ0FBQztDQUNKO0FBaExELCtCQWdMQyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCBFeHRlcm5hbFNlcnZpY2UgZnJvbSBcIi4vRXh0ZXJuYWxTZXJ2aWNlXCI7XG5pbXBvcnQgeyBMb2dnZXIgfSBmcm9tIFwiQGdhdmRpL2NhcGxvZ1wiO1xuaW1wb3J0IGNkcyBmcm9tIFwiQHNhcC9jZHNcIjsgLy9OT1RFOiBUaGlzIGNhbm5vdCBiZSByZW1vdmVkIVxuXG4vKipcbiAqIEFic3RyYWN0aW9uIG9mIEV4dGVybmFsU2VydmljZSB3aXRoIE9EYXRhIENSVUQgb3BlcmF0aW9uc1xuICovXG5leHBvcnQgZGVmYXVsdCBhYnN0cmFjdCBjbGFzcyBPRGF0YVNlcnZpY2UgZXh0ZW5kcyBFeHRlcm5hbFNlcnZpY2Uge1xuICAgIC8qKlxuICAgICAqIERlZmF1bHQgcmVxdWVzdCBoZWFkZXJzIGZvciBDcmVhdGUgYW5kIFVwZGF0ZSBjYWxsc1xuICAgICAqL1xuICAgIHByb3RlY3RlZCBfZGVmYXVsdEhlYWRlcnMgPSB7XG4gICAgICAgIFwiQ29udGVudC1UeXBlXCI6IFwiYXBwbGljYXRpb24vanNvblwiLFxuICAgIH07XG5cbiAgICAvKipcbiAgICAgKiBSZWFkIE9wZXJhdGlvbiBmb3IgT0RhdGEgUmVtb3RlIFNlcnZpY2VcbiAgICAgKiBAcGFyYW0gZW50aXR5TmFtZSBOYW1lIG9mIHRhcmdldCBlbnRpdHkgb24gcmVtb3RlIHNlcnZpY2VcbiAgICAgKiBAcGFyYW0gcmVxIFJlcXVlc3Qgb2JqZWN0IHJlY2VpdmVkIGR1cmluZyBBUEkgY2FsbFxuICAgICAqIEByZXR1cm5zIFJlc3BvbnNlIGZyb20gcmVtb3RlIHNlcnZpY2VcbiAgICAgKi9cbiAgICBwdWJsaWMgYXN5bmMgUmVhZChlbnRpdHlOYW1lOiBzdHJpbmcsIHJlcTogYW55KTogUHJvbWlzZTx1bmtub3duW10+IHtcbiAgICAgICAgbGV0IHF1ZXJ5ID0gU0VMRUNULmZyb20oZW50aXR5TmFtZSkubGltaXQocmVxLnF1ZXJ5LlNFTEVDVC5saW1pdCk7XG5cbiAgICAgICAgaWYgKHJlcS5xdWVyeS5TRUxFQ1Qud2hlcmUpIHtcbiAgICAgICAgICAgIHF1ZXJ5LndoZXJlKHJlcS5xdWVyeS5TRUxFQ1Qud2hlcmUpO1xuICAgICAgICB9IGVsc2UgaWYgKHJlcS5xdWVyeS5TRUxFQ1QuZnJvbS5yZWZbMF0ud2hlcmUpIHtcbiAgICAgICAgICAgIHF1ZXJ5LndoZXJlKHJlcS5xdWVyeS5TRUxFQ1QuZnJvbS5yZWZbMF0ud2hlcmUpO1xuICAgICAgICB9XG5cbiAgICAgICAgaWYgKHJlcS5xdWVyeS5TRUxFQ1Qub3JkZXJCeSkge1xuICAgICAgICAgICAgcXVlcnkub3JkZXJCeShyZXEucXVlcnkuU0VMRUNULm9yZGVyQnkpO1xuICAgICAgICB9XG5cbiAgICAgICAgaWYgKHJlcS5xdWVyeS5TRUxFQ1QuY29sdW1ucykge1xuICAgICAgICAgICAgbGV0IGNvbHVtbnMgPSByZXEucXVlcnkuU0VMRUNULmNvbHVtbnM7XG4gICAgICAgICAgICBsZXQgcmVzdWx0ID0gY29sdW1ucy5maWx0ZXIoZWwgPT4ge1xuICAgICAgICAgICAgICAgIGlmIChlbC5leHBhbmQpIHtcbiAgICAgICAgICAgICAgICAgICAgZWwuZXhwYW5kWzBdID0gZWwucmVmWzBdO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICByZXR1cm4gZWwgIT09IFwiKlwiO1xuICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICBxdWVyeS5jb2x1bW5zKHJlc3VsdCk7XG4gICAgICAgIH1cblxuICAgICAgICBMb2dnZXIuZ2V0SW5zdGFuY2UoKS5pbmZvKGBQZXJmb3JtaW5nIE9EYXRhIFJFQUQgcXVlcnkgb24gc2VydmljZTogJHt0aGlzLnNlcnZpY2VOYW1lfWAsIHF1ZXJ5KTtcblxuICAgICAgICByZXR1cm4gYXdhaXQgdGhpcy5zZXJ2aWNlQ29ubmVjdGlvbi50eChyZXEpLnNlbmQoe1xuICAgICAgICAgICAgcXVlcnk6IHF1ZXJ5LFxuICAgICAgICB9KTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBDcmVhdGUgT3BlcmF0aW9uIGZvciBPRGF0YSBSZW1vdGUgU2VydmljZVxuICAgICAqIEBwYXJhbSBlbnRpdHlOYW1lIE5hbWUgb2YgdGFyZ2V0IGVudGl0eSBvbiByZW1vdGUgc2VydmljZVxuICAgICAqIEBwYXJhbSByZXEgUmVxdWVzdCBvYmplY3QgcmVjZWl2ZWQgZHVyaW5nIEFQSSBjYWxsXG4gICAgICogQHBhcmFtIGRhdGEgT3B0aW9uYWwgZGF0YSB0byBzZW5kIGluIGNyZWF0ZSByZXF1ZXN0LiBPdmVycmlkZXMgcmVxdWVzdCBkYXRhLlxuICAgICAqIEByZXR1cm5zIFJlc3BvbnNlIGZyb20gcmVtb3RlIHNlcnZpY2VcbiAgICAgKi9cbiAgICBwdWJsaWMgYXN5bmMgQ3JlYXRlKGVudGl0eU5hbWU6IHN0cmluZywgcmVxOiBhbnksIGRhdGE/OiBhbnkpOiBQcm9taXNlPHVua25vd24+IHtcbiAgICAgICAgbGV0IHF1ZXJ5ID0gSU5TRVJULmludG8oZW50aXR5TmFtZSk7XG5cbiAgICAgICAgaWYgKCFkYXRhICYmICFyZXEuZGF0YSkge1xuICAgICAgICAgICAgdGhyb3cgXCJObyBkYXRhIGJvZHkgZGV0ZWN0ZWQsIGFib3J0aW5nIHJlcXVlc3RcIjtcbiAgICAgICAgfVxuXG4gICAgICAgIHF1ZXJ5LmVudHJpZXMoW2RhdGEgPyBkYXRhIDogcmVxLmRhdGFdKTtcblxuICAgICAgICBMb2dnZXIuZ2V0SW5zdGFuY2UoKS5pbmZvKGBQZXJmb3JtaW5nIE9EYXRhIENSRUFURSBjYWxsIG9uIHNlcnZpY2U6ICR7dGhpcy5zZXJ2aWNlTmFtZX1gLCBxdWVyeSk7XG5cbiAgICAgICAgcmV0dXJuIGF3YWl0IHRoaXMuc2VydmljZUNvbm5lY3Rpb24udHgocmVxKS5zZW5kKHtcbiAgICAgICAgICAgIHF1ZXJ5OiBxdWVyeSxcbiAgICAgICAgICAgIGhlYWRlcnM6IHRoaXMuX2RlZmF1bHRIZWFkZXJzLFxuICAgICAgICAgICAgYm9keTogZGF0YSA/IGRhdGEgOiByZXEuZGF0YSxcbiAgICAgICAgfSk7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogRGVsZXRlIE9wZXJhdGlvbiBmb3IgT0RhdGEgUmVtb3RlIFNlcnZpY2VcbiAgICAgKiBAcGFyYW0gZW50aXR5TmFtZSBOYW1lIG9mIHRhcmdldCBlbnRpdHkgb24gcmVtb3RlIHNlcnZpY2VcbiAgICAgKiBAcGFyYW0gcmVxIFJlcXVlc3Qgb2JqZWN0IHJlY2VpdmVkIGR1cmluZyBBUEkgY2FsbFxuICAgICAqIEBwYXJhbSBrZXkgT3B0aW9uYWwga2V5IHRvIHNlbmQgaW4gZGVsZXRlIHJlcXVlc3QuIE92ZXJyaWRlcyByZXF1ZXN0IGtleS5cbiAgICAgKiBAcmV0dXJucyBSZXNwb25zZSBmcm9tIHJlbW90ZSBzZXJ2aWNlXG4gICAgICovXG4gICAgcHVibGljIGFzeW5jIERlbGV0ZShlbnRpdHlOYW1lOiBzdHJpbmcsIHJlcTogYW55LCBrZXk/OiBzdHJpbmcpOiBQcm9taXNlPHVua25vd24+IHtcbiAgICAgICAgbGV0IHF1ZXJ5ID0gREVMRVRFLmZyb20oZW50aXR5TmFtZSk7XG5cbiAgICAgICAgaWYgKCFyZXEucXVlcnkuREVMRVRFLmJ5S2V5ICYmICFrZXkpIHtcbiAgICAgICAgICAgIHRocm93IFwiTWlzc2luZyBrZXkgZm9yIGRlbGV0aW9uIG9wZXJhdGlvblwiO1xuICAgICAgICB9XG5cbiAgICAgICAgcXVlcnkuYnlLZXkoa2V5ID8ga2V5IDogcmVxLnF1ZXJ5LkRFTEVURS5ieUtleSk7XG4gICAgICAgIExvZ2dlci5nZXRJbnN0YW5jZSgpLmluZm8oYFBlcmZvcm1pbmcgT0RhdGEgREVMRVRFIGNhbGwgb24gc2VydmljZTogJHt0aGlzLnNlcnZpY2VOYW1lfWAsIHF1ZXJ5KTtcbiAgICAgICAgcmV0dXJuIGF3YWl0IHRoaXMuc2VydmljZUNvbm5lY3Rpb24udHgocmVxKS5zZW5kKHtcbiAgICAgICAgICAgIHF1ZXJ5OiBxdWVyeSxcbiAgICAgICAgfSk7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogVXBkYXRlIE9wZXJhdGlvbiBmb3IgT0RhdGEgUmVtb3RlIFNlcnZpY2VcbiAgICAgKiBAcGFyYW0gZW50aXR5TmFtZSBOYW1lIG9mIHRhcmdldCBlbnRpdHkgb24gcmVtb3RlIHNlcnZpY2VcbiAgICAgKiBAcGFyYW0gcmVxIFJlcXVlc3Qgb2JqZWN0IHJlY2VpdmVkIGR1cmluZyBBUEkgY2FsbFxuICAgICAqIEBwYXJhbSBkYXRhIE9wdGlvbmFsIGRhdGEgYm9keSB0byBzZW5kIGluIHJlcXVlc3QuIE92ZXJyaWRlcyByZXF1ZXN0IGRhdGEuXG4gICAgICogQHBhcmFtIGtleSBPcHRpb25hbCBrZXkgdG8gc2VuZCBpbiB1cGRhdGUgcmVxdWVzdC4gT3ZlcnJpZGVzIHJlcXVlc3Qga2V5LlxuICAgICAqIEByZXR1cm5zIFJlc3BvbnNlIGZyb20gcmVtb3RlIHNlcnZpY2VcbiAgICAgKi9cbiAgICBwdWJsaWMgYXN5bmMgVXBkYXRlKGVudGl0eU5hbWU6IHN0cmluZywgcmVxOiBhbnksIGRhdGE/OiBhbnksIGtleT86IHN0cmluZyB8IG9iamVjdCk6IFByb21pc2U8dW5rbm93bj4ge1xuICAgICAgICBsZXQgcXVlcnkgPSBVUERBVEUuZW50aXR5KGVudGl0eU5hbWUpO1xuXG4gICAgICAgIGlmICghcmVxLnF1ZXJ5LlVQREFURS5ieUtleSAmJiAha2V5KSB7XG4gICAgICAgICAgICB0aHJvdyBcIk1pc3Npbmcga2V5IGZvciB1cGRhdGUgb3BlcmF0aW9uXCI7XG4gICAgICAgIH1cblxuICAgICAgICBpZiAoIXJlcS5kYXRhICYmICFkYXRhKSB7XG4gICAgICAgICAgICB0aHJvdyBcIk1pc3NpbmcgZGF0YSBmb3IgdXBkYXRlIG9wZXJhdGlvblwiO1xuICAgICAgICB9XG5cbiAgICAgICAgcXVlcnkuYnlLZXkoa2V5ID8ga2V5IDogcmVxLnF1ZXJ5LlVQREFURS5ieUtleSk7XG4gICAgICAgIExvZ2dlci5nZXRJbnN0YW5jZSgpLmluZm8oYFBlcmZvcm1pbmcgT0RhdGEgVVBEQVRFIGNhbGwgb24gc2VydmljZTogJHt0aGlzLnNlcnZpY2VOYW1lfWAsIHF1ZXJ5KTtcbiAgICAgICAgcmV0dXJuIGF3YWl0IHRoaXMuc2VydmljZUNvbm5lY3Rpb24udHgocmVxKS5zZW5kKHtcbiAgICAgICAgICAgIHF1ZXJ5OiBxdWVyeSxcbiAgICAgICAgICAgIGhlYWRlcnM6IHRoaXMuX2RlZmF1bHRIZWFkZXJzLFxuICAgICAgICAgICAgYm9keTogZGF0YSA/IGRhdGEgOiByZXEuZGF0YSxcbiAgICAgICAgfSk7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogUnVuIGEgU0VMRUNUIHF1ZXJ5IGFnYWluc3QgYW4gT0RhdGEgc2VydmljZVxuICAgICAqIEBwYXJhbSBxdWVyeSBTRUxFQ1QgcXVlcnkgc3RhdGVtZW50XG4gICAgICogQHBhcmFtIHJlcSBSZXF1ZXN0IG9iamVjdCByZWNlaXZlZCBkdXJpbmcgQVBJIGNhbGxcbiAgICAgKiBAcmV0dXJucyBSZXNwb25zZSBmcm9tIHJlbW90ZSBzZXJ2aWNlXG4gICAgICovXG4gICAgcHVibGljIGFzeW5jIFJ1blNlbGVjdFF1ZXJ5KHF1ZXJ5OiBTRUxFQ1Q8dW5rbm93bj4sIHJlcTogYW55KTogUHJvbWlzZTx1bmtub3duPiB7XG4gICAgICAgIExvZ2dlci5nZXRJbnN0YW5jZSgpLmluZm8oYFBlcmZvcm1pbmcgY3VzdG9tIFNFTEVDVCBxdWVyeSBvbiBPRGF0YSBzZXJ2aWNlOiAke3RoaXMuc2VydmljZU5hbWV9YCwgcXVlcnkpO1xuICAgICAgICByZXR1cm4gYXdhaXQgdGhpcy5zZXJ2aWNlQ29ubmVjdGlvbi50eChyZXEpLnNlbmQoe1xuICAgICAgICAgICAgcXVlcnk6IHF1ZXJ5LFxuICAgICAgICB9KTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBSdW4gQ1JFQVRFIHF1ZXJ5IGFnYWluc3QgT0RhdGEgc2VydmljZVxuICAgICAqIEBwYXJhbSBxdWVyeSBDUkVBVEUgcXVlcnkgc3RhdGVtZW50XG4gICAgICogQHBhcmFtIHJlcSBSZXF1ZXN0IG9iamVjdCByZWNlaXZlZCBkdXJpbmcgQVBJIGNhbGxcbiAgICAgKiBAcGFyYW0gYm9keSBPcHRpb25hbCBjdXN0b20gY3JlYXRlIG9iamVjdCBib2R5XG4gICAgICogQHJldHVybnMgUmVzcG9uc2UgZnJvbSByZW1vdGUgc2VydmljZVxuICAgICAqL1xuICAgIHB1YmxpYyBhc3luYyBSdW5DcmVhdGVRdWVyeShxdWVyeTogQ1JFQVRFPHVua25vd24+LCByZXE6IGFueSwgYm9keT86IHVua25vd24pOiBQcm9taXNlPHVua25vd24+IHtcbiAgICAgICAgTG9nZ2VyLmdldEluc3RhbmNlKCkuaW5mbyhgUGVyZm9ybWluZyBjdXN0b20gQ1JFQVRFIHF1ZXJ5IG9uIE9EYXRhIHNlcnZpY2U6ICR7dGhpcy5zZXJ2aWNlTmFtZX1gLCBxdWVyeSk7XG4gICAgICAgIHJldHVybiBhd2FpdCB0aGlzLnNlcnZpY2VDb25uZWN0aW9uLnR4KHJlcSkuc2VuZCh7XG4gICAgICAgICAgICBxdWVyeTogcXVlcnksXG4gICAgICAgICAgICBoZWFkZXJzOiB0aGlzLl9kZWZhdWx0SGVhZGVycyxcbiAgICAgICAgICAgIGJvZHk6IGJvZHkgPyBib2R5IDogcmVxLmRhdGEsXG4gICAgICAgIH0pO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIFJ1biBERUxFVEUgcXVlcnkgYWdhaW5zdCBPRGF0YSBzZXJ2aWNlXG4gICAgICogQHBhcmFtIHF1ZXJ5IERFTEVURSBxdWVyeSBzdGF0ZW1lbnRcbiAgICAgKiBAcGFyYW0gcmVxIFJlcXVlc3Qgb2JqZWN0IHJlY2VpdmVkIGR1cmluZyBBUEkgY2FsbFxuICAgICAqIEByZXR1cm5zIFJlc3BvbnNlIGZyb20gcmVtb3RlIHNlcnZpY2VcbiAgICAgKi9cbiAgICBwdWJsaWMgYXN5bmMgUnVuRGVsZXRlUXVlcnkocXVlcnk6IERFTEVURTx1bmtub3duPiwgcmVxOiBhbnkpOiBQcm9taXNlPHVua25vd24+IHtcbiAgICAgICAgTG9nZ2VyLmdldEluc3RhbmNlKCkuaW5mbyhgUGVyZm9ybWluZyBjdXN0b20gREVMRVRFIHF1ZXJ5IG9uIE9EYXRhIHNlcnZpY2U6ICR7dGhpcy5zZXJ2aWNlTmFtZX1gLCBxdWVyeSk7XG4gICAgICAgIHJldHVybiBhd2FpdCB0aGlzLnNlcnZpY2VDb25uZWN0aW9uLnR4KHJlcSkuc2VuZCh7XG4gICAgICAgICAgICBxdWVyeTogcXVlcnksXG4gICAgICAgIH0pO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIFJ1biBhIFVQREFURSBxdWVyeSBhZ2FpbnN0IE9EYXRhIHNlcnZpY2VcbiAgICAgKiBAcGFyYW0gcXVlcnkgVVBEQVRFIHF1ZXJ5IHN0YXRlbWVudFxuICAgICAqIEBwYXJhbSByZXEgUmVxdWVzdCBvYmplY3QgcmVjZWl2ZWQgZHVyaW5nIEFQSSBjYWxsXG4gICAgICogQHBhcmFtIGJvZHkgT3B0aW9uYWwgY3VzdG9tIHVwZGF0ZSBib2R5XG4gICAgICogQHJldHVybnMgUmVzcG9uc2UgZnJvbSByZW1vdGUgc2VydmljZVxuICAgICAqL1xuICAgIHB1YmxpYyBhc3luYyBSdW5VcGRhdGVRdWVyeShxdWVyeTogVVBEQVRFPHVua25vd24+LCByZXE6IGFueSwgYm9keT86IHVua25vd24pOiBQcm9taXNlPHVua25vd24+IHtcbiAgICAgICAgTG9nZ2VyLmdldEluc3RhbmNlKCkuaW5mbyhgUGVyZm9ybWluZyBjdXN0b20gVVBEQVRFIHF1ZXJ5IG9uIE9EYXRhIHNlcnZpY2U6ICR7dGhpcy5zZXJ2aWNlTmFtZX1gLCBxdWVyeSk7XG4gICAgICAgIHJldHVybiBhd2FpdCB0aGlzLnNlcnZpY2VDb25uZWN0aW9uLnR4KHJlcSkuc2VuZCh7XG4gICAgICAgICAgICBxdWVyeTogcXVlcnksXG4gICAgICAgICAgICBoZWFkZXJzOiB0aGlzLl9kZWZhdWx0SGVhZGVycyxcbiAgICAgICAgICAgIGJvZHk6IGJvZHkgPyBib2R5IDogcmVxLmRhdGEsXG4gICAgICAgIH0pO1xuICAgIH1cbn1cblxuIl19