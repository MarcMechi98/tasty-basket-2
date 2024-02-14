import { Component } from '@angular/core';

@Component({
  selector: 'app-orders-page',
  templateUrl: './orders-page.component.html',
  styleUrl: './orders-page.component.scss'
})
export class OrdersPageComponent {
  public orders = [{id: 3213123131, date: '10/01/1998', address: 'Orozimbo', status: 'pending'}, {id: 2312414124, date: '10/01/1998', address: 'Nova York', status: 'delivered'}]

  constructor() {}
}
