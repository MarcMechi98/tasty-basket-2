import { AfterViewInit, Component, DestroyRef, ElementRef, HostListener, OnInit, ViewChild } from '@angular/core';
import { faArrowRightFromBracket, faBars, faShoppingCart, faUser, faX } from '@fortawesome/free-solid-svg-icons';

import { CartService } from './../../../services/cart.service';
import { UserService } from 'src/app/services/user.service';
import { User } from 'src/app/shared/models/user';
import { fromEvent } from 'rxjs';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit, AfterViewInit {
  public cartQuantity = 0;
  public user!: User;
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
    private destroyRef: DestroyRef,
  ) {}

  ngOnInit(): void {
    this.cartService.getCartObservable$()
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe(newCart => {
        this.cartQuantity = newCart.totalCount
      });

    this.userService.user$
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe((user) => (this.user = user));
  }

  ngAfterViewInit(): void {
    fromEvent(document, 'click')
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

  get isLoggedIn(): boolean {
    return this.user?.token ? true : false;
  }

  public logout(): void {
    this.userService.logout();
  }
}
