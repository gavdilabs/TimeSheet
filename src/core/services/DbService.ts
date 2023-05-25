import { Logger } from "@gavdi/caplog";
import ExternalService from "./ExternalService";

const dbLogger = Logger.createLogger("LOGGER::DB");

export default abstract class DBService extends ExternalService {

    constructor(name : string) {
        super(name);
    }

    public async RunQuery(req: any) : Promise<unknown> {
        dbLogger.info(`Performing database query: ${JSON.stringify(req.query)}`);
        return await this.serviceConnection.tx(req).run(req.query);
    }

    public async Run<T>(query: SELECT<T> | DELETE<T> | INSERT<T> | UPDATE<T>): Promise<T> {
        dbLogger.info(`Performing custom database query`);
        return await this.serviceConnection.run(query);
    }

}

