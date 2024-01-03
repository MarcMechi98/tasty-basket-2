import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { Order } from '../shared/models/order';
import { HttpClient } from '@angular/common/http';
import { CREATE_ORDER_URL, GET_ORDER_FOR_CURRENT_USER_URL } from '../shared/constants/urls';

@Injectable({
  providedIn: 'root'
})
export class OrderService {

  constructor(
    private http: HttpClient,
  ) { }

  create(order: Order): Observable<Order> {
    return this.http.post<Order>(CREATE_ORDER_URL, order);
  }

  getNewOrderForCurrentUser(): Observable<Order> {
    return this.http.get<Order>(GET_ORDER_FOR_CURRENT_USER_URL);
  }
}
