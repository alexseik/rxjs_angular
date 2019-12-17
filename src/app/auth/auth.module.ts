import { NgModule } from '@angular/core';
import { LoginComponent } from './components/login/login.component';
// import { AuthRoutingModule } from './auth-routing.module';

import { SharedModule } from '../shared/shared.module';
import { AngularMaterialModule } from '../shared/angular-material.module';
import { StoreModule } from '@ngrx/store';
import * as fromAuth from './store/auth.reducer';
import { AuthEffects } from './store/auth.effects';
import { EffectsModule } from '@ngrx/effects';


@NgModule({
  declarations: [LoginComponent],
  imports: [
    SharedModule,
    // AuthRoutingModule,
    StoreModule.forFeature(fromAuth.authFeatureKey, fromAuth.authReducer),
    EffectsModule.forFeature([AuthEffects]),
    AngularMaterialModule
  ],
  exports: [
    LoginComponent
  ]
})
export class AuthModule { }
