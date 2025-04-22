import { gql } from '@apollo/client'

export const QUERIES = gql`
query {
  allAuthors {
    name,
    born,
    bookCount
  }
  allBooks {
    title
    author
    published
  }
}
`

export const CREATE_BOOK = gql`
mutation createBook($bookInput: BookInput!) {
  addBook (
    book: $bookInput
  ) {
    title
    author
    published
  }
}
`

export const EDIT_AUTHOR = gql`
mutation updateAuthor($authorInput: EditAuthorInput!) {
  editAuthor(
    author: $authorInput
  ) {
    name
    born
  }
}
`