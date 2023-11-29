import { Injectable } from '@angular/core';

import { Food } from '../shared/models/food';
import { Tag } from '../shared/models/tags';
import { sample_foods, sample_tags } from 'src/data';

@Injectable({
  providedIn: 'root'
})
export class FoodService {

  constructor() { }

  getAllFoods(): Food[] {
    return sample_foods;
  }

  getFoodsByName(searchTerm: string): Food[] {
    return this.getAllFoods().filter(food => food.name.toLowerCase().includes(searchTerm.toLowerCase()));
  }

  getAllTags(): Tag[] {
    return sample_tags;
  }

  getFoodsByTag(tagName: string): Food[] {
    return tagName === 'All' ?
    this.getAllFoods() : this.getAllFoods().filter(food => food.tags?.includes(tagName));
  }
}
