import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RegisterOptsComponent } from './register-opts.component';

describe('RegisterOptsComponent', () => {
  let component: RegisterOptsComponent;
  let fixture: ComponentFixture<RegisterOptsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RegisterOptsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RegisterOptsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
