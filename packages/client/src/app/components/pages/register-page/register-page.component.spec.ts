import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

import { RegisterPageComponent } from './register-page.component';
import { UserService } from 'src/app/services/user.service';
import { DefaultButtonComponent } from '../../partials/default-button/default-button.component';
import { TextInputComponent } from '../../partials/text-input/text-input.component'
import { TitleComponent } from '../../partials/title/title.component';
import { InputContainerComponent } from '../../partials/input-container/input-container.component';
import { InputValidationComponent } from '../../partials/input-validation/input-validation.component';
import { User } from 'src/app/shared/models/user';

describe('RegisterPageComponent', () => {
  let component: RegisterPageComponent;
  let fixture: ComponentFixture<RegisterPageComponent>;
  let userService: jasmine.SpyObj<UserService>;

  beforeEach(() => {
    const userServiceSpy = jasmine.createSpyObj('UserService', ['register']);

    TestBed.configureTestingModule({
      declarations: [
        RegisterPageComponent,
        TitleComponent,
        DefaultButtonComponent,
        TextInputComponent,
        InputContainerComponent,
        InputValidationComponent

      ],
      imports: [ReactiveFormsModule, RouterTestingModule],
      providers: [
        { provide: UserService, useValue: userServiceSpy },
        {
          provide: ActivatedRoute,
          useValue: {
            snapshot: {
              queryParams: of({ returnUrl: 'some-url' })
            }
          }
        },
      ],
    });

    fixture = TestBed.createComponent(RegisterPageComponent);
    component = fixture.componentInstance;
    userService = TestBed.inject(UserService) as jasmine.SpyObj<UserService>;
  });

  afterEach(() => {
    jasmine.createSpyObj('route.snapshot.paramMap', ['get']);
  });


  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize the form with default values', () => {
    component.ngOnInit()
    expect(component.registrationForm.valid).toBeFalsy();
    expect(component.fc['name'].value).toEqual('');
  });

  it('should validate form and call userService.register on onSubmit', async () => {
    component.ngOnInit()
    component.registrationForm.setValue({
      name: 'John Doe',
      email: 'john.doe@example.com',
      password: 'password123',
      confirmPassword: 'password123',
      address: '123 Main St',
    });

    const newUser: User = {
      id: '123',
      name: 'John Doe',
      email: 'test@gmail.com',
      password: 'password123',
      address: '123 Main St',
      isAdmin: false,
      token: '123'
    }

    userService.register.and.returnValue(of(newUser));

    await component.onSubmit();

    expect(component.isSubmitted).toBeTruthy();
    expect(component.registrationForm.valid).toBeTruthy();
    expect(userService.register).toHaveBeenCalledWith({
      name: 'John Doe',
      email: 'john.doe@example.com',
      password: 'password123',
      confirmPassword: 'password123',
      address: '123 Main St',
    });
  });
});
