import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-default-button',
  templateUrl: './default-button.component.html',
  styleUrl: './default-button.component.scss',
})
export class DefaultButtonComponent {
  @Input() type: 'submit' | 'button' = 'button';
  @Input() text: string = 'Submit';
  @Input() width = 'auto';
  @Input() fontSizeRem: number = 1.6;
  @Input() routerLink: string | null = null;

  @Output() buttonClick: EventEmitter<void> = new EventEmitter<void>();

  public onClick(): void {
    this.buttonClick.emit();
  }
}
