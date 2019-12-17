import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BookCardComponent } from './book-card.component';
import { HttpClientModule } from '@angular/common/http';
import { RouterTestingModule } from '@angular/router/testing';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { UserService } from 'src/app/core/services/user.service';
import { BehaviorSubject } from 'rxjs';
import { User } from 'src/app/core/models/user';
import { provideMockStore } from '@ngrx/store/testing';

describe('BookCardComponent', () => {
  let component: BookCardComponent;
  let fixture: ComponentFixture<BookCardComponent>;

  let userServiceStub: Partial<UserService>;
  userServiceStub = {
    user$: new BehaviorSubject<User>({
      id: '1',
      name: 'asdf',
      email: 'asdf'
    })
  };

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [BookCardComponent],
      imports: [
        HttpClientModule,
        RouterTestingModule
      ],
      providers: [
        { provide: UserService, useValue: userServiceStub },
        provideMockStore({})
      ],
      schemas: [NO_ERRORS_SCHEMA],
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
