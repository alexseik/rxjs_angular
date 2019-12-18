import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HeaderComponent } from './header.component';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { MockStore, provideMockStore } from '@ngrx/store/testing';

import * as fromAuth from '../../auth/store/auth.reducer';
import { MemoizedSelector, Store } from '@ngrx/store';
import { By } from '@angular/platform-browser';
import { Logout } from '../../auth/store/auth.actions';

describe('HeaderComponent', () => {
  let component: HeaderComponent;
  let fixture: ComponentFixture<HeaderComponent>;

  let mockStore: MockStore<fromAuth.AuthState>;
  let mockUsernameSelector: MemoizedSelector<fromAuth.AuthState, string>;

  const queryDivText = () =>
    fixture.debugElement.query(By.css('.user-name')).nativeElement.textContent;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [HeaderComponent],
      imports: [],
      providers: [provideMockStore()],
      schemas: [NO_ERRORS_SCHEMA]
    });
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(HeaderComponent);
    component = fixture.componentInstance;
    mockStore = TestBed.get(Store);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
    expect(queryDivText()).toBe('');
  });

  it('if user is authenticated header should display its name', () => {
    mockUsernameSelector = mockStore.overrideSelector(fromAuth.selectAuth, {
      id: '1',
      name: 'alex',
      email: 'alex@email'
    });
    mockStore.refreshState();
    fixture.detectChanges();
    expect(queryDivText()).toBe('alex');
  });
  it('should dispatch Logout action when clicks logout', () => {
    spyOn(mockStore, 'dispatch');
    component.logout();
    expect(mockStore.dispatch).toHaveBeenCalledWith(new Logout({}));
  });
});
