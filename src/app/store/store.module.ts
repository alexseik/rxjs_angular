import { NgModule } from '@angular/core';

import { StoreModule } from '@ngrx/store';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';

import { reducers, metaReducers } from './reducers';
import { environment } from 'src/environments/environment';

@NgModule({
  imports: [
    StoreModule.forRoot(reducers, {
      metaReducers,
      runtimeChecks: {
        strictStateImmutability: true,
        strictActionImmutability: true
      }
    }),
    !environment.production
      ? StoreDevtoolsModule.instrument({
          name: 'Boream Example',
          logOnly: environment.production
        })
      : []
  ],
  exports: [StoreModule]
})
export class AppStoreModule { }