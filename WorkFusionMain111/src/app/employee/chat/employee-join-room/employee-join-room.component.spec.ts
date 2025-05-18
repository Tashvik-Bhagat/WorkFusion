import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EmployeeJoinRoomComponent } from './employee-join-room.component';

describe('EmployeeJoinRoomComponent', () => {
  let component: EmployeeJoinRoomComponent;
  let fixture: ComponentFixture<EmployeeJoinRoomComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [EmployeeJoinRoomComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EmployeeJoinRoomComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
