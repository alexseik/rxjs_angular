import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { UserService } from '../services/user.service';
import { Store } from '@ngrx/store';
import { State } from 'src/app/store/reducers';
import { Observable } from 'rxjs';
import { User } from '../models/user';
import { selectAuth } from 'src/app/auth/store/login.reducer';
import { Logout } from 'src/app/auth/store/login.actions';


@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  @Output() login = new EventEmitter<boolean>();

  user$: Observable<User>;

  constructor(
    public userService: UserService,
    public store: Store<State>) { }

  ngOnInit() {
    this.user$ = this.store.select(selectAuth);
  }

  showLogin() {
    this.login.emit(true);
  }

  logout() {
    this.store.dispatch(new Logout({}));
  }

}
