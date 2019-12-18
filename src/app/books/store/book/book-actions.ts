import { createAction, props } from '@ngrx/store';
import { Update } from '@ngrx/entity';

import { BookRequest } from '../../models/book-request';

export const loadBooks = createAction('[Book/API] Load Books', props<{ books: BookRequest[] }>());
export const addBook = createAction('[Book/API] Add Book', props<{ book: BookRequest }>());
export const updateBook = createAction('[Book/API] Update Book', props<{ book: Update<BookRequest> }>());
export const deleteBook = createAction('[Book/API] Delete Book', props<{ id: string }>());
