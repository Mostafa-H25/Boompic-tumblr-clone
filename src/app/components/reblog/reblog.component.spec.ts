import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReblogComponent } from './reblog.component';

describe('ReblogComponent', () => {
  let component: ReblogComponent;
  let fixture: ComponentFixture<ReblogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ReblogComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ReblogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
