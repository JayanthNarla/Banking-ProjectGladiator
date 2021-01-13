import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ChangeTpwdComponent } from './change-tpwd.component';

describe('ChangeTpwdComponent', () => {
  let component: ChangeTpwdComponent;
  let fixture: ComponentFixture<ChangeTpwdComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ChangeTpwdComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ChangeTpwdComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
