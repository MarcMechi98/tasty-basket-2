import { Component, ElementRef, Input, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

import { CartService } from 'src/app/services/cart.service';
import { OrderService } from 'src/app/services/order.service';
import { Order } from 'src/app/shared/models/order';

/* window.paypal */
declare var paypal: any;

@Component({
  selector: 'app-paypal-button',
  templateUrl: './paypal-button.component.html',
  styleUrl: './paypal-button.component.scss'
})
export class PaypalButtonComponent implements OnInit{
  @Input() order!: Order;
  @ViewChild('paypal', { static: true }) paypalElement!: ElementRef;

  constructor(
    private orderService: OrderService,
    private cartService: CartService,
    private router: Router,
    private toastrService: ToastrService
  ) { }

  ngOnInit(): void {
    paypal
    .Buttons({
      createOrder: (data: any, actions: any) => {
        return actions.order.create({
          purchase_units: [
            {
              amount: {
                currency_code: 'USD',
                value: this.order.totalPrice,
              },
            },
          ],
        });
      },

      onApprove: async (data: any, actions: any) => {
        const payment = await actions.order.capture();
        this.order.paymentId = payment.id;
        this.orderService.pay$(this.order).subscribe(
          {
            next: (orderId) => {
              this.cartService.clearCart();
              this.router.navigateByUrl('/orders/' + orderId);
              this.toastrService.success(
                'Payment successful',
                'Success'
              );
            },
            error: (error) => {
              this.toastrService.error('Payment failed', 'Payment Error');
            }
          }
        );
      },

      onError: (err: any) => {
        this.toastrService.error('Payment failed', 'Payment Error');
        console.error(err);
      },
    })
    .render(this.paypalElement.nativeElement);
  }
}
