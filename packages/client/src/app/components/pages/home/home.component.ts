import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { Food } from 'src/app/shared/models/food';
import { Tag } from 'src/app/shared/models/tags';
import { UserService } from './../../../services/user.service';
import { FoodService } from 'src/app/services/food.service';
import { Observable, Subject } from 'rxjs';
import { switchMap, takeUntil } from 'rxjs/operators';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit, OnDestroy {

  private foods$!: Observable<Food[]>;
  private unsubscribeAll: Subject<void> = new Subject<void>();
  private favoriteFoods: Food[] = [];

  public foods: Food[] = [];
  public tags: Tag[] = [];

  constructor(
    private foodService: FoodService,
    private userService: UserService,
    private activatedRoute: ActivatedRoute
  ) {}

  ngOnInit() {
    const currentUserId = this.userService.currentUser.id;

    if (currentUserId) {
      this.userService.getFavoritesFromUser$(currentUserId).subscribe(favorites => {
        this.favoriteFoods = favorites;
        this.updateFavoriteProperty();
      });
    }

    this.foods$ = this.activatedRoute.params.pipe(
      takeUntil(this.unsubscribeAll),
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

    this.foods$.subscribe(foods => {
      this.foods = foods;
      this.updateFavoriteProperty();
    });
  }

  ngOnDestroy() {
    this.unsubscribeAll.next();
    this.unsubscribeAll.complete();
  }

  private updateFavoriteProperty(): void {
    this.foods.forEach(food => {
      food.isFavorite = !!this.favoriteFoods.find(favoriteFood => favoriteFood.id === food.id);
    });
  }
}
