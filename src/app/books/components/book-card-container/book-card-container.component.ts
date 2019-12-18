import { Component, OnInit, OnDestroy } from '@angular/core';
import { BooksService } from '../../services/books.service';
import { Observable } from 'rxjs';
import { Book } from '../../models/book';
import { Store } from '@ngrx/store';
import { BooksState } from '../../store/reducers';
import { getAllBooks } from '../../store/actions';
import { selectBookList } from '../../store/selectors';

@Component({
  selector: 'app-book-card-container',
  templateUrl: './book-card-container.component.html',
  styleUrls: ['./book-card-container.component.scss'],
  // providers: [BooksService]
})
export class BookCardContainerComponent implements OnInit, OnDestroy {

  books$: Observable<Book[]>;

  constructor(private booksService: BooksService, private store: Store<BooksState>) { }

  ngOnInit() {
    // this.books$ = this.booksService.filteredBooks$;
    this.books$ = this.store.select(selectBookList);
    this.booksService.getBooks();
    this.store.dispatch(getAllBooks({}));
  }

  ngOnDestroy() {
    // this.booksService.destroy$.next();
  }

}
