import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BookFormComponent } from './book-form.component';
import { FormArray, ReactiveFormsModule } from '@angular/forms';
import { AngularMaterialModule } from '../../../shared/angular-material.module';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { DebugElement, NO_ERRORS_SCHEMA } from '@angular/core';
import { By } from '@angular/platform-browser';
import { Book } from '../../models/book';
import { HttpClientModule } from '@angular/common/http';
import { BooksService } from '../../services/books.service';

describe('BookFormComponent', () => {
  let bookServiceStub: Partial<BooksService>;
  bookServiceStub = {
    saveBook: () => {}
  };
  let component: BookFormComponent;
  let fixture: ComponentFixture<BookFormComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [BookFormComponent],
      imports: [
        ReactiveFormsModule,
        AngularMaterialModule, 
        NoopAnimationsModule, 
        HttpClientModule
      ],
      schemas: [ NO_ERRORS_SCHEMA ],
      providers: [{ provide: BooksService, useValue: bookServiceStub }]
    });
    fixture = TestBed.createComponent(BookFormComponent);
    component = fixture.componentInstance;
    component.book = {
      isbn: '1',
      title: 'asdf',
      authors: [],
      categories: []
    };
    fixture.detectChanges();
    component.ngOnInit();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should has bookForm initialized', () => {
    const bookForm = component.bookForm;
    expect(bookForm).toBeTruthy();
    expect(bookForm.controls).toBeTruthy();
    expect(bookForm.controls.isbn).toBeDefined();
    const isbn = bookForm.controls.isbn.value;
    expect(bookForm.controls.isbn.value).toBe('1');
  });

  it('should not have author control at start', () => {
    const formDe: DebugElement = fixture.debugElement;
    const title = formDe.query(By.css('h3'));
    const h3: HTMLElement = title.nativeElement;
    expect(h3.innerText).toBe('Autores');
    const list = formDe.query(By.css('.author-list'))
    expect(list).toBeNull();
  });

  it('should add author control when click add', () => {
    fixture.detectChanges();
    const formDe: DebugElement = fixture.debugElement;
    const addButton = formDe.query(By.css('.authors > button.add-author'));
    // addButton.nativeElement.click();
    addButton.triggerEventHandler('click', {});
    // component.addAuthor();
    fixture.detectChanges();

    const list = formDe.query(By.css('.author-list'));
    expect(list).toBeDefined();
    expect(list).not.toBeNull();
    const bookForm = component.bookForm;
    const authorControls = bookForm.controls.authors as FormArray;
    expect(authorControls.controls.length).toBe(1);
  });

  it('should add author control when click add', () => {
    fixture.detectChanges();
    const formDe: DebugElement = fixture.debugElement;
    const addButton = formDe.query(By.css('.authors > button.add-author'));
    // addButton.nativeElement.click();
    addButton.triggerEventHandler('click', {});
    // component.addAuthor();
    fixture.detectChanges();

    const list = formDe.query(By.css('.author-list'));
    expect(list).toBeDefined();
    expect(list).not.toBeNull();
    const bookForm = component.bookForm;
    const authorControls = bookForm.controls.authors as FormArray;
    expect(authorControls.controls.length).toBe(1);
  });

  it('should to be invalid if author control is empty', () => {
    component.addAuthor();
    fixture.detectChanges();
    const authorControls = component.bookForm.controls.authors as FormArray;
    expect(authorControls.invalid).toBe(true);
  });

  it('submit should emit a book if form is valid', () => {
    let book: Book;
    component.save.subscribe((value) => { book = value; });

    component.submit();

    expect(book.title).toBe('asdf');
    expect(book.isbn).toBe('1');
  });
});
