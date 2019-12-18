import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { BooksService } from '../../services/books.service';
import { BooksState } from '../../store/reducers';
import { Store } from '@ngrx/store';
import { setFilter } from '../../store/actions';
import { Observable } from 'rxjs';
import { Author } from '../../models/author';
import { selectFilterAuthors, selectFilterCategories } from '../../store/selectors';

@Component({
  selector: 'app-book-filter',
  templateUrl: './book-filter.component.html',
  styleUrls: ['./book-filter.component.scss']
})
export class BookFilterComponent implements OnInit {

  bookFilter: FormGroup;

  authors$: Observable<Author[]>;

  categories$: Observable<string[]>;

  constructor(private fb: FormBuilder, public booksService: BooksService, private store: Store<BooksState>) {
  }

  ngOnInit() {
    this.bookFilter = this.fb.group({
      author: [''],
      category: [''],
      title: ['']
    });
    this.bookFilter.get('title').valueChanges.subscribe(
      // this.booksService.titleChange$
      (value) => this.store.dispatch(setFilter({ filter: { title: value } }))
    );
    this.bookFilter.get('author').valueChanges.subscribe(
      // this.booksService.authorChange$
      (value) => this.store.dispatch(setFilter({ filter: { authorName: value } }))
    );
    this.bookFilter.get('category').valueChanges.subscribe(
      // this.booksService.categoryChange$
      (value) => this.store.dispatch(setFilter({ filter: { category: value } }))
    );

    this.authors$ = this.store.select(selectFilterAuthors);
    this.categories$ = this.store.select(selectFilterCategories);
  }

}
