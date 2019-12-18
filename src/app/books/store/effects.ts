import { Injectable } from '@angular/core';
import { createEffect, Actions, ofType } from '@ngrx/effects';
import { BooksService } from '../services/books.service';
import * as actions from './actions';
import * as bookActions from './book/book-actions';
import * as authorActions from './author/author-actions';
import { switchMap, map, tap, mergeMap } from 'rxjs/operators';
import { combineLatest, from, Observable } from 'rxjs';
import { Action } from '@ngrx/store';

@Injectable()
export class BooksEffects {

  carrera: Observable<Action> = from([
    actions.getAuthors(),
    actions.getBooks()
  ]);

  getAllBooks$ = createEffect(() => this.actions$.pipe(
    ofType(actions.getAllBooks.type),
    mergeMap(() => this.carrera)
  )
  );

  getBooks$ = createEffect(() => this.actions$.pipe(
    ofType(actions.getBooks.type),
    switchMap(() => this.booksService.ngRxLoadBooks()),
    map(books => bookActions.loadBooks({ books }))
  )
  );

  getAuthors$ = createEffect(() => this.actions$.pipe(
    ofType(actions.getAuthors.type),
    switchMap(() => this.booksService.ngRxLoadAuthors()),
    map(authors => authorActions.loadAuthors({ authors }))
  )
  );

  constructor(
    private actions$: Actions,
    private booksService: BooksService
  ) { }
}
