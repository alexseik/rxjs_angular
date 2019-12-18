import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BookFilterComponent } from './book-filter.component';
import { ReactiveFormsModule } from '@angular/forms';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { Store } from '@ngrx/store';

describe('BookFilterComponent', () => {
  let component: BookFilterComponent;
  let fixture: ComponentFixture<BookFilterComponent>;
  let mockStore;
  beforeEach(() => {

    TestBed.configureTestingModule({
      declarations: [ BookFilterComponent ],
      imports: [ReactiveFormsModule],
      providers: [ { provide: Store, useValue: {
          dispatch: () => {},
          select: () => {}
        }} ],
      schemas: [ NO_ERRORS_SCHEMA ]
    });
    fixture = TestBed.createComponent(BookFilterComponent);
    component = fixture.componentInstance;
    mockStore = TestBed.get<Store<any>>(Store);
    fixture.detectChanges();
    component.ngOnInit();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should pass title input to store', () => {
    spyOn(mockStore, 'dispatch');
    component.bookFilter.get('title').setValue('a');
    fixture.detectChanges();
    expect(mockStore.dispatch).toHaveBeenCalledWith({
      filter: {
        title: 'a'
      },
      type: '[Books] Set Filter'
    });
  });
});
