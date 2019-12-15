import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { BooksService } from '../../services/books.service';

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

  constructor(private fb: FormBuilder, private bookService: BooksService) {
  }

  ngOnInit() {
    this.bookFilter = this.fb.group({
      author: [''],
      category: [''],
      title: ['']
    });
    this.bookFilter.get('title').valueChanges.subscribe(this.bookService.titleChange$);
    this.bookFilter.get('author').valueChanges.subscribe(this.bookService.authorChange$);
    this.bookFilter.get('category').valueChanges.subscribe(this.bookService.categoryChange$);
  }

}
