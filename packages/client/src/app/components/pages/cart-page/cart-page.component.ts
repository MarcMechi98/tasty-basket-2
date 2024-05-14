import { AfterViewInit, Component, ElementRef, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { faCaretRight, faCaretLeft } from '@fortawesome/free-solid-svg-icons';

import { Cart } from 'src/app/shared/models/cart';
import { CartService } from 'src/app/services/cart.service';
import { CartItem } from 'src/app/shared/models/cart-item';
import { Subject, takeUntil } from 'rxjs';

@Component({
  selector: 'app-cart-page',
  templateUrl: './cart-page.component.html',
  styleUrl: './cart-page.component.scss'
})
export class CartPageComponent implements OnInit, OnDestroy {
  private readonly unsubscribeAll$ = new Subject<void>();
  public cart!: Cart;

  public readonly minimumQuantity = 1;
  public readonly maximumQuantity = 10;

  public faCaretLeft = faCaretLeft;
  public faCaretRight = faCaretRight;

  constructor(
    private cartService: CartService,
  ) {}

  ngOnInit(): void {
    this.cartService.getCartObservable$()
    .pipe(takeUntil(this.unsubscribeAll$))
    .subscribe(cart => {
      this.cart = cart;
    });
  }

  ngOnDestroy(): void {
    this.unsubscribeAll$.next();
    this.unsubscribeAll$.complete();
  }

  public removeFromCart(cartItem: CartItem): void {
    this.cartService.removeFoodFromCart(cartItem.food.id);
  }

  public increaseQuantity(cartItem: CartItem): void {
    if (cartItem.quantity === this.maximumQuantity) return;

    this.cartService.changeQuantity(cartItem.food.id, cartItem.quantity + 1);
  }

  public decreaseQuantity(cartItem: CartItem): void {
    if (cartItem.quantity === this.minimumQuantity) return;

    this.cartService.changeQuantity(cartItem.food.id, cartItem.quantity - 1);
  }
}
