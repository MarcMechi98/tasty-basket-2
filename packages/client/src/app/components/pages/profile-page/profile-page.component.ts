import { Component, OnInit } from '@angular/core';
import { faCartShopping, faEnvelope, faHeart, faMapMarkerAlt } from '@fortawesome/free-solid-svg-icons';
import { OrderService } from 'src/app/services/order.service';
import { UserService } from 'src/app/services/user.service';
import { Food } from 'src/app/shared/models/food';
import { Order } from 'src/app/shared/models/order';

@Component({
  selector: 'app-profile-page',
  templateUrl: './profile-page.component.html',
  styleUrl: './profile-page.component.scss'
})
export class ProfilePageComponent implements OnInit{
  faCartShopping = faCartShopping
  faHeart = faHeart
  faEnvelope = faEnvelope
  faMapMarkerAlt = faMapMarkerAlt
  public user: any = {}
  public favoriteFoods: Food[] = []
  public lastOrder!: Order

  constructor(
    private userService: UserService,
    private orderService: OrderService,
  ) {}

  ngOnInit() {
    this.user = {
      name: 'Marcelo',
      email: 'oi@gmail.com',
      address: 'Rua 1, 123',
    }

    const currentUserId = this.userService.currentUser.id;

    this.userService.getFavoritesFromUser$(currentUserId).subscribe(favorites => {
      this.favoriteFoods = favorites;
    });

    this.orderService.getAllOrdersFromUser$(currentUserId).subscribe(orders => {
      this.lastOrder = orders[0];
      console.log(this.lastOrder);
    });
  }
}
