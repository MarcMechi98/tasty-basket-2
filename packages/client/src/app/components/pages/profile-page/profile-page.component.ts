import { Component, OnDestroy, OnInit } from '@angular/core';
import { faCartShopping, faEnvelope, faHeart, faMapMarkerAlt, faUser } from '@fortawesome/free-solid-svg-icons';
import { OrderService } from 'src/app/services/order.service';
import { UserService } from 'src/app/services/user.service';
import { User } from '../../../shared/models/user';
import { Food } from 'src/app/shared/models/food';
import { Order } from 'src/app/shared/models/order';
import { Subject, takeUntil } from 'rxjs';

@Component({
  selector: 'app-profile-page',
  templateUrl: './profile-page.component.html',
  styleUrl: './profile-page.component.scss',
})
export class ProfilePageComponent implements OnInit, OnDestroy {
  public user!: User;
  public favoriteFoods!: Food[];
  public lastOrder!: Order;
  private readonly unsubscribeAll$: Subject<void> = new Subject<void>();

  public faCartShopping = faCartShopping;
  public faHeart = faHeart;
  public faEnvelope = faEnvelope;
  public faUser = faUser;
  public faMapMarkerAlt = faMapMarkerAlt;

  constructor(
    private userService: UserService,
    private orderService: OrderService
  ) {}

  ngOnInit() {
    this.user = this.userService.currentUser;

    this.userService
      .getFavoritesFromUser$(this.user.id)
      .pipe(takeUntil(this.unsubscribeAll$))
      .subscribe((favorites) => {
        this.favoriteFoods = favorites;
      });

    this.orderService
      .getAllOrdersFromUser$(this.user.id)
      .pipe(takeUntil(this.unsubscribeAll$))
      .subscribe((orders) => {
        this.lastOrder = orders[0];
      });
  }

  ngOnDestroy() {
    this.unsubscribeAll$.next();
    this.unsubscribeAll$.complete();
  }
}
