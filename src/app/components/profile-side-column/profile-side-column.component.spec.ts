import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProfileSideColumnComponent } from './profile-side-column.component';

describe('ProfileSideColumnComponent', () => {
  let component: ProfileSideColumnComponent;
  let fixture: ComponentFixture<ProfileSideColumnComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ProfileSideColumnComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ProfileSideColumnComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
