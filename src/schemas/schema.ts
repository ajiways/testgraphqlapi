import { buildSchema } from "graphql";

export const schema = buildSchema(`
  type Book {
    _id: ID
    title: String
    authors: [Author]
  }

  type Author {
    _id: ID
    name: String
    lastName: String
    books: [Book]
  }

  type Query {
    getAllBooks: [Book]
    getAllAuthors: [Author]
    getBookById(id: ID): Book
    getAuthorById(id: ID): Author
    getBooksByPages(limit: Int, offset: Int): [Book]
    getAuthorsByPages(limit: Int, offset: Int): [Author]
  }
`);
