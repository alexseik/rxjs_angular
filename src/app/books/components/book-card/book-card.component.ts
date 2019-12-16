import { Component, OnInit, Input } from '@angular/core';
import { Book } from '../../models/book';
import { UserService } from '../../../core/services/user.service';
import { BooksService } from '../../services/books.service';

@Component({
  selector: 'app-book-card',
  templateUrl: './book-card.component.html',
  styleUrls: ['./book-card.component.scss']
})
export class BookCardComponent implements OnInit {

  @Input() book: Book;

  mode: 'EDIT' | 'VIEW' = 'VIEW';

  constructor(private userService: UserService) { }

  ngOnInit() {
  }

  isEditing() {
    return this.mode === 'EDIT';
  }

  changeMode(mode) {
    this.mode = mode;
  }
}
