import { InjectionToken } from '@angular/core';

import { ActionReducerMap } from '@ngrx/store';

import * as fromBook from './book/book-reducer';
import * as fromAuthor from './author/author-reducer';

export const booksFeatureKey = 'books';

export interface BooksState {
  books: fromBook.BookState;
  authors: fromAuthor.AuthorState;
}

export const BOOKS_REDUCER_TOKEN = new InjectionToken<
  ActionReducerMap<BooksState>
>('Books Reducers');

export const reducers: ActionReducerMap<BooksState> = {
  books: fromBook.reducer,
  authors: fromAuthor.reducer
};



