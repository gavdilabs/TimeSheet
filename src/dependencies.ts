import Container from "typedi";
import ExternalServiceFactory from "./core/services/ExternalServiceFactory";
import { LoggingMiddleware } from "./middleware/LoggingMiddleware";

// DI Container retrieval function
export default async function InitDIContainer(): Promise<void> {

    // Our dependency registration goes here!
    Container.set([
        // Dependencies are set using the following structure:
        // {id: 'dependencyID', value: new YourDependency()}
        // OR
        // {id: 'dependencyValue', value: "SomeKeyValue"}
        {id: 'middleware-loggin', value: new LoggingMiddleware()},
    ]);
}
