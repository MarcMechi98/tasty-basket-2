import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';

import { UserService } from 'src/app/services/user.service';
import { PasswordMatchValidator } from 'src/app/shared/validators/password-match-validator';
import { UserRegistrationInput } from 'src/app/shared/interfaces/UserRegistration';
import { firstValueFrom } from 'rxjs';

@Component({
  selector: 'app-register-page',
  templateUrl: './register-page.component.html',
  styleUrl: './register-page.component.scss',
})
export class RegisterPageComponent implements OnInit {
  public registrationForm!: FormGroup;
  public isSubmitted = false;
  public returnUrl = '';

  public shouldShowPassword = false;
  public shouldShowPasswordConfirmation = false;

  constructor(
    private formBuilder: FormBuilder,
    private userService: UserService,
    private activatedRoute: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.registrationForm = this.formBuilder.group(
      {
        name: ['', Validators.required],
        email: ['', [Validators.required, Validators.email]],
        password: [
          '',
          [
            Validators.required,
            Validators.minLength(8),
            Validators.maxLength(20),
          ],
        ],
        confirmPassword: ['', [Validators.required]],
        address: ['', Validators.required],
      },
      {
        validators: [PasswordMatchValidator('password', 'confirmPassword')],
      }
    );

    this.returnUrl = this.activatedRoute.snapshot.queryParams['returnUrl'];
  }

  get nameFormControl(): FormControl {
    return this.registrationForm.get('name') as FormControl;
  }

  get emailFormControl(): FormControl {
    return this.registrationForm.get('email') as FormControl;
  }

  get passwordFormControl(): FormControl {
    return this.registrationForm.get('password') as FormControl;
  }

  get confirmPasswordFormControl(): FormControl {
    return this.registrationForm.get('confirmPassword') as FormControl;
  }

  get addressFormControl(): FormControl {
    return this.registrationForm.get('address') as FormControl;
  }

  public async register(): Promise<void> {
    this.isSubmitted = true;

    if (this.registrationForm.invalid) {
      return;
    }

    const user: UserRegistrationInput = {
      name: this.nameFormControl.value,
      email: this.emailFormControl.value,
      password: this.passwordFormControl.value,
      confirmPassword: this.confirmPasswordFormControl.value,
      address: this.addressFormControl.value,
    };

    try {
      await firstValueFrom(this.userService.register$(user));
      this.router.navigateByUrl(this.returnUrl);
    } catch (error) {
      console.error(error);
    }
  }
}
