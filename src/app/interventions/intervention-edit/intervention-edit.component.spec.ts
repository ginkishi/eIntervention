import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { InterventionEditComponent } from './intervention-edit.component';

describe('InterventionEditComponent', () => {
  let component: InterventionEditComponent;
  let fixture: ComponentFixture<InterventionEditComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ InterventionEditComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(InterventionEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
