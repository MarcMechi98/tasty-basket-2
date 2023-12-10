import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule } from '@angular/router';
import { HttpClientModule} from '@angular/common/http';
import { ReactiveFormsModule } from '@angular/forms';

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
import { CommonModule } from '@angular/common';
import { StarRatingComponent } from './components/partials/star-rating/star-rating.component';

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
    StarRatingComponent
  ],
  imports: [
    BrowserModule,
    CommonModule,
    RouterModule.forRoot([]),
    AppRoutingModule,
    HttpClientModule,
    ReactiveFormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
