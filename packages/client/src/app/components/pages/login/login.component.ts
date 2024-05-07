import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  public loginForm!: FormGroup;
  public isSubmitted = false;
  public returnUrl: string = '';
  public shouldShowPassword = false;

  constructor(
    private formBuilder: FormBuilder,
    private userService: UserService,
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private toastr: ToastrService
  ) {}

  ngOnInit(): void {
    this.loginForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required],
    });

    this.returnUrl = this.activatedRoute.snapshot.queryParams['returnUrl'];
  }

  get emailFormControl(): FormControl {
    return this.loginForm.get('email') as FormControl;
  }

  get passwordFormControl(): FormControl {
    return this.loginForm.get('password') as FormControl;
  }

  public login(): void {
    this.isSubmitted = true;

    this.userService
      .login$({
        email: this.emailFormControl.value,
        password: this.passwordFormControl.value,
      })
      .subscribe(() => {
        this.router.navigateByUrl(this.returnUrl);
      });
  }
}
