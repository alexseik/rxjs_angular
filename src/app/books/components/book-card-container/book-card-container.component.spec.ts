import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BookCardContainerComponent } from './book-card-container.component';
import { MatGridList, MatGridListModule } from '@angular/material';

describe('BookCardContainerComponent', () => {
  let component: BookCardContainerComponent;
  let fixture: ComponentFixture<BookCardContainerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BookCardContainerComponent ],
      imports: [ MatGridListModule ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BookCardContainerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
