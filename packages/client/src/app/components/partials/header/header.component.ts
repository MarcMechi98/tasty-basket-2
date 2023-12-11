import { Component } from '@angular/core';

import { CartService } from './../../../services/cart.service';
import { UserService } from 'src/app/services/user.service';
import { User } from 'src/app/shared/models/user';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent {
  cartQuantity: number = 0;
  user!: User;

  constructor(
    cartService: CartService,
    private userService: UserService
  ) {
    cartService.getCartObservable().subscribe(newCart => {
      this.cartQuantity = newCart.totalCount
    });

    userService.user$.subscribe(user => this.user = user);
  }

  get isLoggedIn(): boolean {
    return this.user?.token ? true : false;
  }

  logout(): void {
    this.userService.logout();
  }
}
