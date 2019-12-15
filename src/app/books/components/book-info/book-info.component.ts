import { Component, Input, OnInit } from '@angular/core';
import { Book } from '../../models/book';

@Component({
  selector: 'app-book-info',
  templateUrl: './book-info.component.html',
  styleUrls: ['./book-info.component.scss']
})
export class BookInfoComponent implements OnInit {

  @Input() book: Book;

  constructor() { }

  ngOnInit() {
  }

}
