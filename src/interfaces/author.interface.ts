import nano from "nano";
import { Book } from "../classes/book.class";

export interface AuthorInterface extends nano.MaybeDocument {
   name: string;
   lastName: string;
   books: Book[];
}
