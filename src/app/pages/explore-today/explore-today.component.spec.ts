import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ExploreTodayComponent } from './explore-today.component';

describe('ExploreTodayComponent', () => {
  let component: ExploreTodayComponent;
  let fixture: ComponentFixture<ExploreTodayComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ExploreTodayComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ExploreTodayComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
