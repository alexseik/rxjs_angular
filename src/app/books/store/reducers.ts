import { InjectionToken } from '@angular/core';

import { ActionReducerMap, createReducer, on, Action } from '@ngrx/store';


import * as actions from './actions';
import * as fromBook from './book/book.reducer';
import * as fromAuthor from './author/author-reducer';
import { BookFilter } from '../models/book-filter';

export const booksFeatureKey = 'books';

export interface BooksFeatureState {
  filter: BookFilter;
}

export const booksFeatureInitialState: BooksFeatureState = {
  filter: {
    title: '',
    authorName: '',
    category: ''
  }
};

const booksFeatureReducer = createReducer(
  booksFeatureInitialState,
  on(actions.setFilter, (state, { filter }) => {
    const newFilter = Object.assign({}, state.filter, filter);
    return Object.assign({}, state, { filter: newFilter });
  })
);

export function booksReducer(state: BooksFeatureState | undefined, action: Action) {
  return booksFeatureReducer(state, action);
}

export interface BooksState {
  books: fromBook.BookState;
  authors: fromAuthor.AuthorState;
  feature: BooksFeatureState;
}

export const BOOKS_REDUCER_TOKEN = new InjectionToken<
  ActionReducerMap<BooksState>
>('Books Reducers');

export const reducers: ActionReducerMap<BooksState> = {
  books: fromBook.reducer,
  authors: fromAuthor.reducer,
  feature: booksReducer
};



