import { Component, Input } from '@angular/core';
import { Order } from 'src/app/shared/models/order';

@Component({
  selector: 'app-orders-list',
  templateUrl: './orders-list.component.html',
  styleUrl: './orders-list.component.scss'
})
export class OrdersListComponent {

  @Input() orders: any[] = [];
}
