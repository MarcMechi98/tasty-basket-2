import { Component, Input } from '@angular/core';

import { Order } from 'src/app/shared/models/order';

@Component({
  selector: 'app-order-items-list',
  templateUrl: './order-items-list.component.html',
  styleUrl: './order-items-list.component.scss'
})
export class OrderItemsListComponent {
  @Input() order!: Order;
}
