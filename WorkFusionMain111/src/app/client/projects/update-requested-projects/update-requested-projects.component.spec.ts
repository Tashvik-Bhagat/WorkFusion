import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdateRequestedProjectsComponent } from './update-requested-projects.component';

describe('UpdateRequestedProjectsComponent', () => {
  let component: UpdateRequestedProjectsComponent;
  let fixture: ComponentFixture<UpdateRequestedProjectsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [UpdateRequestedProjectsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UpdateRequestedProjectsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
