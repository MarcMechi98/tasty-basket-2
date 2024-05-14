import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

import { Food } from '../shared/models/food';
import { Cart } from '../shared/models/cart';
import { CartItem } from './../shared/models/cart-item';

@Injectable({
  providedIn: 'root',
})
export class CartService {
  private cart: Cart = this.getCartFromLocalStorage();
  private cartSubject$: BehaviorSubject<Cart> = new BehaviorSubject(this.cart);

  constructor() {}

  public addFoodToCart(food: Food): void {
    let cartItem = this.cart.items.find((item) => item.food.id === food.id);

    if (cartItem) {
      this.changeQuantity(food.id, cartItem.quantity + 1);
      return;
    }

    this.cart.items.push(new CartItem(food));
    this.setCartToLocalStorage();
  }

  public removeFoodFromCart(foodId: string): void {
    let cartItem = this.cart.items.find((item) => item.food.id === foodId);

    if (!cartItem) {
      return;
    }

    this.cart.items = this.cart.items.filter((item) => item.food.id !== foodId);
    this.setCartToLocalStorage();
  }

  public changeQuantity(foodId: string, quantity: number): void {
    let cartItem = this.cart.items.find((item) => item.food.id === foodId);

    if (!cartItem) {
      return;
    }

    cartItem.quantity = quantity;
    cartItem.price = cartItem.food.price * quantity;
    this.setCartToLocalStorage();
  }

  public clearCart(): void {
    this.cart = new Cart();
    this.setCartToLocalStorage();
  }

  public getCartObservable$(): Observable<Cart> {
    return this.cartSubject$.asObservable();
  }

  public getCart(): Cart {
    return this.cartSubject$.value;
  }

  private setCartToLocalStorage(): void {
    this.cart.totalPrice = this.cart.items.reduce(
      (total, item) => total + item.price,
      0
    );
    this.cart.totalCount = this.cart.items.reduce(
      (total, item) => total + item.quantity,
      0
    );

    localStorage.setItem('Cart', JSON.stringify(this.cart));
    this.cartSubject$.next(this.cart);
  }

  private getCartFromLocalStorage(): Cart {
    let cartJson = localStorage.getItem('Cart');
    return cartJson ? JSON.parse(cartJson) : new Cart();
  }
}
