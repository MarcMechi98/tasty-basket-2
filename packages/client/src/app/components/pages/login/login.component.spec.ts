import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { ToastrModule } from 'ngx-toastr';

import { LoginComponent } from './login.component';
import { TitleComponent } from '../../partials/title/title.component';
import { TextInputComponent } from '../../partials/text-input/text-input.component'
import { DefaultButtonComponent } from '../../partials/default-button/default-button.component';
import { RouterTestingModule } from '@angular/router/testing';
import { InputContainerComponent } from '../../partials/input-container/input-container.component';
import { InputValidationComponent } from '../../partials/input-validation/input-validation.component';

describe('LoginComponent', () => {
  let component: LoginComponent;
  let fixture: ComponentFixture<LoginComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [
        LoginComponent,
        TitleComponent,
        TextInputComponent,
        DefaultButtonComponent,
        InputContainerComponent,
        InputValidationComponent
      ],
      imports: [ReactiveFormsModule, HttpClientModule, ToastrModule.forRoot(), RouterTestingModule],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LoginComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize the form with required controls', () => {
    expect(component.loginForm).toBeDefined();
    expect(component.fc['email']).toBeDefined();
    expect(component.fc['password']).toBeDefined();
  });

  it('should render the login form elements in the template', () => {
    const formElement = fixture.nativeElement.querySelector('form');
    const emailInput = fixture.nativeElement.querySelector('app-text-input[label="Email"]');
    const passwordInput = fixture.nativeElement.querySelector('app-text-input[label="Password"]');
    const button = fixture.nativeElement.querySelector('app-default-button');

    expect(formElement).toBeTruthy();
    expect(emailInput).toBeTruthy();
    expect(passwordInput).toBeTruthy();
    expect(button).toBeTruthy();
  });
});
