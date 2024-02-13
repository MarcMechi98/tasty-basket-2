import { Component } from '@angular/core';

import { Cart } from 'src/app/shared/models/cart';
import { CartService } from 'src/app/services/cart.service';
import { CartItem } from 'src/app/shared/models/cart-item';
import { Router } from '@angular/router';

@Component({
  selector: 'app-cart-page',
  templateUrl: './cart-page.component.html',
  styleUrl: './cart-page.component.scss'
})
export class CartPageComponent {
  public cart!: Cart;

  constructor(
    private cartService: CartService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.cartService.getCartObservable().subscribe(cart => {
      this.cart = cart;
    });
  }

  public removeFromCart(cartItem: CartItem): void {
    this.cartService.removeFoodFromCart(cartItem.food.id);
  }

  public changeQuantity(cartItem: CartItem, quantity: number): void {
    this.cartService.changeQuantity(cartItem.food.id, quantity);
  }

  public convertToNumber(value: string): number {
    return parseInt(value);
  }

  public goToHomePage(): void {
    this.router.navigateByUrl('/')
  }
}
