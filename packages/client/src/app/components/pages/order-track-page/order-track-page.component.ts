import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Order } from 'src/app/shared/models/order';

import { OrderService } from 'src/app/services/order.service';

@Component({
  selector: 'app-order-track-page',
  templateUrl: './order-track-page.component.html',
  styleUrl: './order-track-page.component.scss'
})
export class OrderTrackPageComponent {

  order!: Order;

  constructor(
    private orderService: OrderService,
    activatedRoute: ActivatedRoute,
  ) {
    const params = activatedRoute.snapshot.params;

    if (!params['orderId']) return;

    this.orderService.trackOrderById(params['orderId'])
      .subscribe(order => {
        this.order = order;
      });
  }
}
