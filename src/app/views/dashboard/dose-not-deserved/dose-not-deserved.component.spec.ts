import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DoseNotDeservedComponent } from './dose-not-deserved.component';

describe('DoseNotDeservedComponent', () => {
  let component: DoseNotDeservedComponent;
  let fixture: ComponentFixture<DoseNotDeservedComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DoseNotDeservedComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DoseNotDeservedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
