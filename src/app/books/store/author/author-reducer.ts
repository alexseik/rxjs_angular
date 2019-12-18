import {
  createReducer,
  Action,
  on
} from '@ngrx/store';
import { EntityState, EntityAdapter, createEntityAdapter } from '@ngrx/entity';
import { Author } from '../../models/author';
import * as AuthorsActions from './author-actions';


export interface AuthorState extends EntityState<Author> {
  // additional entity state properties
  selectedAuthorId: number | null;
}

export const authorAdapter: EntityAdapter<Author> = createEntityAdapter<Author>({});

export const authorInitialState: AuthorState = authorAdapter.getInitialState({
  selectedAuthorId: null
});

export const authorsReducer = createReducer(
  authorInitialState,
  on(AuthorsActions.addAuthor, (state, { author }) => {
    return authorAdapter.addOne(author, state);
  }),
  on(AuthorsActions.loadAuthors, (state, { authors }) => {
    return authorAdapter.addAll(authors, { ...state, selectedAuthorId: null });
  }),
  on(AuthorsActions.updateAuthor, (state, { author }) => {
    return authorAdapter.updateOne(author, state);
  }),
  on(AuthorsActions.deleteAuthor, (state, { id }) => {
    return authorAdapter.removeOne(id, state);
  })
);

export function reducer(state: AuthorState | undefined, action: Action) {
  return authorsReducer(state, action);
}


