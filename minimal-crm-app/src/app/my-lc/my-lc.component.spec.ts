import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MyLcComponent } from './my-lc.component';

describe('MyLcComponent', () => {
  let component: MyLcComponent;
  let fixture: ComponentFixture<MyLcComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [MyLcComponent]
    });
    fixture = TestBed.createComponent(MyLcComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
