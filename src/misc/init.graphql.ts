import nano from "nano";
import express from "express";
import { AuthorToPost } from "../types/author.type";
import { BookToPost } from "../types/book.type";
import { schema } from "../schemas/schema";
import { graphqlHTTP } from "express-graphql";

export const initGraphQL = (
   booksConnection: nano.DocumentScope<BookToPost>,
   authorsConnection: nano.DocumentScope<AuthorToPost>,
   app: express.Application
) => {
   const root = {
      getAllBooks: async () => {
         return await booksConnection
            .list({ include_docs: true })
            .then((res) => res.rows.map((item) => item.doc))
            .catch((e) => console.log((e as Error).message));
      },
      getAllAuthors: async () => {
         return await authorsConnection
            .list({ include_docs: true })
            .then((res) => res.rows.map((item) => item.doc))
            .catch((e) => console.log((e as Error).message));
      },
      getBookById: async ({ id }) => {
         return await booksConnection
            .get(id, { revs_info: true })
            .catch((e) => console.log((e as Error).message));
      },
      getAuthorById: async ({ id }) => {
         return await authorsConnection
            .get(id, { revs_info: true })
            .catch((e) => console.log((e as Error).message));
      },
      getBooksByPages: async ({ limit, offset }) => {
         return await getByPages(booksConnection, limit, offset);
      },
      getAuthorsByPages: async ({ limit, offset }) => {
         return await getByPages(authorsConnection, limit, offset);
      },
   };

   app.use("/graphql", graphqlHTTP({ schema, graphiql: true, rootValue: root }));
};

const getByPages = async (
   db: nano.DocumentScope<unknown>,
   limit: number,
   offset: number
): Promise<nano.Document[]> => {
   const res = await db
      .list({ include_docs: true })
      .then((item) => item.rows.map((item) => item.doc))
      .catch((e) => console.log((e as Error).message));

   if (res) {
      return res.slice(offset, limit + offset);
   } else {
      return [];
   }
};
