import { Injectable, OnDestroy } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, combineLatest, Observable, Subject } from 'rxjs';
import { map, takeUntil, switchMap } from 'rxjs/operators';
import { Book } from '../models/book';
import { Author } from '../models/author';
import { Category } from '../models/category';
import { BookRequest } from '../models/book-request';

// const BOOKS_API = 'http://localhost:3000/api/books';
// const AUTHORS_API = 'http://localhost:3000/api/authors';

@Injectable({
  providedIn: 'root'
})
export class BooksService implements OnDestroy {

  readonly BOOKS_API = 'http://localhost:3000/api/books';
  readonly AUTHORS_API = 'http://localhost:3000/api/authors';

  // Outputs
  filteredBooks$ = new BehaviorSubject<Book[]>([]);
  filteredAuthors$ = new BehaviorSubject<Author[]>([]);
  filteredCategory$ = new BehaviorSubject<Category[]>([]);
  // Inputs
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
    ).subscribe(this.filteredBooks$);

    // Filtered Authors stream
    combineLatest([
      this.authors$,
      this.authorChange$
    ]).pipe(
      map(([authors, authorsFilter]) => {
        return authors.filter(a => a.name.includes(authorsFilter));
      }),
      takeUntil(this.destroy$)
    ).subscribe(this.filteredAuthors$);

    // Filtered Category stream. Filter by categoryChanges$ and filteredAuthors$
    combineLatest([
      this.books$,
      this.filteredAuthors$,
      this.authorChange$,
      this.categoryChange$
    ]).pipe(
      map(([books, authors, authorFilter, categoryFilter]) => {
        const allBooksCategories = books
          .reduce((previous, current) => previous.concat(...current.categories), [])
          .map(c => c.name);
        const allAuthorCategories = authors.reduce((previous, current) => previous.concat(...current.categories), []);
        if (authorFilter !== '') {
          return allAuthorCategories
            .filter((category, index) => index === allAuthorCategories.indexOf(category) && category.includes(categoryFilter));
        }
        return allBooksCategories
          .filter((category, index) => category && index === allBooksCategories.indexOf(category) && category.includes(categoryFilter));
      }),
      takeUntil(this.destroy$)
    ).subscribe(this.filteredCategory$);
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  getBooks(): void {
    combineLatest([
      this.http.get(this.BOOKS_API) as Observable<any>,
      this.http.get(this.AUTHORS_API) as Observable<any>
    ]).pipe(
      map(([booksResponse, authorsResponse]) => {
        return {
          books: booksResponse.map(raw => this.buildBook(raw, authorsResponse)),
          authors: authorsResponse
        };
      }),
      takeUntil(this.destroy$)
    ).subscribe(data => {
      this.books$.next(data.books);
      this.authors$.next(data.authors);
    });
  }

  saveBook(book: Book) {
    let obs: Observable<any>;
    const authors = book.authors ? book.authors.filter(author => author.id).map(author => author.id) : [];
    const newAuthors = book.authors ? book.authors.filter(author => !author.id) : [];
    const categories = book.categories ? book.categories : [];
    const bookRequest: BookRequest = {
      title: book.title,
      isbn: book.isbn,
      authors,
      categories
    };
    if (newAuthors && newAuthors.length > 0) {
      obs = combineLatest(newAuthors.map(author => this.addAuthor(author)));
    }
    if (book.id) {
      bookRequest.id = book.id;
      if (obs) {
        obs = obs.pipe(
          switchMap((savedAuthors) => {
            savedAuthors.forEach(element => {
              bookRequest.authors.push(element.id);
            });
            return this.http.put(`${this.BOOKS_API}/${book.id}`, bookRequest);
          })
        );
      } else {
        obs = this.http.put(`${this.BOOKS_API}/${book.id}`, bookRequest);
      }
    } else {
      if (obs) {
        obs = obs.pipe(
          switchMap(() => this.http.post(this.BOOKS_API, bookRequest))
        );
      } else {
        obs = this.http.post(this.BOOKS_API, bookRequest);
      }
    }
    obs.subscribe(() => this.getBooks());
  }

  ngRxSaveBook(book: Book) {
    let obs: Observable<any>;
    const authors = book.authors ? book.authors.filter(author => author.id).map(author => author.id) : [];
    const newAuthors = book.authors ? book.authors.filter(author => !author.id) : [];
    const categories = book.categories ? book.categories : [];
    const bookRequest: BookRequest = {
      title: book.title,
      isbn: book.isbn,
      authors,
      categories
    };
    if (newAuthors && newAuthors.length > 0) {
      obs = combineLatest(newAuthors.map(author => this.addAuthor(author)));
    }
    if (book.id) {
      bookRequest.id = book.id;
      if (obs) {
        obs = obs.pipe(
          switchMap((savedAuthors) => {
            savedAuthors.forEach(element => {
              bookRequest.authors.push(element.id);
            });
            return this.http.put(`${this.BOOKS_API}/${book.id}`, bookRequest);
          })
        );
      } else {
        obs = this.http.put(`${this.BOOKS_API}/${book.id}`, bookRequest);
      }
    } else {
      if (obs) {
        obs = obs.pipe(
          switchMap(() => this.http.post(this.BOOKS_API, bookRequest))
        );
      } else {
        obs = this.http.post(this.BOOKS_API, bookRequest);
      }
    }
    return obs;
  }

  addAuthor(author) {
    return this.http.post(this.AUTHORS_API, author);
  }

  ngRxLoadBooks(): Observable<BookRequest[]> {
    return this.http.get(this.BOOKS_API) as Observable<BookRequest[]>;
  }

  ngRxLoadAuthors(): Observable<Author[]> {
    return this.http.get(this.AUTHORS_API) as Observable<Author[]>;
  }

  public buildBook(book: any, authors: any[]) {
    const newBook = {
      id: book.id,
      isbn: book.isbn,
      title: book.title,
      authors: authors.filter(author => book.authors.includes(author.id)),
      categories: book.categories
    };
    return newBook;
  }

  public filter(books: Book[], title, author, category) {
    const filtered = books.filter(book => {
      const hasTitle = book.title.includes(title);
      const hasAuthors =
        book.authors.map(a => a.name).filter(a => a.includes(author)).length > 0 || !book.authors || book.authors.length === 0;
      const hasCategory =
        book.categories.filter(c => c.includes(category)).length > 0 || !book.categories || book.categories.length === 0;
      return hasTitle && hasAuthors && hasCategory;
    });
    return filtered;
  }

}
