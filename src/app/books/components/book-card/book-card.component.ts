import { Component, OnInit, Input } from '@angular/core';
import { Book } from '../../models/book';
import { UserService } from '../../../core/services/user.service';
import { Store } from '@ngrx/store';
import { State } from 'src/app/store/reducers';
import { Observable } from 'rxjs';
import { User } from 'src/app/core/models/user';
import { selectAuth } from 'src/app/auth/store/auth.reducer';

@Component({
  selector: 'app-book-card',
  templateUrl: './book-card.component.html',
  styleUrls: ['./book-card.component.scss']
})
export class BookCardComponent implements OnInit {

  @Input() book: Book;

  mode: 'EDIT' | 'VIEW' = 'VIEW';

  user$: Observable<User>;

  constructor(public userService: UserService, private store: Store<State>) { }

  ngOnInit() {
    this.user$ = this.store.select(selectAuth);
  }

  isEditing() {
    return this.mode === 'EDIT';
  }

  changeMode(mode) {
    this.mode = mode;
  }
}
