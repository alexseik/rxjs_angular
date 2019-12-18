import { authorAdapter } from './author-reducer';
import { createSelector } from '@ngrx/store';

const {
  selectIds,
  selectEntities,
  selectAll,
  selectTotal,
} = authorAdapter.getSelectors();

// select the array of book ids
export const selectAuthorIds = selectIds;

// select the dictionary of book entities
export const selectAuthorEntities = selectEntities;

// select the array of books
export const selectAllAuthors = selectAll;

// select the total book count
export const selectAuthorTotal = selectTotal;

