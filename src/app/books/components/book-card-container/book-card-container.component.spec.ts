import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BookCardContainerComponent } from './book-card-container.component';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { provideMockStore } from '@ngrx/store/testing';

describe('BookCardContainerComponent', () => {
  let component: BookCardContainerComponent;
  let fixture: ComponentFixture<BookCardContainerComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [BookCardContainerComponent],
      imports: [ReactiveFormsModule, HttpClientModule, provideMockStore({})],
      schemas: [NO_ERRORS_SCHEMA]
    });
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BookCardContainerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
