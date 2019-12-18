import { createAction, props } from '@ngrx/store';
import { BookFilter } from '../models/book-filter';

export const getAllBooks = createAction('[Books] Get All Books', props<{}>());

export const getBooks = createAction('[Books] Get Book Entities');

export const getAuthors = createAction('[Books] Get Author Entities');

export const setFilter = createAction('[Books] Set Filter', props<{ filter: BookFilter }>());
