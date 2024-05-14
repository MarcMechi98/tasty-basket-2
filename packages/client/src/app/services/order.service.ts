import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { Order } from '../shared/models/order';
import { HttpClient } from '@angular/common/http';
import { ALL_ORDERS_FOR_USER_URL, CREATE_ORDER_URL, GET_ORDER_FOR_CURRENT_USER_URL, ORDER_PAY_URL, ORDER_TRACK_URL } from '../shared/constants/urls';

@Injectable({
  providedIn: 'root'
})
export class OrderService {
  constructor(
    private http: HttpClient,
  ) { }

  public create$(order: Order): Observable<Order> {
    return this.http.post<Order>(CREATE_ORDER_URL, order);
  }

  public getNewOrderForCurrentUser$(): Observable<Order> {
    return this.http.get<Order>(GET_ORDER_FOR_CURRENT_USER_URL);
  }

  public pay$(order: Order): Observable<string> {
    return this.http.post<string>(ORDER_PAY_URL, order);
  }

  public trackOrderById$(id: string): Observable<Order> {
    return this.http.get<Order>(ORDER_TRACK_URL + id);
  }

  public getAllOrdersFromUser$(userId: string): Observable<Order[]> {
    return this.http.get<Order[]>(ALL_ORDERS_FOR_USER_URL + userId);
  }
}
