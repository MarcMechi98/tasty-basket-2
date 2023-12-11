import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable, tap } from 'rxjs';

import { User } from '../shared/models/user';
import { IUserLogin } from '../shared/interfaces/IUserLogin';
import { USER_LOGIN_URL } from '../shared/constants/urls';
import { ToastrService } from 'ngx-toastr';

const USER_KEY = 'User';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private userSubject: BehaviorSubject<User> = new BehaviorSubject<User>(this.getUserFromLocalstorage());
  user$!: Observable<User>;

  constructor(
    private http: HttpClient,
    private toastr: ToastrService
  ) {
    this.user$ = this.userSubject.asObservable();
  }

  login(userLogin: IUserLogin): Observable<User> {
    return this.http.post<User>(USER_LOGIN_URL, userLogin).pipe(
      tap({
        next: (user: User) => {
          this.setUserToLocalstorage(user);

          this.userSubject.next(user);
          this.toastr.success(
            `Welcome to Tasty Basket, ${user.name}!\n
            You are logged in.`
          );
        },
        error: (err) => {
          console.error(err);
          this.toastr.error(err.error.message, 'Login Failed');
        }
      })
    )
  }

  logout(): void {
    localStorage.removeItem(USER_KEY);
    this.userSubject.next(new User());
    window.location.reload();
  }

  private setUserToLocalstorage(user: User): void {
    localStorage.setItem(USER_KEY, JSON.stringify(user));
  }

  private getUserFromLocalstorage(): User {
    const user = localStorage.getItem(USER_KEY);
    if (user) {
      return JSON.parse(user) as User;
    }
    return new User();
  }
}
