import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TodayMeteo } from './today-meteo';

describe('TodayMeteo', () => {
  let component: TodayMeteo;
  let fixture: ComponentFixture<TodayMeteo>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TodayMeteo]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TodayMeteo);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
