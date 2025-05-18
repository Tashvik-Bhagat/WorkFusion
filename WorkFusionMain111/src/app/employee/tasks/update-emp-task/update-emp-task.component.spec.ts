import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdateEmpTaskComponent } from './update-emp-task.component';

describe('UpdateEmpTaskComponent', () => {
  let component: UpdateEmpTaskComponent;
  let fixture: ComponentFixture<UpdateEmpTaskComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [UpdateEmpTaskComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UpdateEmpTaskComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
