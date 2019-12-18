import { Injectable } from '@angular/core';
import { createEffect, Actions, ofType } from '@ngrx/effects';
import { BooksService } from '../services/books.service';
import * as actions from './actions';
import * as bookActions from './book/book-actions';
import * as authorActions from './author/author-actions';
import { switchMap, map, mergeMap } from 'rxjs/operators';
import { from } from 'rxjs';

@Injectable()
export class BooksEffects {

  getAllBooks$ = createEffect(() => this.actions$.pipe(
    ofType(actions.getAllBooks.type),
    mergeMap(() => from([
      actions.getAuthors(),
      actions.getBooks()
    ]))
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

  saveBook$ = createEffect(() => this.actions$.pipe(
    ofType(actions.saveBook.type),
    switchMap(({ book }) => this.booksService.ngRxSaveBook(book)),
    map(() => actions.getAllBooks({}))
  )
  );

  constructor(
    private actions$: Actions,
    private booksService: BooksService
  ) { }
}
