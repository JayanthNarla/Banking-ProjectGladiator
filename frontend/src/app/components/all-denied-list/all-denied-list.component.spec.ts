import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AllDeniedListComponent } from './all-denied-list.component';

describe('AllDeniedListComponent', () => {
  let component: AllDeniedListComponent;
  let fixture: ComponentFixture<AllDeniedListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AllDeniedListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AllDeniedListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
