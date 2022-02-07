import nano from "nano";
import path from "path";
import { AuthorToPost } from "../types/author.type";
import { BookToPost } from "../types/book.type";
import fs from "fs";
import { Author } from "../classes/author.class";
import { Book } from "../classes/book.class";

export const initDb = async (connection: nano.ServerScope) => {
   await connection.db.create("books");
   await connection.db.create("authors");

   const tmpBooksConnection: nano.DocumentScope<BookToPost> = connection.db.use("books");
   const tmpAuthorConnection: nano.DocumentScope<AuthorToPost> = connection.db.use("authors");

   const authorsArr = JSON.parse(
      fs.readFileSync(path.resolve(__dirname, "../", "../seeds/authors.json")).toString()
   ).authors;

   const booksArr = JSON.parse(
      fs.readFileSync(path.resolve(__dirname, "../", "../seeds/books.json")).toString()
   ).books;

   booksArr.forEach(async (item: Book, idx: number) => {
      const author = new Author(authorsArr[idx].name, authorsArr[idx].lastName, []);

      await tmpAuthorConnection.insert(author).then((res) => {
         author.processAPIResponse(res);
      });

      const book = new Book(item.title, author["name"], author["lastName"]);

      await tmpBooksConnection.insert(book).then((res) => {
         book.processAPIResponse(res);
         author.books.push(book);
      });

      const { _id, _rev, name, lastName, books } = author;

      tmpAuthorConnection.insert({
         _id,
         _rev,
         name,
         lastName,
         books,
      });
   });

   console.log("Databases initialized");
};
