import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SingleEditComponent } from './single-edit.component';

describe('SingleEditComponent', () => {
  let component: SingleEditComponent;
  let fixture: ComponentFixture<SingleEditComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SingleEditComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SingleEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
