import { createAction, props } from '@ngrx/store';
import { Update } from '@ngrx/entity';

import { Author } from '../../models/author';

export const loadAuthors = createAction('[Author/API] Load Authors', props<{ authors: Author[] }>());
export const addAuthor = createAction('[Author/API] Add Author', props<{ author: Author }>());
// export const upsertAuthor = createAction('[Author/API] Upsert Author', props<{ author: Author }>());
// export const addAuthors = createAction('[Author/API] Add Authors', props<{ authors: Author[] }>());
// export const upsertAuthors = createAction('[Author/API] Upsert Authors', props<{ authors: Author[] }>());
export const updateAuthor = createAction('[Author/API] Update Author', props<{ author: Update<Author> }>());
// export const updateAuthors = createAction('[Author/API] Update Authors', props<{ authors: Update<Author>[] }>());
// export const mapAuthors = createAction('[Author/API] Map Authors', props<{ entityMap: EntityMap<Author> }>());
export const deleteAuthor = createAction('[Author/API] Delete Author', props<{ id: string }>());
// export const deleteAuthors = createAction('[Author/API] Delete Authors', props<{ ids: string[] }>());
// export const deleteAuthorsByPredicate = createAction('[Author/API] Delete Authors By Predicate', props<{ predicate: Predicate<Author> }>());
// export const clearAuthors = createAction('[Author/API] Clear Authors');
