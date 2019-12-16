import { fakeAsync, TestBed, tick, ComponentFixture } from '@angular/core/testing';
import 'zone.js/dist/zone-patch-rxjs-fake-async';

import { BooksService } from './books.service';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';

describe('BooksService', () => {
  let httpMock: HttpTestingController;
  let service: BooksService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule]
    });
    service = TestBed.get(BooksService); // es posible porque ha sido registrado con provideIn: 'root'
    httpMock = TestBed.get(HttpTestingController);
  });
  afterEach(() => {
    httpMock.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should return books with authors', fakeAsync(() => {
    const dummyBooks = [
      {
        isbn: '12341234',
        title: 'libro 1',
        language: 'spanish',
        authors: ['1', '2'],
        categories: ['sfy']
      }
    ];

    const dummyAuthors = [
      {
        id: '1',
        name: 'author 1',
        categories: ['kids']
      },
      {
        id: '2',
        name: 'author 2',
        categories: ['kids']
      },
    ];

    service.filteredBooks$.subscribe((books) => {
      expect(books).toBeDefined();
      if (books.length > 0) {
        expect(books.length).toBe(1);
        const book = books[0];
        expect(book.authors.length).toBe(2);
        const firstAuthor = book.authors[0];
        expect(firstAuthor.name).toBe('author 1');
      }
    });

    service.getBooks();

    const reqs = httpMock.match({ method: 'GET' });
    expect(reqs.length).toBe(2);
    reqs[1].flush(dummyAuthors); // se necesita porque se hace una peticion a authors
    reqs[0].flush(dummyBooks);
    tick();
  }));
});
