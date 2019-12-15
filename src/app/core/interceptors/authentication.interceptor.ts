import { catchError } from 'rxjs/operators';
import {
  HttpEvent,
  HttpHandler,
  HttpInterceptor,
  HttpRequest
} from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';
import { SESSION_STORAGE, StorageService } from 'ngx-webstorage-service';

@Injectable()
export class AuthenticationInterceptor implements HttpInterceptor {
  // token: string;
  constructor(@Inject(SESSION_STORAGE) private storage: StorageService) {

  }

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    if (this.needAuth(request.url, request.method)) {
      request = request.clone({
        setHeaders: {
          Authorization: this.token ? `${this.token}` : ''
        }
      });
    }

    return next.handle(request).pipe(
      catchError(err => {
        if (err.status === 401 && err.error.data === 'Token expired') {
          // this.store.dispatch(new Logout({}));
        }
        throw err;
      })
    );
  }

  get token() {
    return this.storage.get('token');
  }

  private needAuth(url, method) {
    const needUrl = (
      url === `${environment.ENDPOINT}/books`
    );
    const needMethod = (
      method !== 'GET'
    );
    return url === `${environment.ENDPOINT}/users` || (needMethod && needUrl);
  }
}
