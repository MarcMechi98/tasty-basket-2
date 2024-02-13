import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-not-found',
  templateUrl: './not-found.component.html',
  styleUrls: ['./not-found.component.scss']
})
export class NotFoundComponent {
  @Input() visible?: boolean = true;
  @Input() message?: string = 'Page not found :(';
  @Input() resetLinkText?: string = 'Go back to homepage';

  public goToHomePage(): void {
    window.location.href = '/';
  }
}
