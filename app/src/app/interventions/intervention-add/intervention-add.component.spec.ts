import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { InterventionAddComponent } from './intervention-add.component';

describe('InterventionAddComponent', () => {
  let component: InterventionAddComponent;
  let fixture: ComponentFixture<InterventionAddComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ InterventionAddComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(InterventionAddComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
