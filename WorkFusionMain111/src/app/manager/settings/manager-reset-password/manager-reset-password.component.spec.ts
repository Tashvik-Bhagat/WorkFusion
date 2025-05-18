import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ManagerResetPasswordComponent } from './manager-reset-password.component';

describe('ManagerResetPasswordComponent', () => {
  let component: ManagerResetPasswordComponent;
  let fixture: ComponentFixture<ManagerResetPasswordComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ManagerResetPasswordComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ManagerResetPasswordComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
