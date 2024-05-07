import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormControl } from '@angular/forms';
import { faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-new-text-input',
  templateUrl: './new-text-input.component.html',
  styleUrl: './new-text-input.component.scss',
})
export class NewTextInputComponent {
  @Input() public label: string = '';
  @Input() public control!: FormControl<string>;
  @Input() public type: string = 'text';
  @Input() public errorMessage: string = '';
  @Input() public displayEye: boolean = false;

  @Output() eyeIconClicked: EventEmitter<void> = new EventEmitter<void>();

  public isFocused = false;
  public faEye = faEye;
  public faEyeSlash = faEyeSlash;

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
