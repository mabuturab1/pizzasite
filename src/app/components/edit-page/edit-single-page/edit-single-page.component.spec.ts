import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EditSinglePageComponent } from './edit-single-page.component';

describe('EditSinglePageComponent', () => {
  let component: EditSinglePageComponent;
  let fixture: ComponentFixture<EditSinglePageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EditSinglePageComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EditSinglePageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
