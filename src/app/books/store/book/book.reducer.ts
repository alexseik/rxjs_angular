import {
  createReducer,
  Action,
  on
} from '@ngrx/store';
import { EntityState, EntityAdapter, createEntityAdapter } from '@ngrx/entity';
import * as BooksActions from './book.actions';
import { BookRequest } from '../../models/book-request';


export interface BookState extends EntityState<BookRequest> {
  // additional entity state properties
  selectedBookId: number | null;
}

export const bookAdapter: EntityAdapter<BookRequest> = createEntityAdapter<BookRequest>({});

export const bookInitialState: BookState = bookAdapter.getInitialState({
  selectedBookId: null
});

export const booksReducer = createReducer(
  bookInitialState,
  on(BooksActions.addBook, (state, { book }) => {
    return bookAdapter.addOne(book, state);
  }),
  on(BooksActions.loadBooks, (state, { books }) => {
    return bookAdapter.addAll(books, { ...state, selectedBookId: null });
  }),
  on(BooksActions.updateBook, (state, { book }) => {
    return bookAdapter.updateOne(book, state);
  }),
  on(BooksActions.deleteBook, (state, { id }) => {
    return bookAdapter.removeOne(id, state);
  })
);

export function reducer(state: BookState | undefined, action: Action) {
  return booksReducer(state, action);
}

const {
  selectIds,
  selectEntities,
  selectAll,
  selectTotal,
} = bookAdapter.getSelectors();

// select the array of book ids
export const selectBookIds = selectIds;

// select the dictionary of book entities
export const selectBookEntities = selectEntities;

// select the array of books
export const selectAllBooks = selectAll;

// select the total book count
export const selectBookTotal = selectTotal;
