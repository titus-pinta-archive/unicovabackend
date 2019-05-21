import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ReservationspageComponent } from './reservationspage.component';

describe('ReservationspageComponent', () => {
  let component: ReservationspageComponent;
  let fixture: ComponentFixture<ReservationspageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ReservationspageComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ReservationspageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
