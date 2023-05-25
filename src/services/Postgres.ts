import { Service } from "typedi";
import DBService from "../core/services/DbService";

@Service({id: "postgres"})
export default class Postgres extends DBService {

    constructor() {
        super("db");
    }

}
