import { NgModule } from '@angular/core';
import { BooksRoutingModule } from './books-routing.module';
import { BookCardContainerComponent } from './components/book-card-container/book-card-container.component';
import { BookCardComponent } from './components/book-card/book-card.component';
import { BookFormComponent } from './components/book-form/book-form.component';
import { SharedModule } from '../shared/shared.module';
import { AngularMaterialModule } from '../shared/angular-material.module';
import { HttpClientModule } from '@angular/common/http';
import { BookFilterComponent } from './components/book-filter/book-filter.component';
import { BookInfoComponent } from './components/book-info/book-info.component';
import { StoreModule } from '@ngrx/store';
import * as fromBooks from './store/reducers';
import { BooksEffects } from './store/effects';
import { EffectsModule } from '@ngrx/effects';



@NgModule({
  declarations: [
    BookCardContainerComponent,
    BookCardComponent,
    BookFormComponent,
    BookFilterComponent,
    BookInfoComponent
  ],
  imports: [
    SharedModule,
    AngularMaterialModule,
    HttpClientModule,
    BooksRoutingModule,
    StoreModule.forFeature(fromBooks.booksFeatureKey, fromBooks.reducers ),
    EffectsModule.forFeature([BooksEffects])
  ]
})
export class BooksModule { }
