import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

import { Food } from '../shared/models/food';
import { Tag } from '../shared/models/tags';
import {
  ALL_FOODS_URL,
  FOODS_BY_SEARCH_TERM_URL,
  FOODS_BY_TAG,
  ALL_TAGS_URL,
  FOOD_BY_ID_URL
} from '../shared/constants/urls';

@Injectable({
  providedIn: 'root'
})
export class FoodService {
  constructor(
    private http: HttpClient
  ) { }

  public getAllFoods(): Observable<Food[]> {
    return this.http.get<Food[]>(ALL_FOODS_URL);
  }

  public getFoodsByName(searchTerm: string): Observable<Food[]> {
    return this.http.get<Food[]>(FOODS_BY_SEARCH_TERM_URL + searchTerm);
  }

  public getAllTags(): Observable<Tag[]> {
    return this.http.get<Tag[]>(ALL_TAGS_URL);
  }

  public getFoodsByTag(tagName: string): Observable<Food[]> {
    if (tagName === 'All') {
      return this.getAllFoods();
    } else {
      return this.http.get<Food[]>(FOODS_BY_TAG + tagName);
    }
  }

  public getFoodById(foodId: string): Observable<Food> {
    return this.http.get<Food>(FOOD_BY_ID_URL + foodId);
  }
}
