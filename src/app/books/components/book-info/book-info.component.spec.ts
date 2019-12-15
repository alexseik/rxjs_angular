import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BookInfoComponent } from './book-info.component';
import { AngularMaterialModule } from '../../../shared/angular-material.module';

describe('BookInfoComponent', () => {
  let component: BookInfoComponent;
  let fixture: ComponentFixture<BookInfoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BookInfoComponent ],
      imports: [AngularMaterialModule]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BookInfoComponent);
    component = fixture.componentInstance;
    component.book = {
      title: '',
      isbn: ''
    }
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
