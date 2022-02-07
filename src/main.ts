import { config } from "dotenv";
import { Server } from "./classes/server.class";
config();

const app = new Server();

const bootstrap = async (): Promise<void> => {
   await app.connect();
   await app.connectToDb();
   const { books, authors } = app.getDBConnections();
   app.initGraphQLInstance(books, authors);
};

bootstrap();
