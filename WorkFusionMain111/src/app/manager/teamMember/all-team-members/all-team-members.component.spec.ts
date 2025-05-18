import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AllTeamMembersComponent } from './all-team-members.component';

describe('AllTeamMembersComponent', () => {
  let component: AllTeamMembersComponent;
  let fixture: ComponentFixture<AllTeamMembersComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AllTeamMembersComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AllTeamMembersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
