import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BookFilterComponent } from './book-filter.component';
import { AngularMaterialModule } from '../../../shared/angular-material.module';
import { ReactiveFormsModule } from '@angular/forms';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';

describe('BookFilterComponent', () => {
  let component: BookFilterComponent;
  let fixture: ComponentFixture<BookFilterComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BookFilterComponent ],
      imports: [AngularMaterialModule, ReactiveFormsModule, NoopAnimationsModule]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BookFilterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
