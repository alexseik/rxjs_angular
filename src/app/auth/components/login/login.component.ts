import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms'
import { UserService } from '../../../core/services/user.service';
import { RequestAuth } from '../../../core/models/auth';
import { Store } from '@ngrx/store';
import { AuthState } from '../../store/auth.reducer';
import { Login } from '../../store/auth.actions';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  loginForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private store: Store<AuthState>) { }

  ngOnInit() {
    this.loginForm = this.fb.group({
      email: ['', Validators.required],
      password: ['', Validators.required]
    });
  }

  submit() {
    if (this.loginForm.valid) {
      const creds = this.loginForm.value as RequestAuth;
      this.store.dispatch(new Login(creds));
    }
  }

}
