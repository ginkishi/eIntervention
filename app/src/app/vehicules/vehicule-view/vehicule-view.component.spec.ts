import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { VehiculeViewComponent } from './vehicule-view.component';

describe('VehiculeViewComponent', () => {
  let component: VehiculeViewComponent;
  let fixture: ComponentFixture<VehiculeViewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ VehiculeViewComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(VehiculeViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
