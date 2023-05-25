import ExternalService from "./ExternalService";
import { Request } from "@sap/cds/apis/services";
import cds from "@sap/cds"; //NOTE: This should not be removed!

export default abstract class RestService extends ExternalService {

    public async Get(uri: string, req: Request, headers?: object): Promise<unknown> {
        return this.Send("GET", uri, req, undefined, headers);
    }

    public async Post(uri: string, req: Request, body: object, headers?: object): Promise<unknown> {
        return this.Send("POST", uri, req, body, headers);
    }

    public async Put(uri: string, req: Request, body: object, headers?: object): Promise<unknown> {
        return this.Send("PUT", uri, req, body, headers);
    }

    public async Delete(uri: string, req: Request, headers?: object): Promise<unknown> {
        return this.Send("DELETE", uri, req, undefined, headers);
    }

    public async Send(method: string, uri: string, req: Request, body?: object, headers?: object): Promise<unknown> {
        return this.serviceConnection.tx(req).send(method, uri, body, headers);
    }

}
