import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AllApprovedListComponent } from './all-approved-list.component';

describe('AllApprovedListComponent', () => {
  let component: AllApprovedListComponent;
  let fixture: ComponentFixture<AllApprovedListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AllApprovedListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AllApprovedListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
