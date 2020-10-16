import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CarForUserComponentsComponent } from './car-for-user-components.component';

describe('CarForUserComponentsComponent', () => {
  let component: CarForUserComponentsComponent;
  let fixture: ComponentFixture<CarForUserComponentsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CarForUserComponentsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CarForUserComponentsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
