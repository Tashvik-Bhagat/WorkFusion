import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListAllProjectsComponent } from './list-all-projects.component';

describe('ListAllProjectsComponent', () => {
  let component: ListAllProjectsComponent;
  let fixture: ComponentFixture<ListAllProjectsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ListAllProjectsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ListAllProjectsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
