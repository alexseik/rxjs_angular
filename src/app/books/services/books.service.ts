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

  filteredBooks$ = new BehaviorSubject<Book[]>([]);

  titleChange$ = new BehaviorSubject<string>('');
  authorChange$ = new BehaviorSubject<string>('');
  categoryChange$ = new BehaviorSubject<string>('');

  destroy$ = new Subject<any>();

  constructor(private http: HttpClient) {
    combineLatest([
      this.books$,
      this.titleChange$,
      this.authorChange$,
      this.categoryChange$
    ]).pipe(
      map(([books, title, author, category]) => this.filter(books, title, author, category)),
      takeUntil(this.destroy$)
    ).subscribe(data => this.filteredBooks$.next(data));
  }

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
      categories: book.categories.map(c => ({ name: c }))
    };
    return newBook;
  }

  private filter(books: Book[], title, author, category) {
    const filtered = books.filter(book => {
      const hasTitle = book.title.includes(title);
      const hasAuthors = book.authors.map(a => a.name).filter(a => a.includes(author)).length > 0;
      const hasCategory = book.categories.filter(c => c.name.includes(category));
      return hasTitle && hasAuthors && hasCategory;
    });
    return filtered;
  }

}
