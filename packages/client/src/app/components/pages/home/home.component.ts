import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { Food } from 'src/app/shared/models/food';
import { Tag } from 'src/app/shared/models/tags';
import { FoodService } from 'src/app/services/food.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent  {

  foods: Food[] = [];
  tags: Tag[] = [];

  constructor(
    private foodService: FoodService,
    activatedRoute: ActivatedRoute,
  ) {
    let foods$: Observable<Food[]>;

    activatedRoute.params.subscribe(params => {
      if (params['searchTerm']) {
        foods$ = this.foodService.getFoodsByName(params['searchTerm']);
      } else if (params['tag']) {
        foods$ = this.foodService.getFoodsByTag(params['tag']);
      } else {
        foods$ = this.foodService.getAllFoods();
      }

      foods$.subscribe(foods => this.foods = foods);
    });

  }
}
