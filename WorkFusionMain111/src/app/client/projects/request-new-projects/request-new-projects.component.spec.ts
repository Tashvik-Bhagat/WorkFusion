import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RequestNewProjectsComponent } from './request-new-projects.component';

describe('RequestNewProjectsComponent', () => {
  let component: RequestNewProjectsComponent;
  let fixture: ComponentFixture<RequestNewProjectsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [RequestNewProjectsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RequestNewProjectsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
