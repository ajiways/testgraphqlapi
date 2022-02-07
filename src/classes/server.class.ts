import { ServerInterface } from "../interfaces/server.interface";
import express from "express";
import http from "http";
import nano from "nano";
import * as credetials from "../misc/db.credetials";
import { initDb } from "../misc/init.db";
import { AuthorToPost } from "../types/author.type";
import { BookToPost } from "../types/book.type";
import { initGraphQL } from "../misc/init.graphql";
import { DBConntecionsResponse } from "../interfaces/db.connections.response";
import { ConfigService } from "../services/config.service";

export class Server implements ServerInterface {
   private app: express.Application;
   private connection: http.Server | null = null;
   private dbConnection: nano.ServerScope | null = null;
   private readonly port: number;

   constructor() {
      this.port = ConfigService.getClientPort();
      this.app = express();
   }

   async connect(): Promise<void> {
      return new Promise(async (resolve) => {
         this.connection = this.app.listen(this.port, resolve);
         console.log(`Server is running on ${this.port}`);
      });
   }

   async connectToDb(): Promise<void> {
      this.dbConnection = nano(
         `http://${credetials.DB_USER}:${credetials.DB_PASSWORD}@${credetials.DB_HOST}:${credetials.DB_PORT}`
      );
      await this.dbConnection.db.list().then(
         (dbs) => {
            const booksDbExists = dbs.find((name) => name === "books");
            const authorsDbExists = dbs.find((name) => name === "authors");

            if (authorsDbExists && booksDbExists) {
               console.log("Both db's already exists");
               return;
            } else {
               initDb(this.dbConnection);
            }
         },
         (err) => {
            console.log(err);
         }
      );
   }

   disconnect(): Promise<void> {
      return new Promise((resolve, reject) => {
         if (this.connection) {
            this.connection.close((err) => {
               if (err) {
                  reject(err);
               } else {
                  console.log("The server has been shut down");
                  resolve();
               }
            });
         }
      });
   }

   getDBConnections(): DBConntecionsResponse {
      const books: nano.DocumentScope<BookToPost> = this.dbConnection.db.use("books");
      const authors: nano.DocumentScope<AuthorToPost> = this.dbConnection.db.use("authors");

      return { books, authors };
   }

   initGraphQLInstance(
      booksConnection: nano.DocumentScope<BookToPost>,
      authorsConnection: nano.DocumentScope<AuthorToPost>
   ): void {
      initGraphQL(booksConnection, authorsConnection, this.app);
   }
}
