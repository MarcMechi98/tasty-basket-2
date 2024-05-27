import { Component, DestroyRef, OnInit } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { OrderService } from 'src/app/services/order.service';
import { UserService } from 'src/app/services/user.service';
import { Order } from 'src/app/shared/models/order';

@Component({
  selector: 'app-orders-page',
  templateUrl: './orders-page.component.html',
  styleUrl: './orders-page.component.scss'
})
export class OrdersPageComponent implements OnInit {
  public organizedOrders: Order[] = [];

  constructor(
    private ordersService: OrderService,
    private userService: UserService,
    private destroyRef: DestroyRef
  ) {}

  ngOnInit(): void {
    const currentUserId = this.userService.currentUser.id

    this.ordersService.getAllOrdersFromUser$(currentUserId)
    .pipe(takeUntilDestroyed(this.destroyRef))
    .subscribe(orders => {
      this.organizedOrders = this.organizeOrdersFromNewestToOldest(orders);
    })
  }

  private organizeOrdersFromNewestToOldest(orders: Order[]): Order[] {
    return orders.sort((a, b) => {
      return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
    })
  }
}
