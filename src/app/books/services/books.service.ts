import { Injectable, OnDestroy } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, combineLatest, Observable, Subject } from 'rxjs';
import { map, takeUntil } from 'rxjs/operators';
import { Book } from '../models/book';
import { Author } from '../models/author';
import { Category } from '../models/category';

const BOOKS_API = 'http://localhost:3000/api/books';
const AUTHORS_API = 'http://localhost:3000/api/authors';

@Injectable({
  providedIn: 'root'
})
export class BooksService implements OnDestroy {

  filteredBooks$ = new BehaviorSubject<Book[]>([]);
  filteredAuthors$ = new BehaviorSubject<Author[]>([]);
  // filteredCategory$ = new BehaviorSubject<Category[]>([]);

  titleChange$ = new BehaviorSubject<string>('');
  authorChange$ = new BehaviorSubject<string>('');
  categoryChange$ = new BehaviorSubject<string>('');

  private destroy$ = new Subject<any>();
  private books$ = new BehaviorSubject<Book[]>([]);
  private authors$ = new BehaviorSubject<Author[]>([]);

  constructor(private http: HttpClient) {
    // Filtered Books stream
    combineLatest([
      this.books$,
      this.titleChange$,
      this.authorChange$,
      this.categoryChange$
    ]).pipe(
      map(([books, title, author, category]) => this.filter(books, title, author, category)),
      takeUntil(this.destroy$)
    ).subscribe(data => this.filteredBooks$.next(data));

    // Filtered authors stream
    combineLatest([
      this.authors$,
      this.authorChange$
    ]).pipe(
      map(([authors, authorsFilter]) => {
        return authors.filter(a => a.name.includes(authorsFilter));
      }),
      takeUntil(this.destroy$)
    ).subscribe(this.filteredAuthors$);
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
        return {
          books: booksResponse.data.map(raw => this.buildBook(raw, authorsResponse)),
          authors: authorsResponse
        };
      }),
      takeUntil(this.destroy$)
    ).subscribe(data => {
      this.books$.next(data.books);
      this.authors$.next(data.authors);
    });
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
