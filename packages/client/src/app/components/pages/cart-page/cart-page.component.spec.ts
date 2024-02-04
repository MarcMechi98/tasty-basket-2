import { ComponentFixture, TestBed } from '@angular/core/testing';
import { of } from 'rxjs';

import { Food } from 'src/app/shared/models/food';
import { Cart } from 'src/app/shared/models/cart';
import { CartItem } from 'src/app/shared/models/cart-item';
import { CartService } from 'src/app/services/cart.service';
import { CartPageComponent } from './cart-page.component';
import { TitleComponent } from '../../partials/title/title.component';
import { NotFoundComponent } from '../../partials/not-found/not-found.component';

describe('CartPageComponent', () => {
  let component: CartPageComponent;
  let fixture: ComponentFixture<CartPageComponent>;
  let cartService: jasmine.SpyObj<CartService>;  // Use only one spy object

  const foodItem: Food = {
    id: '1',
    name: 'Test Food',
    price: 10,
    favorite: false,
    stars: 3,
    imageUrl: 'test.jpg',
    origins: ['Test'],
    cookingTime: '10 min'
  };

  const mockCartItem: CartItem = new CartItem(foodItem);

  beforeEach(() => {
    cartService = jasmine.createSpyObj('CartService', ['getCartObservable', 'removeFoodFromCart', 'changeQuantity']);

    TestBed.configureTestingModule({
      declarations: [CartPageComponent, TitleComponent, NotFoundComponent],
      providers: [{ provide: CartService, useValue: cartService }],
    });

    fixture = TestBed.createComponent(CartPageComponent);
    component = fixture.componentInstance;

    const mockCart: Cart = { items: [], totalCount: 0, totalPrice: 0 };
    const cartObservable = of(mockCart);
    cartService.getCartObservable.and.returnValue(cartObservable);
  });

  it('should create the component and subscribe to cart updates', () => {
    component.ngOnInit();

    expect(component).toBeTruthy();
    expect(cartService.getCartObservable).toHaveBeenCalled();
  });

  it('should remove item from cart', () => {
    const removeFoodFromCartSpy = cartService.removeFoodFromCart;
    component.removeFromCart(mockCartItem);

    expect(removeFoodFromCartSpy).toHaveBeenCalledWith(mockCartItem.food.id);
  });

  it('should change quantity in cart', () => {
    const changeQuantitySpy = cartService.changeQuantity;
    const newQuantity = 3;
    component.changeQuantity(mockCartItem, newQuantity);

    expect(changeQuantitySpy).toHaveBeenCalledWith(mockCartItem.food.id, newQuantity);
  });
});
