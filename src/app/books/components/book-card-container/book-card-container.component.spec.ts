import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BookCardContainerComponent } from './book-card-container.component';
import { ReactiveFormsModule } from '@angular/forms';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { Store } from '@ngrx/store';

describe('BookCardContainerComponent', () => {
  let component: BookCardContainerComponent;
  let fixture: ComponentFixture<BookCardContainerComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [BookCardContainerComponent],
      imports: [
        ReactiveFormsModule
      ],
      providers: [{ provide: Store, useValue: { dispatch: () => {}, select: () => {}}}],
      schemas: [NO_ERRORS_SCHEMA]
    });
    fixture = TestBed.createComponent(BookCardContainerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
