import { ActivatedRoute } from '@angular/router';
import { Component } from '@angular/core';

import { Food } from 'src/app/shared/models/food';
import { FoodService } from 'src/app/services/food.service';

@Component({
  selector: 'app-food-page',
  templateUrl: './food-page.component.html',
  styleUrls: ['./food-page.component.scss']
})
export class FoodPageComponent {

  food!: Food;

  constructor(
    activatedRoute: ActivatedRoute,
    foodService: FoodService,
  ) {
    activatedRoute.params.subscribe(params => {
      if (params['foodId']) {
        this.food = foodService.getFoodById(params['foodId']);
      }
    })
  }
}
