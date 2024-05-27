import { Component, OnInit, DestroyRef } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { Food } from 'src/app/shared/models/food';
import { Tag } from 'src/app/shared/models/tags';
import { UserService } from './../../../services/user.service';
import { FoodService } from 'src/app/services/food.service';
import { Observable } from 'rxjs';
import { switchMap } from 'rxjs/operators';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  private foods$!: Observable<Food[]>;
  private favoriteFoods: Food[] = [];

  public foods: Food[] = [];
  public tags: Tag[] = [];

  constructor(
    private foodService: FoodService,
    private userService: UserService,
    private activatedRoute: ActivatedRoute,
    private destroyRef: DestroyRef
  ) {}

  ngOnInit() {
    const currentUserId = this.userService.currentUser.id;

    if (currentUserId) {
      this.userService.getFavoritesFromUser$(currentUserId)
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe(favorites => {
        this.favoriteFoods = favorites;
        this.updateFavoriteProperty();
      });
    }

    this.foods$ = this.activatedRoute.params
    .pipe(
      takeUntilDestroyed(this.destroyRef),
      switchMap(params => {
        if (params['searchTerm']) {
          return this.foodService.getFoodsByName(params['searchTerm']);
        } else if (params['tag']) {
          return this.foodService.getFoodsByTag(params['tag']);
        } else {
          return this.foodService.getAllFoods();
        }
      })
    )

    this.foods$
    .pipe(takeUntilDestroyed(this.destroyRef))
    .subscribe(foods => {
      this.foods = foods;
      this.updateFavoriteProperty();
    });
  }

  private updateFavoriteProperty(): void {
    this.foods.forEach(food => {
      food.isFavorite = !!this.favoriteFoods.find(favoriteFood => favoriteFood.id === food.id);
    });
  }
}
