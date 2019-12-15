import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';

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

  constructor(private fb: FormBuilder) {
  }

  ngOnInit() {
    this.bookFilter = this.fb.group({
      author: [''],
      category: [''],
      title: ['']
    });
  }

}
