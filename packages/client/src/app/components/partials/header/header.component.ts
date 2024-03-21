import { Component, ElementRef, HostListener, OnInit, ViewChild } from '@angular/core';
import { faArrowRightFromBracket, faBars, faShoppingCart, faUser, faX } from '@fortawesome/free-solid-svg-icons';
import { NavigationEnd, Router } from '@angular/router';

import { CartService } from './../../../services/cart.service';
import { UserService } from 'src/app/services/user.service';
import { User } from 'src/app/shared/models/user';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  public cartQuantity = 0;
  public user!: User;
  public isInLoginPage = false;
  public isScrolledDown = false;
  public shouldShowDropdown = false;

  public faUser = faUser;
  public faArrowRightFromBracket = faArrowRightFromBracket;
  public faShoppingCart = faShoppingCart;
  public faBars = faBars;
  public faX = faX;

  @HostListener('window:scroll', [])
  onWindowScroll() {
    this.isScrolledDown = window.scrollY > 0;
  }

  @ViewChild('hamburgerMenu') hamburgerMenu!: ElementRef;

  constructor(
    private cartService: CartService,
    private userService: UserService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.cartService.getCartObservable().subscribe(newCart => {
      this.cartQuantity = newCart.totalCount
    });

    this.userService.user$.subscribe(user => this.user = user);

    this.router.events.subscribe(event => {
      if (event instanceof NavigationEnd) {
        this.isInLoginPage = event.url.includes('login');
      }
    })
  }

  get isLoggedIn(): boolean {
    return this.user?.token ? true : false;
  }

  public logout(): void {
    this.userService.logout();
  }

  public toggleMenu(): void {
    this.shouldShowDropdown = !this.shouldShowDropdown;
  }
}
