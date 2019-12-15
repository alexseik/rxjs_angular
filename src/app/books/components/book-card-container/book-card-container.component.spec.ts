import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BookCardContainerComponent } from './book-card-container.component';
import { BookCardComponent } from '../book-card/book-card.component';
import { AngularMaterialModule } from '../../../shared/angular-material.module';
import { ReactiveFormsModule } from '@angular/forms';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { BookFormComponent } from '../book-form/book-form.component';
import { HttpClientModule } from '@angular/common/http';
import { BookFilterComponent } from '../book-filter/book-filter.component';

describe('BookCardContainerComponent', () => {
  let component: BookCardContainerComponent;
  let fixture: ComponentFixture<BookCardContainerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [BookCardContainerComponent, BookCardComponent, BookFormComponent, BookFilterComponent, BookFilterComponent],
      imports: [ReactiveFormsModule, AngularMaterialModule, NoopAnimationsModule, HttpClientModule]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BookCardContainerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
