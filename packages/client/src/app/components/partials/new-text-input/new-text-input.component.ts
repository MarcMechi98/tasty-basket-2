import { Component, Input } from '@angular/core';
import { FormControl } from '@angular/forms';

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

  public isFocused = false;

  public onFocus(): void {
    this.isFocused = true;
  }

  public onBlur(): void {
    this.isFocused = false;
  }
}
