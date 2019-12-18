import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Book } from '../../models/book';
import { Store } from '@ngrx/store';
import { BooksState } from '../../store/reducers';
import { getAllBooks } from '../../store/actions';
import { selectBookByList } from '../../store/selectors';

@Component({
  selector: 'app-book-card-container',
  templateUrl: './book-card-container.component.html',
  styleUrls: ['./book-card-container.component.scss']
})
export class BookCardContainerComponent implements OnInit {

  books$: Observable<Book[]>;

  constructor(private store: Store<BooksState>) { }

  ngOnInit() {
    this.books$ = this.store.select(selectBookByList);
    this.store.dispatch(getAllBooks({}));
  }

}
