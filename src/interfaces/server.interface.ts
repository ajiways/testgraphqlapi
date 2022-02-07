import nano from "nano";
import { AuthorToPost } from "../types/author.type";
import { BookToPost } from "../types/book.type";
import { DBConntecionsResponse } from "./db.connections.response";

export interface ServerInterface {
   connect(): Promise<void>;

   connectToDb(): Promise<void>;

   disconnect(): Promise<void>;

   getDBConnections(): DBConntecionsResponse;

   initGraphQLInstance(
      booksConnection: nano.DocumentScope<BookToPost>,
      authorsConnection: nano.DocumentScope<AuthorToPost>
   ): void;
}
