import { NgModule } from '@angular/core';
import { LoginComponent } from './login/login.component';
import { AuthRoutingModule } from './auth-routing.module';
import { SharedModule } from '../shared/shared.module';
import { AngularMaterialModule } from '../shared/angular-material.module';



@NgModule({
  declarations: [LoginComponent],
  imports: [
    SharedModule,
    // AuthRoutingModule,
    AngularMaterialModule
  ],
  exports: [
    LoginComponent
  ]
})
export class AuthModule { }
