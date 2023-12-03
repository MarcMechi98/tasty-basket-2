import { Component } from '@angular/core';

import { CartService } from './../../../services/cart.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent {
  cartQuantity: number = 0;

  constructor(
    cartService: CartService
  ) {
    cartService.getCartObservable().subscribe(newCart => {
      this.cartQuantity = newCart.totalCount
    });
  }
}
