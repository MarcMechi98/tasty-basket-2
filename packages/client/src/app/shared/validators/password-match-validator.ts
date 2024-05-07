import { AbstractControl, FormGroup } from "@angular/forms";

export const PasswordMatchValidator = (passwordControlName: string, confirmPasswordControlName: string) => {
  return (formGroup: FormGroup) => {
    const password: AbstractControl = formGroup.controls[passwordControlName];
    const confirmPassword: AbstractControl = formGroup.controls[confirmPasswordControlName];

    if (!password || !confirmPassword) {
      return;
    }

    if (password.value !== confirmPassword.value) {
      confirmPassword.setErrors({ passwordsDontMatch: true });
    } else {
      confirmPassword.setErrors(null);
    }
  }
}
