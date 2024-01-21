import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { RouterTestingModule } from '@angular/router/testing';

import { OrderItemsListComponent } from './order-items-list.component';
import { Order } from 'src/app/shared/models/order';

describe('OrderItemsListComponent', () => {
  let component: OrderItemsListComponent;
  let fixture: ComponentFixture<OrderItemsListComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [OrderItemsListComponent],
      imports: [RouterTestingModule],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OrderItemsListComponent);
    component = fixture.componentInstance;
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should display order items in the table', () => {
    const order: Order = {
      id: 1,
      items: [
        {
          food: {
            id: '1',
            name: 'Burger',
            price: 5,
            favorite: true,
            stars: 5,
            imageUrl: 'burger.jpg' ,
            origins: ['American'],
            cookingTime: '10 mins',
          },
          quantity: 2,
          price: 10
        },
        {
          food: {
            id: '2',
            name: 'Pizza',
            price: 8,
            favorite: false,
            stars: 4,
            imageUrl: 'pizza.jpg',
            origins: ['Italian'],
            cookingTime: '20 mins',
          },
          quantity: 1,
          price: 8
        },
      ],
      totalPrice: 18,
      name: 'John Doe',
      address: '123 Main St',
      paymentId: 'abc123',
      createdAt: '2020-01-01T00:00:00.000Z',
      status: 'pending',
    };

    component.order = order;
    fixture.detectChanges();

    const tableRows = fixture.debugElement.queryAll(By.css('table tr'));
    expect(tableRows.length).toBe(order.items.length + 2); // Header row + item rows + total row

    for (let i = 1; i <= order.items.length; i++) {
      const item = order.items[i - 1];
      const row = tableRows[i];

      expect(row.nativeElement.textContent).toContain(item.food.name);
      expect(row.nativeElement.textContent).toContain(item.food.price.toFixed(2));
      expect(row.nativeElement.textContent).toContain(item.quantity.toString());
      expect(row.nativeElement.textContent).toContain(item.price.toFixed(2));
    }

    const totalRow = tableRows[tableRows.length - 1];
    expect(totalRow.nativeElement.textContent).toContain('Total');
    expect(totalRow.nativeElement.textContent).toContain(order.totalPrice.toFixed(2));
  });
});
