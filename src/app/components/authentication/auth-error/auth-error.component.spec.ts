import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AuthErrorComponent } from './auth-error.component';

import { AppModule } from '../../../app.module';

describe('AuthErrorComponent', () => {
  let component: AuthErrorComponent;
  let fixture: ComponentFixture<AuthErrorComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [AppModule]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AuthErrorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
