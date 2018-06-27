import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TwoFactorConfigComponent } from './two-factor-config.component';

describe('TwoFactorConfigComponent', () => {
  let component: TwoFactorConfigComponent;
  let fixture: ComponentFixture<TwoFactorConfigComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TwoFactorConfigComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TwoFactorConfigComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
