import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewEmpTaskComponent } from './view-emp-task.component';

describe('ViewEmpTaskComponent', () => {
  let component: ViewEmpTaskComponent;
  let fixture: ComponentFixture<ViewEmpTaskComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ViewEmpTaskComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ViewEmpTaskComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
