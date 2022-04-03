import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PrintNotDesComponent } from './print-not-des.component';

describe('PrintNotDesComponent', () => {
  let component: PrintNotDesComponent;
  let fixture: ComponentFixture<PrintNotDesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PrintNotDesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PrintNotDesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
