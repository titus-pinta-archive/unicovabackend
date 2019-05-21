import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProfitspageComponent } from './profitspage.component';

describe('ProfitspageComponent', () => {
  let component: ProfitspageComponent;
  let fixture: ComponentFixture<ProfitspageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProfitspageComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProfitspageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
