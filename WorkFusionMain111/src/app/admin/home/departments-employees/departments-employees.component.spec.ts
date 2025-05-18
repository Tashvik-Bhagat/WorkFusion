import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DepartmentsEmployeesComponent } from './departments-employees.component';

describe('DepartmentsEmployeesComponent', () => {
  let component: DepartmentsEmployeesComponent;
  let fixture: ComponentFixture<DepartmentsEmployeesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [DepartmentsEmployeesComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DepartmentsEmployeesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
