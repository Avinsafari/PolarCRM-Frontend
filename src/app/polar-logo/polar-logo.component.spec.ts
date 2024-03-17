import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PolarLogoComponent } from './polar-logo.component';

describe('PolarLogoComponent', () => {
  let component: PolarLogoComponent;
  let fixture: ComponentFixture<PolarLogoComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [PolarLogoComponent]
    });
    fixture = TestBed.createComponent(PolarLogoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
