import { Book } from "../classes/book.class";

export type BookToPost = Omit<Book, "processAPIResponse">;
