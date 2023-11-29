import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { Food } from 'src/app/shared/models/food';
import { Tag } from 'src/app/shared/models/tags';
import { FoodService } from 'src/app/services/food.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  foods: Food[] = [];
  tags: Tag[] = [];

  constructor(
    private foodService: FoodService,
    private activatedRoute: ActivatedRoute,
  ) {
    this.activatedRoute.params.subscribe(params => {
      if (params['searchTerm']) {
        this.foods = this.foodService.getFoodsByName(params['searchTerm']);
      } else {
        this.foods = this.foodService.getAllFoods();
      }

      if (params['tag']) {
        this.foods = this.foodService.getFoodsByTag(params['tag']);
      }
    });
  }

  ngOnInit(): void {
  }
}
