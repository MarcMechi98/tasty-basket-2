import { Component, Input, OnChanges, OnInit } from '@angular/core';
import { AbstractControl } from '@angular/forms';

const VALIDATION_ERROR_MESSAGES: any = {
  required: 'Should not be empty',
  email: 'Email is not valid',
  minlength: 'Should be at least 8 characters',
  maxlength: 'Should be less than 20 characters',
  passwordsDontMatch: 'Passwords do not match'
}

@Component({
  selector: 'app-input-validation',
  templateUrl: './input-validation.component.html',
  styleUrl: './input-validation.component.scss'
})
export class InputValidationComponent implements OnInit, OnChanges{
  @Input() control!: AbstractControl;
  @Input() shouldDisplayError!: boolean;

  public errorMessages: string[] = [];

  ngOnChanges(changes: any): void {
    this.checkValidation();
  }

  ngOnInit(): void {
    this.control.statusChanges.subscribe(() => {
      this.checkValidation();
    });

    this.control.valueChanges.subscribe(() => {
      this.checkValidation();
    });
  }

  checkValidation(): void {
    const errors = this.control.errors;

    if (!errors) {
      this.errorMessages = [];
      return;
    }

    const errorKeys = Object.keys(errors);
    this.errorMessages = errorKeys.map(key => VALIDATION_ERROR_MESSAGES[key]);
  }
}
