import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DepartmentsProjectsComponent } from './departments-projects.component';

describe('DepartmentsProjectsComponent', () => {
  let component: DepartmentsProjectsComponent;
  let fixture: ComponentFixture<DepartmentsProjectsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [DepartmentsProjectsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DepartmentsProjectsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
