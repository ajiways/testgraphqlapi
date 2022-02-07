import nano from "nano";
import { BookInterface } from "../interfaces/book.interface";
import { Author } from "./author.class";

export class Book implements BookInterface {
   title: string;
   authors: Record<string, string>[];
   _id?: string;
   _rev?: string;

   constructor(title: string, authorName: Author["name"], authorLastName: Author["lastName"]) {
      this._id = undefined;
      this._rev = undefined;
      this.title = title;
      this.authors = [
         {
            name: authorName,
            lastName: authorLastName,
         },
      ];
   }

   processAPIResponse(response: nano.DocumentInsertResponse) {
      if (response.ok === true) {
         this._id = response.id;
         this._rev = response.rev;
      }
   }
}
