import { NgModule } from '@angular/core';
import { Routes, RouterModule, PreloadAllModules } from '@angular/router';
import { FilmsComponent } from './films/components/films/films.component';
import { LoginComponent } from './auth/components/login/login.component';


const routes: Routes = [
  {
    path: '',
    redirectTo: '/books',
    pathMatch: 'full'
  },
  /*{
    path: 'auth',
    // loadChildren: () => import('./auth/auth.module').then(mod => mod.AuthModule)
    component: LoginComponent
  },*/
  {
    path: 'books',
    loadChildren: () => import('./books/books.module').then(mod => mod.BooksModule)
  },
  {
    path: 'films',
    component: FilmsComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
