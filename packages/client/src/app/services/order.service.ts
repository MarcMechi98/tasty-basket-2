import { Injectable } from '@angular/core';

import { Order } from '../shared/models/order';
import { HttpClient } from '@angular/common/http';
import { CREATE_ORDER_URL } from '../shared/constants/urls';

@Injectable({
  providedIn: 'root'
})
export class OrderService {

  constructor(
    private http: HttpClient,
  ) { }

  create(order: Order) {
    return this.http.post<Order>(CREATE_ORDER_URL, order);
  }
}
