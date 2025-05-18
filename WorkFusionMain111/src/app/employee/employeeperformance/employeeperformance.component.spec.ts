import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EmployeeperformanceComponent } from './employeeperformance.component';

describe('EmployeeperformanceComponent', () => {
  let component: EmployeeperformanceComponent;
  let fixture: ComponentFixture<EmployeeperformanceComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [EmployeeperformanceComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EmployeeperformanceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
