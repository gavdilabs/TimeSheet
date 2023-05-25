import { Logger } from "@gavdi/caplog";
import { Request } from "@sap/cds/apis/services";
import { ICdsMiddleware, Middleware, Req } from "cds-routing-handlers";
import { Service } from "typedi";

@Middleware({global: true, priority: 1 })
@Service()
export class LoggingMiddleware implements ICdsMiddleware {

    public async use(@Req() req: Request): Promise<void> {
        Logger.getInstance().info(`Request received, targeting event: ${req}`);
    }

}


