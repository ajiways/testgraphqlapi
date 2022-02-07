import { Author } from "../classes/author.class";

export type AuthorToPost = Omit<Author, "processAPIResponse">;
