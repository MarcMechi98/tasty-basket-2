import { Component, OnInit } from '@angular/core';
import { Order } from './../../../shared/models/order';
import { Router } from '@angular/router';

import { OrderService } from 'src/app/services/order.service';

@Component({
  selector: 'app-payment-page',
  templateUrl: './payment-page.component.html',
  styleUrls: ['./payment-page.component.scss']
})
export class PaymentPageComponent implements OnInit {
  public order: Order = new Order();

  constructor(
    private orderService: OrderService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.orderService.getNewOrderForCurrentUser$().subscribe({
      next: order => this.order = order,
      error: () => {
        this.router.navigateByUrl('/checkout');
      },
    });
  }
}
