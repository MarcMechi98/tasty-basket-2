import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { HeaderComponent } from './header.component';
import { HttpClientModule } from '@angular/common/http';
import { ToastrModule } from 'ngx-toastr';

import { CartService } from './../../../services/cart.service';
import { UserService } from 'src/app/services/user.service';
import { User } from 'src/app/shared/models/user';

describe('HeaderComponent', () => {
  let component: HeaderComponent;
  let fixture: ComponentFixture<HeaderComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [HeaderComponent],
      providers: [CartService, UserService],
      imports: [HttpClientModule, ToastrModule.forRoot()]
    });

    fixture = TestBed.createComponent(HeaderComponent);
    component = fixture.componentInstance;
  });

  it('should create the header component', () => {
    expect(component).toBeTruthy();
  });

  it('should display the correct links based on user login status', () => {
    component.user = new User();
    fixture.detectChanges();
    let loginLink = fixture.nativeElement.querySelector('a[routerLink="/login"]');
    let dashboardLink = fixture.nativeElement.querySelector('a[routerLink="/dashboard"]');

    expect(loginLink).toBeTruthy();
    expect(dashboardLink).toBeFalsy();

    component.user = {
      name: 'John Doe',
      token: 'sampleToken',
      id: '12312321',
      email: 'test@gmail.com',
      password: 'test',
      address: 'Brazil',
      isAdmin: false
    };
    fixture.detectChanges();
    loginLink = fixture.nativeElement.querySelector('a[routerLink="/login"]');
    dashboardLink = fixture.nativeElement.querySelector('a[routerLink="/dashboard"]');

    expect(loginLink).toBeFalsy();
    expect(dashboardLink).toBeTruthy();
  });
});
