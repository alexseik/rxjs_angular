import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LoginComponent } from './login.component';
import { ReactiveFormsModule } from '@angular/forms';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { Store } from '@ngrx/store';
import { Login } from '../../store/auth.actions';

describe('LoginComponent', () => {
  let component: LoginComponent;
  let fixture: ComponentFixture<LoginComponent>;
  let store;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [LoginComponent],
      imports: [
        ReactiveFormsModule
      ],
      schemas: [NO_ERRORS_SCHEMA],
      providers: [{ provide: Store, useValue: {
        dispatch: () => {}
        }}]
    });
    fixture = TestBed.createComponent(LoginComponent);
    store = TestBed.get<Store<any>>(Store);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should dispatch Login action on submit', () => {
    spyOn(store, 'dispatch');
    const creds = {
      email: 'a',
      password: 'a'
    };
    component.loginForm.get('email').setValue(creds.email);
    component.loginForm.get('password').setValue(creds.password);
    component.submit();
    expect(store.dispatch).toHaveBeenCalledWith(new Login(creds));
  });

  it('not should dispatch Login action if form is invalid', () => {
    spyOn(store, 'dispatch');
    const creds = {
      email: '',
      password: 'a'
    };
    component.loginForm.get('email').setValue(creds.email);
    component.loginForm.get('password').setValue(creds.password);
    component.submit();
    expect(store.dispatch).not.toHaveBeenCalled();
  });
});
