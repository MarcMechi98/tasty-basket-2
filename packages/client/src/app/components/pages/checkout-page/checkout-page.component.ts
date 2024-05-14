import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Subject, takeUntil } from 'rxjs';
import { CartService } from 'src/app/services/cart.service';
import { OrderService } from 'src/app/services/order.service';
import { UserService } from 'src/app/services/user.service';

import { Order } from 'src/app/shared/models/order';

@Component({
  selector: 'app-checkout-page',
  templateUrl: './checkout-page.component.html',
  styleUrl: './checkout-page.component.scss'
})
export class CheckoutPageComponent implements OnInit, OnDestroy {
  private readonly unsubscribeAll$ = new Subject<void>();
  public order: Order = new Order();
  public checkoutForm!: FormGroup;
  public nameInputFocused = false;
  public addressInputFocused = false;

  constructor(
    cartService: CartService,
    private fb: FormBuilder,
    private userService: UserService,
    private orderService: OrderService,
    private toastrService: ToastrService,
    private router: Router
  ) {
    const cart = cartService.getCart();
    this.order.items = cart.items;
    this.order.totalPrice = cart.totalPrice;
  }

  ngOnInit(): void {
    let { name, address } = this.userService.currentUser;

    this.checkoutForm = this.fb.group({
      name: [name, Validators.required],
      address: [address, Validators.required]
    });
  }

  ngOnDestroy(): void {
    this.unsubscribeAll$.next();
    this.unsubscribeAll$.complete();
  }

  get nameFormControl(): FormControl {
    return this.checkoutForm.get('name') as FormControl;
  }

  get addressFormControl(): FormControl {
    return this.checkoutForm.get('address') as FormControl;
  }

  public createOrder(): void {
    if (this.checkoutForm.invalid) {
      this.toastrService.warning('Please answer all required fields', 'Warning');
      return;
    }

    if (!this.order.addressLatLng) {
      this.toastrService.warning('Please find you location on the map', 'Warning');
      return;
    }

    this.order.name = this.nameFormControl.value;
    this.order.address = this.addressFormControl.value;

    this.orderService.create$(this.order)
    .pipe(takeUntil(this.unsubscribeAll$))
    .subscribe({
      next: () => {
        this.router.navigateByUrl('/payment');
      },
      error: (err) => {
        this.toastrService.error(err.error.message, 'Cart Error');
      }
    });
  }
}
