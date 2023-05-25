import "reflect-metadata";
import { createCombinedHandler, useContainer } from "cds-routing-handlers";
import cds from "@sap/cds";
import express from "express"
import { Application } from "express";
import { LoggingMiddleware } from "./middleware/LoggingMiddleware";
import { Logger } from "@gavdi/caplog";
import Container from "typedi";
import InitDIContainer from "./dependencies";

/**
 * Entry point for the entire CAP service.
 * All service connections and/or other external dependencies should be resolved here.
 */
export default class Server {

    /**
     * Boots up and runs the CAP server.
     */
    public static async Run(): Promise<void> {
        const app = await this.Bootstrap();
        const port = process.env.PORT || 3001;
        app.listen(port, async () => {
            Logger.getInstance().info(`Server is listening at http://localhost:${port}`);
        });
    }

    /**
    * Bootstraps the service configuration and returns the express server app.
    * Primarily used for automated tests but also part of run process.
    */
    public static async Bootstrap(): Promise<Application> {
        const app = express();
        await this.serviceConfiguration(app);
        return app;
    }

    /**
     * CAP service configuration function.
     * Sets up the middleware, handlers and routes.
     * MUST ONLY BE RUN AT START-UP!
     * @param app Express app
     */
    private static async serviceConfiguration(app: Application): Promise<void> {
        Logger.getInstance().info("Configuring service setup...");

        // First we register our handlers and middleware
        const hdl = createCombinedHandler({
            handler: [
                `${__dirname}/api/entities/**/*.js`,
                `${__dirname}/api/functions/**/*.js`,
                `${__dirname}/api/actions/**/*.js`,
                `${__dirname}/api/external/**/*.js`
            ],
            middlewares: [
                LoggingMiddleware
            ]
        });

        // We then tell CDS to server our project with our custom logic
        await cds
            .serve("all")
            .at("odata")
            .in(app)
            .with(srv => hdl(srv));
        await cds.connect.to("db")
        // Setup the DI Container
        await InitDIContainer();

        // Needed by our handler constructor for dependency injection
        useContainer(Container);

        // Redirection to OData service
        app.get("/", (req, res) => {
            res.redirect("/odata/$metadata");
        });

        Logger.getInstance().info("Service configured and ready");
    }
}

// Entrypoint (using Dependency Injection)
Server.Run();
