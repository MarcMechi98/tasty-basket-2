import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-title',
  templateUrl: './title.component.html',
  styleUrls: ['./title.component.scss']
})
export class TitleComponent {
  @Input() title!: string;
  @Input() margin?: string = '1rem 0 1 rem .2rem';
  @Input() fontSize?: string = '1.7rem';

  constructor() { }
}
