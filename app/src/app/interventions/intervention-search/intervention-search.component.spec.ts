import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { InterventionSearchComponent } from './intervention-search.component';

describe('InterventionSearchComponent', () => {
  let component: InterventionSearchComponent;
  let fixture: ComponentFixture<InterventionSearchComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ InterventionSearchComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(InterventionSearchComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
