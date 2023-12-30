import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { CartService } from 'src/app/services/cart.service';
import { UserService } from 'src/app/services/user.service';

import { Order } from 'src/app/shared/models/order';

@Component({
  selector: 'app-checkout-page',
  templateUrl: './checkout-page.component.html',
  styleUrl: './checkout-page.component.scss'
})
export class CheckoutPageComponent implements OnInit {
  order: Order = new Order();
  checkoutForm!: FormGroup;

  constructor(
    cartService: CartService,
    private fb: FormBuilder,
    private userService: UserService,
    private toastrService: ToastrService,
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

  get fc() {
    return this.checkoutForm.controls;
  }

  createOrder(): void {
    if (this.checkoutForm.invalid) {
      this.toastrService.warning('Please fill in all fields', 'Warning');
      return;
    }

    this.order.name = this.fc['name'].value;
    this.order.address = this.fc['address'].value;

    this.toastrService.success('Order created successfully', 'Success');
  }
}
