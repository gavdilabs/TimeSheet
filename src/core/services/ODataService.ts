import ExternalService from "./ExternalService";
import { Logger } from "@gavdi/caplog";
import cds from "@sap/cds"; //NOTE: This cannot be removed!

/**
 * Abstraction of ExternalService with OData CRUD operations
 */
export default abstract class ODataService extends ExternalService {
    /**
     * Default request headers for Create and Update calls
     */
    protected _defaultHeaders = {
        "Content-Type": "application/json",
    };

    /**
     * Read Operation for OData Remote Service
     * @param entityName Name of target entity on remote service
     * @param req Request object received during API call
     * @returns Response from remote service
     */
    public async Read(entityName: string, req: any): Promise<unknown[]> {
        let query = SELECT.from(entityName).limit(req.query.SELECT.limit);

        if (req.query.SELECT.where) {
            query.where(req.query.SELECT.where);
        } else if (req.query.SELECT.from.ref[0].where) {
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

        Logger.getInstance().info(`Performing OData READ query on service: ${this.serviceName}`, query);

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
    public async Create(entityName: string, req: any, data?: any): Promise<unknown> {
        let query = INSERT.into(entityName);

        if (!data && !req.data) {
            throw "No data body detected, aborting request";
        }

        query.entries([data ? data : req.data]);

        Logger.getInstance().info(`Performing OData CREATE call on service: ${this.serviceName}`, query);

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
    public async Delete(entityName: string, req: any, key?: string): Promise<unknown> {
        let query = DELETE.from(entityName);

        if (!req.query.DELETE.byKey && !key) {
            throw "Missing key for deletion operation";
        }

        query.byKey(key ? key : req.query.DELETE.byKey);
        Logger.getInstance().info(`Performing OData DELETE call on service: ${this.serviceName}`, query);
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
    public async Update(entityName: string, req: any, data?: any, key?: string | object): Promise<unknown> {
        let query = UPDATE.entity(entityName);

        if (!req.query.UPDATE.byKey && !key) {
            throw "Missing key for update operation";
        }

        if (!req.data && !data) {
            throw "Missing data for update operation";
        }

        query.byKey(key ? key : req.query.UPDATE.byKey);
        Logger.getInstance().info(`Performing OData UPDATE call on service: ${this.serviceName}`, query);
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
    public async RunSelectQuery(query: SELECT<unknown>, req: any): Promise<unknown> {
        Logger.getInstance().info(`Performing custom SELECT query on OData service: ${this.serviceName}`, query);
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
    public async RunCreateQuery(query: CREATE<unknown>, req: any, body?: unknown): Promise<unknown> {
        Logger.getInstance().info(`Performing custom CREATE query on OData service: ${this.serviceName}`, query);
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
    public async RunDeleteQuery(query: DELETE<unknown>, req: any): Promise<unknown> {
        Logger.getInstance().info(`Performing custom DELETE query on OData service: ${this.serviceName}`, query);
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
    public async RunUpdateQuery(query: UPDATE<unknown>, req: any, body?: unknown): Promise<unknown> {
        Logger.getInstance().info(`Performing custom UPDATE query on OData service: ${this.serviceName}`, query);
        return await this.serviceConnection.tx(req).send({
            query: query,
            headers: this._defaultHeaders,
            body: body ? body : req.data,
        });
    }
}

