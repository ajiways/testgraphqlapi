import { ConfigService } from "../services/config.service";

const DB_USER = ConfigService.getDBUser();
const DB_PASSWORD = ConfigService.getDBPassword();
const DB_HOST = ConfigService.getDBHost();
const DB_PORT = ConfigService.getDBPort();

export { DB_HOST, DB_PORT, DB_USER, DB_PASSWORD };
