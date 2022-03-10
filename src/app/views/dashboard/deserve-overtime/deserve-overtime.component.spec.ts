import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DeserveOvertimeComponent } from './deserve-overtime.component';

describe('DeserveOvertimeComponent', () => {
  let component: DeserveOvertimeComponent;
  let fixture: ComponentFixture<DeserveOvertimeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DeserveOvertimeComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DeserveOvertimeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
