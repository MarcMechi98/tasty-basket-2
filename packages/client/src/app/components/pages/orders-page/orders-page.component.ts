import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subject, takeUntil } from 'rxjs';
import { OrderService } from 'src/app/services/order.service';
import { UserService } from 'src/app/services/user.service';
import { Order } from 'src/app/shared/models/order';

@Component({
  selector: 'app-orders-page',
  templateUrl: './orders-page.component.html',
  styleUrl: './orders-page.component.scss'
})
export class OrdersPageComponent implements OnInit, OnDestroy {
  private readonly unsubscribeAll$ = new Subject<void>();
  public organizedOrders: Order[] = [];

  constructor(
    private ordersService: OrderService,
    private userService: UserService
  ) {}

  ngOnInit(): void {
    const currentUserId = this.userService.currentUser.id

    this.ordersService.getAllOrdersFromUser$(currentUserId)
    .pipe(takeUntil(this.unsubscribeAll$))
    .subscribe(orders => {
      this.organizedOrders = this.organizeOrdersFromNewestToOldest(orders);
    })
  }

  ngOnDestroy(): void {
    this.unsubscribeAll$.next();
    this.unsubscribeAll$.complete();
  }

  private organizeOrdersFromNewestToOldest(orders: Order[]): Order[] {
    return orders.sort((a, b) => {
      return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
    })
  }
}
