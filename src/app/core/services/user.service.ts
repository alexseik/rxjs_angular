import { Inject, Injectable, OnDestroy } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Subject } from 'rxjs';
import { User } from '../models/user';
import { AccessToken, RequestAuth } from '../models/auth';
import { environment } from '../../../environments/environment';
import { switchMap, take } from 'rxjs/operators';
import { StorageService, LOCAL_STORAGE } from 'ngx-webstorage-service';
import { Router } from '@angular/router';

export const AUTH_URL = 'auth/login';
export const USERS_URL = 'api/users';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  user$ = new BehaviorSubject<User>(null);

  // private destroy$ = new Subject<any>();

  constructor(
    private http: HttpClient,
    @Inject(LOCAL_STORAGE) private storage: StorageService,
    private router: Router) {
    const token = this.storage.get('token');
    const user = this.storage.get('user');
    if (token && user) {
      this.user$.next(user);
    }
  }

  login(creds: RequestAuth) {
    this.http.post(`${environment.ENDPOINT}${AUTH_URL}`, creds)
      .pipe(
        switchMap((user: AccessToken) => {
          this.storage.set('token', `Bearer ${user.access_token}`);
          return this.http.get(`${environment.ENDPOINT}${USERS_URL}/${user.id}`);
        }),
        take(1)
      )
      .subscribe((user: User) => {
        this.user$.next(user);
        this.storage.set('user', user);
        this.router.navigate(['/books']);
      });
  }

  loginWithRedux(creds: RequestAuth) {
    return this.http.post(`${environment.ENDPOINT}${AUTH_URL}`, creds)
    .pipe(
      switchMap((user: AccessToken) => {
        this.storage.set('token', `Bearer ${user.access_token}`);
        return this.http.get(`${environment.ENDPOINT}${USERS_URL}/${user.id}`);
      }),
      take(1)
    );
  }

  logout() {
    this.storage.remove('token');
    this.user$.next(null);
  }

}
