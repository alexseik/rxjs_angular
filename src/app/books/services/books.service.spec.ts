import { fakeAsync, TestBed, tick, ComponentFixture } from '@angular/core/testing';
import 'zone.js/dist/zone-patch-rxjs-fake-async';
import { cold, getTestScheduler } from 'jasmine-marbles';
import { BooksService } from './books.service';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';

describe('BooksService', () => {
  let httpMock: HttpTestingController;
  let service: BooksService;

  let postSpy;

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

  it('should save books and new authors', fakeAsync(() => {
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

    const book = {
      id: 'otro',
      isbn: 'otro isbn',
      title: 'otro title',
      authors: [
        {
          id: '1',
          name: 'aurelio',
        }, {
          name: 'otro autor'
        }
      ],
      categories: []
    };
    service.saveBook(book);
    // debugger
    const postAuthor = httpMock.match({ method: 'POST' });
    let putBook = httpMock.match({ method: 'PUT' });
    expect(postAuthor.length).toBe(1);
    expect(putBook.length).toBe(0);
    const dummyAuthor = {
      id: 'otro',
      name: 'otro autor',
      categories: []
    };
    postAuthor[0].flush(dummyAuthor);
    tick();
    putBook = httpMock.match({ method: 'PUT' });
    expect(putBook.length).toBe(1);
    const dummyBook = {
      isbn: 'otro isbn',
      title: 'otro title',
      authors: ['1', 'otro'],
      categories: []
    };
    putBook[0].flush(dummyBook);
    // debugger
    tick();
    const getRequests = httpMock.match({ method: 'GET' });
    expect(getRequests.length).toBe(2);
    // debugger
    getRequests[0].flush([dummyBook]);
    getRequests[1].flush([...dummyAuthors, dummyAuthor]);
    tick();
  }));
});
