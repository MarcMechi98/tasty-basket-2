import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Router } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { of, throwError } from 'rxjs';

import { OrderService } from 'src/app/services/order.service';
import { Order } from './../../../shared/models/order';
import { PaymentPageComponent } from './payment-page.component';
import { TitleComponent } from '../../partials/title/title.component';
import { OrderItemsListComponent } from '../../partials/order-items-list/order-items-list.component';
import { PaypalButtonComponent } from '../../partials/paypal-button/paypal-button.component';
import { MapComponent } from '../../partials/map/map.component';
import { ToastrModule } from 'ngx-toastr';

describe('PaymentPageComponent', () => {
  let component: PaymentPageComponent;
  let fixture: ComponentFixture<PaymentPageComponent>;
  let orderServiceSpy: jasmine.SpyObj<OrderService>;
  let routerSpy: jasmine.SpyObj<Router>;

  beforeEach(async () => {
    const orderServiceSpyObj = jasmine.createSpyObj('OrderService', ['getNewOrderForCurrentUser']);
    orderServiceSpyObj.getNewOrderForCurrentUser.and.returnValue(of(new Order()));

    const routerSpyObj = jasmine.createSpyObj('Router', ['navigateByUrl']);

    await TestBed.configureTestingModule({
      declarations: [PaymentPageComponent, TitleComponent, OrderItemsListComponent, PaypalButtonComponent, MapComponent],
      imports: [RouterTestingModule, ToastrModule.forRoot()],
      providers: [
        { provide: OrderService, useValue: orderServiceSpyObj },
        { provide: Router, useValue: routerSpyObj }
      ]
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PaymentPageComponent);
    component = fixture.componentInstance;
    orderServiceSpy = TestBed.inject(OrderService) as jasmine.SpyObj<OrderService>;
    routerSpy = TestBed.inject(Router) as jasmine.SpyObj<Router>;
    fixture.detectChanges();
  });

  it('should create', () => {
    component.ngOnInit();
    expect(component).toBeTruthy();
  });

  it('should fetch order on initialization', () => {
    const mockOrder: Order = {
      id: 1,
      name: 'Test Order',
      address: 'Test Address',
      items: [],
      totalPrice: 0,
      paymentId: 'Test Payment ID',
      createdAt: 'Test Date',
      status: 'Test Status'
    };
    orderServiceSpy.getNewOrderForCurrentUser.and.returnValue(of(mockOrder));

    component.ngOnInit();

    expect(component.order).toEqual(mockOrder);
  });

  it('should redirect to checkout on error', () => {
    orderServiceSpy.getNewOrderForCurrentUser.and.returnValue(throwError('Test Error'));

    component.ngOnInit();

    expect(routerSpy.navigateByUrl).toHaveBeenCalledWith('/checkout');
  });
});
