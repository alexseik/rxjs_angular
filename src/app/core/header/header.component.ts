import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { UserService } from '../services/user.service';


@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  @Output() login = new EventEmitter<boolean>();

  constructor(public userService: UserService) { }

  ngOnInit() {
  }

  showLogin() {
    this.login.emit(true);
  }

}
