import { createFeatureSelector, createSelector } from '@ngrx/store';

import { BooksState, booksFeatureKey, BooksFeatureState } from './reducers';

import { BookRequest } from '../models/book-request';

import { Author } from '../models/author';

import { Book } from '../models/book';

import * as fromBook from './book/book-reducer';
import * as fromAuthor from './author/author-selectors';


export const selectBooksState = createFeatureSelector<BooksState>(booksFeatureKey);

export const selectBooksBookState = createSelector(selectBooksState, (state: BooksState) => state.books);

export const selectBooksAuthorState = createSelector(selectBooksState, (state: BooksState) => state.authors);

export const selectFeatureState = createSelector(selectBooksState, (state: BooksState) => state.feature);

export const selectFeatureFilterState = createSelector(selectFeatureState, (state: BooksFeatureState) => state.filter);

export const selectAllBooks = createSelector(
  selectBooksBookState,
  fromBook.selectAllBooks
);

export const selectAuthorEntities = createSelector(
  selectBooksAuthorState,
  fromAuthor.selectAuthorEntities
);

function buildBook(book: BookRequest, allAuthors: { [id: string]: Author }): Book {
  const authors = book.authors ? book.authors.filter(id => allAuthors[id]).map(id => allAuthors[id]) : [];
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

function filterBooks(books: Book[], title, author, category) {
  const filtered = books.filter(book => {
    const hasTitle = book.title.includes(title);
    const hasAuthors =
      book.authors.map(a => a.name).filter(a => a.includes(author)).length > 0 || !book.authors || book.authors.length === 0;
    const hasCategory =
      book.categories.filter(c => c.includes(category)).length > 0 || !book.categories || book.categories.length === 0;
    return hasTitle && hasAuthors && hasCategory;
  });
  return filtered;
}

export const selectBookByList = createSelector(
  selectFeatureFilterState,
  selectBookList,
  ((filter, books) => filterBooks(books, filter.title, filter.authorName, filter.category))
);
