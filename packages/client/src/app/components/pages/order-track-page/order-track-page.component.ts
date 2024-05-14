import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { Order } from 'src/app/shared/models/order';
import { OrderService } from 'src/app/services/order.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-order-track-page',
  templateUrl: './order-track-page.component.html',
  styleUrl: './order-track-page.component.scss'
})
export class OrderTrackPageComponent implements OnInit {
  public order$!: Observable<Order>;

  constructor(
    private orderService: OrderService,
    private activatedRoute: ActivatedRoute,
  ) {}

  ngOnInit(): void {
    const params = this.activatedRoute.snapshot.params;

    if (!params['orderId']) return;

    this.order$ = this.orderService.trackOrderById$(params['orderId'])
  }
}
