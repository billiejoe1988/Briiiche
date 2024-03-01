import { TestBed, ComponentFixture } from '@angular/core/testing';
import { LoginComponent } from './login.component';
import { MockProvider } from 'ng-mocks';
import { AuthService } from '../../auth.service';
import { SharedModule } from '../../../../shared/shared.module';
import { Validators } from '@angular/forms';

describe('LoginComponent', () => {
    let component: LoginComponent;
    let fixture: ComponentFixture<LoginComponent>;
  
    beforeEach(() => {
      TestBed.configureTestingModule({
        declarations: [LoginComponent],
        imports: [SharedModule],
        providers: [MockProvider(AuthService)],
      });
  
      fixture = TestBed.createComponent(LoginComponent);
      component = fixture.componentInstance;
    });
  
    it('LoginComponent should be instantiated correctly', () => {
      expect(component).toBeTruthy();
    });
  
    it('Email and password should be required controls', () => {
      expect(
        component.loginForm.get('password')?.hasValidator(Validators.required)
      ).toBeTrue();
      expect(
        component.loginForm.get('email')?.hasValidator(Validators.required)
      ).toBeTrue();
    });
  
    it('If the form is invalid and onSubmit is called, it should mark its fields as touched', () => {
      component.loginForm.patchValue({
        email: '',
        password: '',
      });
  
      expect(component.loginForm.invalid).toBeTrue();
  
      const spyOnMarkAllAsTouched = spyOn(
        component.loginForm,
        'markAllAsTouched'
      );
  
      component.onSubmit();
  
      expect(spyOnMarkAllAsTouched).toHaveBeenCalled();
    });
  });
