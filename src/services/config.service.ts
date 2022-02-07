import { config } from "dotenv";
config();

export class ConfigService {
   static getClientPort(): number {
      const port = process.env.PORT;

      if (!Number(port)) {
         throw new Error("Can't start the server without the port");
      } else {
         return Number(port);
      }
   }

   static getDBUser(): string {
      const user = process.env.DB_USER;

      if (!user) {
         throw new Error("Cannot connect to db without db's username");
      } else {
         return user;
      }
   }

   static getDBPassword(): string {
      const password = process.env.DB_PASSWORD;

      if (!password) {
         throw new Error("Cannot connect to db without db's password");
      } else {
         return password;
      }
   }

   static getDBHost(): string {
      const host = process.env.DB_HOST;

      if (!host) {
         throw new Error("Cannot connect to db without db's host address");
      } else {
         return host;
      }
   }

   static getDBPort(): number {
      const dbPort = process.env.DB_PORT;

      if (!Number(dbPort)) {
         throw new Error("Cannot connect to db without the port");
      } else {
         return Number(dbPort);
      }
   }
}
