import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AllPendingListComponent } from './all-pending-list.component';

describe('AllPendingListComponent', () => {
  let component: AllPendingListComponent;
  let fixture: ComponentFixture<AllPendingListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AllPendingListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AllPendingListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
