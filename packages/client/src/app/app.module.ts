import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule, HTTP_INTERCEPTORS} from '@angular/common/http';
import { ReactiveFormsModule } from '@angular/forms';
import { ToastrModule } from 'ngx-toastr';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

import { AppComponent } from './app.component';
import { HeaderComponent } from './components/partials/header/header.component';
import { HomeComponent } from './components/pages/home/home.component';
import { AppRoutingModule } from './app-routing.module';
import { SearchBarComponent } from './components/partials/search-bar/search-bar.component';
import { TagsComponent } from './components/partials/tags/tags.component';
import { FoodPageComponent } from './components/pages/food-page/food-page.component';
import { CartPageComponent } from './components/pages/cart-page/cart-page.component';
import { TitleComponent } from './components/partials/title/title.component';
import { NotFoundComponent } from './components/partials/not-found/not-found.component';
import { LoginComponent } from './components/pages/login/login.component';
import { StarRatingComponent } from './components/partials/star-rating/star-rating.component';
import { InputContainerComponent } from './components/partials/input-container/input-container.component';
import { DefaultButtonComponent } from './components/partials/default-button/default-button.component';
import { RegisterPageComponent } from './components/pages/register-page/register-page.component';
import { LoadingComponent } from './components/partials/loading/loading.component';
import { LoadingInterceptor } from './shared/interceptors/loading.interceptor';
import { CheckoutPageComponent } from './components/pages/checkout-page/checkout-page.component';
import { OrderItemsListComponent } from './components/partials/order-items-list/order-items-list.component';
import { MapComponent } from './components/partials/map/map.component';
import { AuthInterceptor } from './shared/interceptors/auth.interceptor';
import { PaymentPageComponent } from './components/pages/payment-page/payment-page.component';
import { PaypalButtonComponent } from './components/partials/paypal-button/paypal-button.component';
import { OrderTrackPageComponent } from './components/pages/order-track-page/order-track-page.component';
import { OrdersPageComponent } from './components/pages/orders-page/orders-page.component';
import { OrdersListComponent } from './components/partials/orders-list/orders-list.component';
import { ProfilePageComponent } from './components/pages/profile-page/profile-page.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { ArraySpacePipe } from './shared/pipes/array-space.pipe';
import { FooterComponent } from './components/partials/footer/footer.component';
import { FaqComponent } from './components/partials/faq/faq.component';
import { NewTextInputComponent } from './components/partials/new-text-input/new-text-input.component';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    HomeComponent,
    SearchBarComponent,
    TagsComponent,
    FoodPageComponent,
    CartPageComponent,
    TitleComponent,
    NotFoundComponent,
    LoginComponent,
    StarRatingComponent,
    InputContainerComponent,
    DefaultButtonComponent,
    RegisterPageComponent,
    LoadingComponent,
    CheckoutPageComponent,
    OrderItemsListComponent,
    MapComponent,
    PaymentPageComponent,
    PaypalButtonComponent,
    OrderTrackPageComponent,
    OrdersPageComponent,
    OrdersListComponent,
    ProfilePageComponent,
    ArraySpacePipe,
    FooterComponent,
    FaqComponent,
    NewTextInputComponent
  ],
  imports: [
    BrowserModule,
    CommonModule,
    AppRoutingModule,
    HttpClientModule,
    RouterModule,
    ReactiveFormsModule,
    FontAwesomeModule,
    ToastrModule.forRoot({
      timeOut: 3000,
      positionClass: 'toast-bottom-right',
      newestOnTop: false
    }),
    BrowserAnimationsModule
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: LoadingInterceptor, multi: true },
    { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
