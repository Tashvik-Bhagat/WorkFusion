import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ManagerJoinRoomComponent } from './manager-join-room.component';

describe('ManagerJoinRoomComponent', () => {
  let component: ManagerJoinRoomComponent;
  let fixture: ComponentFixture<ManagerJoinRoomComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ManagerJoinRoomComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ManagerJoinRoomComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
