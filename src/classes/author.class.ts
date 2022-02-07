import nano from "nano";
import { AuthorInterface } from "../interfaces/author.interface";
import { Book } from "./book.class";

export class Author implements AuthorInterface {
   name: string;
   lastName: string;
   books: Book[];
   _id?: string;
   _rev?: string;

   constructor(name: string, lastName: string, books: Book[]) {
      this._id = undefined;
      this._rev = undefined;
      this.name = name;
      this.lastName = lastName;
      this.books = books;
   }

   processAPIResponse(response: nano.DocumentInsertResponse) {
      if (response.ok === true) {
         this._id = response.id;
         this._rev = response.rev;
      }
   }
}
