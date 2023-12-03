import { Component } from '@angular/core';

import { Cart } from 'src/app/shared/models/cart';
import { CartService } from 'src/app/services/cart.service';
import { CartItem } from 'src/app/shared/models/cart-item';

@Component({
  selector: 'app-cart-page',
  templateUrl: './cart-page.component.html',
  styleUrls: ['./cart-page.component.scss']
})
export class CartPageComponent {

  cart!: Cart;

  constructor(
    private cartService: CartService,
  ) {
    this.cartService.getCartObservable().subscribe(cart => {
      this.cart = cart;
    });
  }

  removeFromCart(cartItem: CartItem): void {
    this.cartService.removeFoodFromCart(cartItem.food.id);
  }

  changeQuantity(cartItem: CartItem, quantity: number): void {
    this.cartService.changeQuantity(cartItem.food.id, quantity);
  }

  convertToNumber(value: string): number {
    return parseInt(value);
  }
}
