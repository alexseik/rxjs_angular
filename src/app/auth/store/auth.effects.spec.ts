import { provideMockActions } from '@ngrx/effects/testing';
import { Observable } from 'rxjs';
import { TestBed } from '@angular/core/testing';
import { Action } from '@ngrx/store';
import { hot, cold, getTestScheduler } from 'jasmine-marbles';
import { UserService } from 'src/app/core/services/user.service';
import { Login, LoginSuccess } from './auth.actions';
import { AuthEffects } from './auth.effects';

describe('AuthEffects', () => {
  let actions$: Observable<Action>;

  const userServiceStub = jasmine.createSpyObj('UserService', ['loginWithRedux']);

  let effects: AuthEffects;
  let service;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        AuthEffects,
        { provide: UserService, useValue: userServiceStub },
        provideMockActions(() => actions$)
      ],
    });
    service = TestBed.get(UserService);
    effects = TestBed.get(AuthEffects);
  });

  it('should be created', () => {
    expect(effects).toBeTruthy();
  });

  it('should dispatch LoginSuccess', () => {
    const loginAction = new Login({ email: '', password: ''});
    actions$ = hot('--a-', { a: loginAction});
    userServiceStub.loginWithRedux.and.returnValue(
      cold('--b|', { b: { name: 'alex' } })
    );

    const expected = hot('----a', {
      a: new LoginSuccess({ name: 'alex' }),
    });

    expect(
      effects.doLogin$
    ).toBeObservable(expected);

    expect(userServiceStub.loginWithRedux).toHaveBeenCalledWith({ email: '', password: ''});
  });
});
