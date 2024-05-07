import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormControl } from '@angular/forms';
import { faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-new-text-input',
  templateUrl: './new-text-input.component.html',
  styleUrl: './new-text-input.component.scss',
})
export class NewTextInputComponent implements OnInit {
  @Input() public label: string = '';
  @Input() public control!: FormControl<string>;
  @Input() public type: string = 'text';
  @Input() public displayEye: boolean = false;
  @Input() public displayAsterisk: boolean = false;

  @Output() eyeIconClicked: EventEmitter<void> = new EventEmitter<void>();

  public isFocused = false;
  public faEye = faEye;
  public faEyeSlash = faEyeSlash;

  private readonly errorMessages: { [key: string]: string } = {
    required: 'This field is required',
    email: 'Invalid email address',
    minlength: 'Password must be at least 8 characters long',
    maxlength: 'Password must be at most 20 characters long',
    passwordsDontMatch: 'Passwords must match',
  };

  public errorToBeDisplayed: string = '';

  ngOnInit(): void {
    this.control.statusChanges.subscribe(() => {
      this.errorToBeDisplayed = this.control.errors
        ? this.errorMessages[Object.keys(this.control.errors)[0]]
        : '';
    });
  }

  public onFocus(): void {
    this.isFocused = true;
  }

  public onBlur(): void {
    this.isFocused = false;
  }

  public onEyeIconClick(): void {
    this.eyeIconClicked.emit();
  }
}
