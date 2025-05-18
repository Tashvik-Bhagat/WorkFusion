import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ManagerChatComponent } from './manager-chat.component';

describe('ManagerChatComponent', () => {
  let component: ManagerChatComponent;
  let fixture: ComponentFixture<ManagerChatComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ManagerChatComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ManagerChatComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
