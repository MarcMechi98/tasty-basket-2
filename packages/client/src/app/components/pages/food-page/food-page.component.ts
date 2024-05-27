import { ActivatedRoute, Router } from '@angular/router';
import { Component, DestroyRef, OnInit } from '@angular/core';
import { Subject, switchMap, debounceTime } from 'rxjs';

import { Food } from 'src/app/shared/models/food';
import { FoodService } from 'src/app/services/food.service';
import { CartService } from 'src/app/services/cart.service';
import { UserService } from 'src/app/services/user.service';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';

@Component({
  selector: 'app-food-page',
  templateUrl: './food-page.component.html',
  styleUrls: ['./food-page.component.scss']
})
export class FoodPageComponent implements OnInit {
  private favoriteFoods: Food[] = [];
  private currentUserId!: string;
  private debounceClick = new Subject();
  public food!: Food;

  constructor(
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private foodService: FoodService,
    private userService: UserService,
    private cartService: CartService,
    private destroyRef: DestroyRef
  ) {}

  ngOnInit(): void {
    this.currentUserId = this.userService.currentUser.id;

    this.activatedRoute.params.pipe(
      switchMap(params => this.foodService.getFoodById(params['foodId'])),
      takeUntilDestroyed(this.destroyRef)
    ).subscribe(food => {
      this.food = food;

      if (!this.currentUserId) return;

      this.userService.getFavoritesFromUser$(this.currentUserId).subscribe(favorites => {
        this.favoriteFoods = favorites;
        this.updateFavoriteProperty();
      });
    });

    if (!this.currentUserId) return;

    this.debounceClick
    .pipe(
      takeUntilDestroyed(this.destroyRef),
      debounceTime(300)
    ).subscribe(() => {
      const action = this.food.isFavorite ? 'remove' : 'add';
      this.userService.updateFavorite$(this.currentUserId, this.food.id, action).subscribe(() => {
        this.food.isFavorite = !this.food.isFavorite;
      });
    });
  }

  private updateFavoriteProperty(): void {
    this.food.isFavorite = !!this.favoriteFoods.find(favoriteFood => favoriteFood.id === this.food.id);
  }

  public switchFavorite(): void {
    this.debounceClick.next({});
  }

  public addToCart(): void {
    this.cartService.addFoodToCart(this.food);
    this.router.navigateByUrl('/cart');
  }
}
