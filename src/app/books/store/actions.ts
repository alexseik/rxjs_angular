import { createAction, props } from '@ngrx/store';

export const getAllBooks = createAction('[Books] Get All Books', props<{}>());

export const getBooks = createAction('[Books] Get Book Entities');

export const getAuthors = createAction('[Books] Get Author Entities');

export const filterByTitle = createAction('[Books] filter by title');
