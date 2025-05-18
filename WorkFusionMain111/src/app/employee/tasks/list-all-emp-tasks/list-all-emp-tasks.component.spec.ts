import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListAllEmpTasksComponent } from './list-all-emp-tasks.component';

describe('ListAllEmpTasksComponent', () => {
  let component: ListAllEmpTasksComponent;
  let fixture: ComponentFixture<ListAllEmpTasksComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ListAllEmpTasksComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ListAllEmpTasksComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
