import { Component, OnInit } from '@angular/core';
import { UserService } from './core/services/user.service';
import { Store } from '@ngrx/store';
import { State } from './store/reducers';
import { selectAuth } from './auth/store/login.reducer';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'rxjs';
  loginOpen = false;

  constructor(private userService: UserService, private store: Store<State>) {
  }

  ngOnInit() {
    /*this.userService.user$.subscribe(user => {
      if (user) {
        this.loginOpen = false;
      }
    });*/

    this.store.select(selectAuth).subscribe(user => {
      if (user) {
        this.loginOpen = false;
      }
    })
  }

  toggleLogin() {
    this.loginOpen = !this.loginOpen;
  }
}
