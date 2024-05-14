import { Component } from '@angular/core';
import { OrderService } from 'src/app/services/order.service';
import { UserService } from 'src/app/services/user.service';
import { Order } from 'src/app/shared/models/order';

@Component({
  selector: 'app-orders-page',
  templateUrl: './orders-page.component.html',
  styleUrl: './orders-page.component.scss'
})
export class OrdersPageComponent {

  public orders: Order[] = []

  constructor(
    private ordersService: OrderService,
    private userService: UserService
  ) {}

  ngOnInit(): void {
    const currentUserId = this.userService.currentUser.id

    this.ordersService.getAllOrdersFromUser$(currentUserId).subscribe(orders => {
      this.orders = orders
    })
  }
}
