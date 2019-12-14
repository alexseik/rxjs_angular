import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { BookCardContainerComponent } from './components/book-card-container/book-card-container.component';


const routes: Routes = [
  {
    path: '',
    component: BookCardContainerComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class BooksRoutingModule { }
