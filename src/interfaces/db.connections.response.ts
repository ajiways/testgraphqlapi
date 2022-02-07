import nano from "nano";
import { AuthorToPost } from "../types/author.type";
import { BookToPost } from "../types/book.type";

export interface DBConntecionsResponse {
   books: nano.DocumentScope<BookToPost>;
   authors: nano.DocumentScope<AuthorToPost>;
}
