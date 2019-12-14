import { NgModule, Optional, SkipSelf } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from './header/header.component';
import { MatButtonModule, MatToolbarModule } from '@angular/material';
import { RouterModule } from '@angular/router';



@NgModule({
  declarations: [
    HeaderComponent
  ],
  imports: [
    CommonModule,
    RouterModule,
    MatButtonModule,
    MatToolbarModule
  ],
  exports: [
    HeaderComponent
  ]
})
export class CoreModule {
  constructor(@Optional() @SkipSelf() parent: CoreModule) {
    if (parent) {
      throw new Error('CoreModule is already imported');
    }
  }
}
