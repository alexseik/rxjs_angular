import { Injectable, OnDestroy } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, combineLatest, Observable, Subject } from 'rxjs';
import { map, takeUntil } from 'rxjs/operators';
import { Book } from '../models/book';

const BOOKS_API = 'http://localhost:3000/api/books';
const AUTHORS_API = 'http://localhost:3000/api/authors';

@Injectable({
  providedIn: 'root'
})
export class BooksService implements OnDestroy {

  books$ = new BehaviorSubject<Book[]>([]);

  destroy$ = new Subject<any>();

  constructor(private http: HttpClient) { }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  getBooks(): void {
    combineLatest([
      this.http.get(BOOKS_API) as Observable<any>,
      this.http.get(AUTHORS_API) as Observable<any>
    ]).pipe(
      map(([booksResponse, authorsResponse]) => {
        return booksResponse.data.map(raw => this.buildBook(raw, authorsResponse));
      }),
      takeUntil(this.destroy$)
    ).subscribe(data => this.books$.next(data));
  }

  private buildBook(book: any, authors: any[]) {
    const newBook = {
      isbn: book.isbn,
      title: book.title,
      authors: authors.filter(author => book.authors.includes(author.id)),
      categories: book.categories
    };
    return newBook;
  }

}
