import { Component } from '@angular/core';
import { faFacebook, faInstagram, faXTwitter } from '@fortawesome/free-brands-svg-icons';
import { faBasketShopping } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrl: './footer.component.scss'
})
export class FooterComponent {
  public faInstagram = faInstagram
  public faXTwitter = faXTwitter
  public faFacebook = faFacebook
  public faBasketShopping = faBasketShopping
}
