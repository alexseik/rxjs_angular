import { ComponentFixture, fakeAsync, TestBed } from '@angular/core/testing';

import { BookFilterComponent } from './book-filter.component';
import { BooksService } from '../../services/books.service';
import { ReactiveFormsModule } from '@angular/forms';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import 'zone.js/dist/zone-patch-rxjs-fake-async';

describe('BookFilterComponent', () => {
  let component: BookFilterComponent;
  let fixture: ComponentFixture<BookFilterComponent>;

  let booksServiceStub: Partial<BooksService>;

  beforeEach(fakeAsync(() => {
    booksServiceStub = {
      titleChange$: new BehaviorSubject<string>(''),
      authorChange$: new BehaviorSubject<string>(''),
      categoryChange$: new BehaviorSubject<string>('')
    };
    TestBed.configureTestingModule({
      declarations: [ BookFilterComponent ],
      imports: [ReactiveFormsModule],
      providers: [ {provide: BooksService, useValue: booksServiceStub } ],
      schemas: [ NO_ERRORS_SCHEMA ]
    });
    fixture = TestBed.createComponent(BookFilterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    component.ngOnInit();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should pass title input to booksService', () => {
    const booksService = fixture.debugElement.injector.get(BooksService);
    component.bookFilter.get('title').setValue('a');
    fixture.detectChanges();
    // tick(); --> No hace falta porque la ejecución del subscribe es síncrona
    // fixture.detectChanges();
    booksService.titleChange$.subscribe(v => {
      expect(v).toBe('a');
    });
  });
});
