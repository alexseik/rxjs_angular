import { createFeatureSelector, createSelector } from '@ngrx/store';

import { BooksState, booksFeatureKey } from './reducers';

import { BookRequest } from '../models/book-request';

import { Author } from '../models/author';

import { Book } from '../models/book';

import * as fromBook from './book/book-reducer';
import * as fromAuthor from './author/author-reducer';


export const selectBooksState = createFeatureSelector<BooksState>(booksFeatureKey);

export const selectBooksBookState = createSelector(selectBooksState, (state: BooksState) => state.books);

export const selectBooksAuthorState = createSelector(selectBooksState, (state: BooksState) => state.authors);

export const selectAllBooks = createSelector(
  selectBooksBookState,
  fromBook.selectAllBooks
);

export const selectAuthorEntities = createSelector(
  selectBooksAuthorState,
  fromAuthor.selectAuthorEntities
);

function buildBook(book: BookRequest, allAuthors: { [id: string]: Author }): Book {
  const authors = book.authors ? book.authors.map(id => allAuthors[id]) : [];
  const newBook = {
    id: book.id,
    isbn: book.isbn,
    title: book.title,
    authors,
    categories: book.categories
  };
  return newBook;
}

export const selectBookList = createSelector(
  selectAllBooks,
  selectAuthorEntities,
  ((books, authorMap) => books.map(book => buildBook(book, authorMap)))
);