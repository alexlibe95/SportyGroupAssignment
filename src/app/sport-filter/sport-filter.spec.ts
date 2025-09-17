import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SportFilter } from './sport-filter';

describe('SportFilter', () => {
  let component: SportFilter;
  let fixture: ComponentFixture<SportFilter>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SportFilter]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SportFilter);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
