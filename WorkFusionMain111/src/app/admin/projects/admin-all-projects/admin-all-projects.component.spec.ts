import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminAllProjectsComponent } from './admin-all-projects.component';

describe('AdminAllProjectsComponent', () => {
  let component: AdminAllProjectsComponent;
  let fixture: ComponentFixture<AdminAllProjectsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AdminAllProjectsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AdminAllProjectsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
