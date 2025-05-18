import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ManagerWelocomeComponent } from './manager-welocome.component';

describe('ManagerWelocomeComponent', () => {
  let component: ManagerWelocomeComponent;
  let fixture: ComponentFixture<ManagerWelocomeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ManagerWelocomeComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ManagerWelocomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
