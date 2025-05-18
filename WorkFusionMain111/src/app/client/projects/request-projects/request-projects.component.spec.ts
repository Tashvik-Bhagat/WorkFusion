import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RequestProjectsComponent } from './request-projects.component';

describe('RequestProjectsComponent', () => {
  let component: RequestProjectsComponent;
  let fixture: ComponentFixture<RequestProjectsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [RequestProjectsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RequestProjectsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
