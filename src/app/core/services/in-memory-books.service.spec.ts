import { TestBed } from '@angular/core/testing';

import { InMemoryBooksService } from './in-memory-books.service';

describe('InMemoryBooksService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: InMemoryBooksService = TestBed.get(InMemoryBooksService);
    expect(service).toBeTruthy();
  });
});
