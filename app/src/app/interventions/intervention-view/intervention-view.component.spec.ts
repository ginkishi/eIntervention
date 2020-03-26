import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { InterventionViewComponent } from './intervention-view.component';

describe('InterventionViewComponent', () => {
  let component: InterventionViewComponent;
  let fixture: ComponentFixture<InterventionViewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ InterventionViewComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(InterventionViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
