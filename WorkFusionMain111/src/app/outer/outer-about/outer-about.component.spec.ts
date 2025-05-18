import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OuterAboutComponent } from './outer-about.component';

describe('OuterAboutComponent', () => {
  let component: OuterAboutComponent;
  let fixture: ComponentFixture<OuterAboutComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [OuterAboutComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(OuterAboutComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
