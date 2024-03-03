import { Component, OnInit } from '@angular/core';
import { faCartShopping, faEnvelope, faHeart } from '@fortawesome/free-solid-svg-icons';
import { UserService } from 'src/app/services/user.service';
import { Food } from 'src/app/shared/models/food';

@Component({
  selector: 'app-profile-page',
  templateUrl: './profile-page.component.html',
  styleUrl: './profile-page.component.scss'
})
export class ProfilePageComponent implements OnInit{
  faCartShopping = faCartShopping
  faHeart = faHeart
  faEnvelope = faEnvelope
  public user: any = {}
  public favoriteFoods: Food[] = []

  constructor(
    private userService: UserService,
  ) {}

  ngOnInit() {
    this.user = {
      name: 'Marcelo',
      email: 'oi@gmail.com',
      address: 'Rua 1, 123',
    }

    const currentUserId = this.userService.currentUser.id;

    this.userService.getFavoritesFromUser(currentUserId).subscribe(favorites => {
      this.favoriteFoods = favorites;
    });
  }
}
