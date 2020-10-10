import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AvaibleCarListComponent } from './avaibleCar-list.component';

describe('AvaibleCarListComponent', () => {
  let component: AvaibleCarListComponent;
  let fixture: ComponentFixture<AvaibleCarListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AvaibleCarListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AvaibleCarListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
