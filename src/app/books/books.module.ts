import { NgModule } from '@angular/core';
import { BooksRoutingModule } from './books-routing.module';
import { BookCardContainerComponent } from './components/book-card-container/book-card-container.component';
import { BookCardComponent } from './components/book-card/book-card.component';
import { BookFormComponent } from './components/book-form/book-form.component';
import { SharedModule } from '../shared/shared.module';
import { AngularMaterialModule } from '../shared/angular-material.module';
import { HttpClientModule } from '@angular/common/http';



@NgModule({
  declarations: [
    BookCardContainerComponent,
    BookCardComponent,
    BookFormComponent
  ],
  imports: [
    SharedModule,
    AngularMaterialModule,
    HttpClientModule,
    BooksRoutingModule
  ]
})
export class BooksModule { }
