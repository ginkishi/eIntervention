import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { InterventionExportComponent } from './intervention-export.component';

describe('InterventionExportComponent', () => {
  let component: InterventionExportComponent;
  let fixture: ComponentFixture<InterventionExportComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ InterventionExportComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(InterventionExportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
