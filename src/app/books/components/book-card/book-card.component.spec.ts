import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BookCardComponent } from './book-card.component';
import { BookFormComponent } from '../book-form/book-form.component';
import { AngularMaterialModule } from '../../../shared/angular-material.module';
import { ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { BookInfoComponent } from '../book-info/book-info.component';
import { HttpClientModule } from '@angular/common/http';
import { RouterTestingModule } from '@angular/router/testing';

describe('BookCardComponent', () => {
  let component: BookCardComponent;
  let fixture: ComponentFixture<BookCardComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [BookCardComponent, BookFormComponent, BookInfoComponent],
      imports: [ReactiveFormsModule, AngularMaterialModule, BrowserAnimationsModule, HttpClientModule, RouterTestingModule]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BookCardComponent);
    component = fixture.componentInstance;
    component.book = {
      isbn: '1',
      title: 'asdf',
      authors: [],
      categories: []
    };
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
