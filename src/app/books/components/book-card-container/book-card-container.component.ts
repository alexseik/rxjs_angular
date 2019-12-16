import { Component, OnInit, OnDestroy } from '@angular/core';
import { BooksService } from '../../services/books.service';
import { Observable } from 'rxjs';
import { Book } from '../../models/book';

@Component({
  selector: 'app-book-card-container',
  templateUrl: './book-card-container.component.html',
  styleUrls: ['./book-card-container.component.scss'],
  // providers: [BooksService]
})
export class BookCardContainerComponent implements OnInit, OnDestroy {

  books$: Observable<Book[]>;

  constructor(private booksService: BooksService) { }

  ngOnInit() {
    this.books$ = this.booksService.filteredBooks$;
    this.booksService.filteredBooks$.subscribe(libros => console.log('libri', libros));
    this.booksService.getBooks();
  }

  ngOnDestroy() {
    // this.booksService.destroy$.next();
  }

}
