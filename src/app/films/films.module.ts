import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FilmsComponent } from './components/films/films.component';
import { MatButtonModule, MatFormFieldModule, MatInputModule } from '@angular/material';



@NgModule({
  declarations: [FilmsComponent],
  imports: [
    CommonModule,
    MatButtonModule,
    MatInputModule,
    MatFormFieldModule
  ]
})
export class FilmsModule { }
