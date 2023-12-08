import { Component } from '@angular/core';

import { FoodService } from 'src/app/services/food.service';
import { Tag } from 'src/app/shared/models/tags';

@Component({
  selector: 'app-tags',
  templateUrl: './tags.component.html',
  styleUrls: ['./tags.component.scss']
})
export class TagsComponent {
  tags?: Tag[];

  constructor(
    foodService: FoodService,
  ) {
    foodService.getAllTags().subscribe(tags => this.tags = tags);
  }
}
