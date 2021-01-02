import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AllApprovalsListComponent } from './all-approvals-list.component';

describe('AllApprovalsListComponent', () => {
  let component: AllApprovalsListComponent;
  let fixture: ComponentFixture<AllApprovalsListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AllApprovalsListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AllApprovalsListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
