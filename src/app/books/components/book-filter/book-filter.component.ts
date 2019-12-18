import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { BooksService } from '../../services/books.service';
import { BooksState } from '../../store/reducers';
import { Store } from '@ngrx/store';
import { setFilter } from '../../store/actions';

@Component({
  selector: 'app-book-filter',
  templateUrl: './book-filter.component.html',
  styleUrls: ['./book-filter.component.scss']
})
export class BookFilterComponent implements OnInit {

  bookFilter: FormGroup;

  authors = [
    'author 1',
    'author 2'
  ];

  categories = [
    'category 1',
    'category 2'
  ];

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
  }

}
