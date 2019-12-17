import { NgModule } from '@angular/core';
import { LoginComponent } from './components/login/login.component';
// import { AuthRoutingModule } from './auth-routing.module';

import { SharedModule } from '../shared/shared.module';
import { AngularMaterialModule } from '../shared/angular-material.module';
import { StoreModule } from '@ngrx/store';
import * as fromLogin from './store/login.reducer';
import { LoginEffects } from './store/login.effects';
import { EffectsModule } from '@ngrx/effects';


@NgModule({
  declarations: [LoginComponent],
  imports: [
    SharedModule,
    // AuthRoutingModule,
    StoreModule.forFeature('login', fromLogin.reducer),
    EffectsModule.forFeature([LoginEffects]),
    AngularMaterialModule
  ],
  exports: [
    LoginComponent
  ]
})
export class AuthModule { }
