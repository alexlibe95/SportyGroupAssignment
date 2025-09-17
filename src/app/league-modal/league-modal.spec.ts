import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LeagueModal } from './league-modal';

describe('LeagueModal', () => {
  let component: LeagueModal;
  let fixture: ComponentFixture<LeagueModal>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LeagueModal]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LeagueModal);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
