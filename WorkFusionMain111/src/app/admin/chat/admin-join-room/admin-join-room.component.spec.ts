import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminJoinRoomComponent } from './admin-join-room.component';

describe('AdminJoinRoomComponent', () => {
  let component: AdminJoinRoomComponent;
  let fixture: ComponentFixture<AdminJoinRoomComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AdminJoinRoomComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AdminJoinRoomComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
