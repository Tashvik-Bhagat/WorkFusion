import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EmployeeSideBarComponent } from './employee-side-bar.component';

describe('EmployeeSideBarComponent', () => {
  let component: EmployeeSideBarComponent;
  let fixture: ComponentFixture<EmployeeSideBarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [EmployeeSideBarComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EmployeeSideBarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
