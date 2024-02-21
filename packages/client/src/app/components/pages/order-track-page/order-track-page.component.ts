import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

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
    private router: Router,
    activatedRoute: ActivatedRoute,
  ) {
    const params = activatedRoute.snapshot.params;

    if (!params['orderId']) return;

    this.orderService.trackOrderById(params['orderId'])
      .subscribe(order => {
        this.order = order;
      });
  }

  public goToOrdersPage(): void {
    this.router.navigateByUrl('/orders');
  }
}
