import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { CoreModule } from './core/core.module';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { MatSidenavModule } from '@angular/material';
import { FilmsModule } from './films/films.module';
import { AuthenticationInterceptor } from './core/interceptors/authentication.interceptor';
import { AuthModule } from './auth/auth.module';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    HttpClientModule,
    CoreModule,
    MatSidenavModule,
    AuthModule,
    FilmsModule,
    /*[
      { provide: HTTP_INTERCEPTORS, useClass: AuthenticationInterceptor, multi: true },
    ]*/
    /*HttpClientInMemoryWebApiModule.forRoot(InMemoryBooksService)*/
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
