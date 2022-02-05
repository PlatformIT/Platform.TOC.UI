import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GetByMonthComponent } from './get-by-month.component';

describe('GetByMonthComponent', () => {
  let component: GetByMonthComponent;
  let fixture: ComponentFixture<GetByMonthComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GetByMonthComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(GetByMonthComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
