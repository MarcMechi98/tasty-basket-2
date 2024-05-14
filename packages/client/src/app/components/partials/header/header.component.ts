import { AfterViewInit, Component, ElementRef, HostListener, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { faArrowRightFromBracket, faBars, faShoppingCart, faUser, faX } from '@fortawesome/free-solid-svg-icons';
import { NavigationEnd, Router } from '@angular/router';

import { CartService } from './../../../services/cart.service';
import { UserService } from 'src/app/services/user.service';
import { User } from 'src/app/shared/models/user';
import { Subject, fromEvent, takeUntil } from 'rxjs';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit, AfterViewInit, OnDestroy {

  private readonly unsubscribeAll = new Subject<void>();

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
  @ViewChild('dropdownHeader') dropdownHeader!: ElementRef;

  constructor(
    private cartService: CartService,
    private userService: UserService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.cartService.getCartObservable$()
      .pipe(takeUntil(this.unsubscribeAll))
      .subscribe(newCart => {
        this.cartQuantity = newCart.totalCount
      });

    this.userService.user$
      .pipe(takeUntil(this.unsubscribeAll))
      .subscribe(user => this.user = user);

    /* this.router.events
      .pipe(takeUntil(this.unsubscribeAll))
      .subscribe(event => {
        this.shouldShowDropdown = false;
        if (event instanceof NavigationEnd) {
          this.isInLoginPage = event.url.includes('login');
        }
      }) */
  }

  ngAfterViewInit(): void {
    fromEvent(document, 'click')
      .pipe(takeUntil(this.unsubscribeAll))
      .subscribe(({ target }) => {
        this.manageDropdown(target);
      });
  }

  private manageDropdown(targetClicked: any): void {
    const clickedHamburgerMenu = this.hamburgerMenu.nativeElement.contains(targetClicked);
    const clickedDropdownHeader = this.dropdownHeader.nativeElement.contains(targetClicked);

    if (clickedHamburgerMenu) {
      this.shouldShowDropdown = !this.shouldShowDropdown;
      return;
    }

    if (!clickedHamburgerMenu && !clickedDropdownHeader) {
      this.shouldShowDropdown = false;
      return;
    }
  }

  ngOnDestroy(): void {
    this.unsubscribeAll.next();
    this.unsubscribeAll.complete();
  }

  get isLoggedIn(): boolean {
    return this.user?.token ? true : false;
  }

  public logout(): void {
    this.userService.logout();
  }
}
