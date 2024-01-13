import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

import { UserService } from 'src/app/services/user.service';
import { PasswordMatchValidator } from 'src/app/shared/validators/password_match_validator';
import { UserRegistrationInput } from 'src/app/shared/interfaces/UserRegistration';
import { firstValueFrom } from 'rxjs';

@Component({
  selector: 'app-register-page',
  templateUrl: './register-page.component.html',
  styleUrl: './register-page.component.scss'
})
export class RegisterPageComponent implements OnInit{

  registrationForm!: FormGroup;
  isSubmitted = false;
  returnUrl = '';

  constructor(
    private formBuilder: FormBuilder,
    private userService: UserService,
    private activatedRoute: ActivatedRoute,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.registrationForm = this.formBuilder.group({
      name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(8), Validators.maxLength(20)]],
      confirmPassword: ['', [Validators.required]],
      address: ['', Validators.required],
    }, {
      validators: [PasswordMatchValidator('password', 'confirmPassword')]
    });

    this.returnUrl = this.activatedRoute.snapshot.queryParams['returnUrl'];
  }

  get fc() { return this.registrationForm.controls }

  async onSubmit(): Promise<void> {
    this.isSubmitted = true;

    if (this.registrationForm.invalid) {
      return;
    }

    const user: UserRegistrationInput = {
      name: this.fc['name'].value,
      email: this.fc['email'].value,
      password: this.fc['password'].value,
      confirmPassword: this.fc['confirmPassword'].value,
      address: this.fc['address'].value
    }

    try {
      await firstValueFrom(this.userService.register(user));
      this.router.navigateByUrl(this.returnUrl);
    } catch (error) {
      console.error(error);
    }
  }
}
