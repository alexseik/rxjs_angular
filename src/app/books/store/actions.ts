import { createAction, props } from '@ngrx/store';
import { BookFilter } from '../models/book-filter';
import { Book } from '../models/book';

export const getAllBooks = createAction('[Books] Get All Books', props<{}>());

export const getBooks = createAction('[Books] Get Book Entities');

export const getAuthors = createAction('[Books] Get Author Entities');

export const setFilter = createAction('[Books] Set Filter', props<{ filter: BookFilter }>());

export const saveBook = createAction('[Books] add/update book', props<{ book: Book }>());
