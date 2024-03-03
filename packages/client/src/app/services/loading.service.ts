import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LoadingService {

  private isLoadingSubject = new BehaviorSubject<boolean>(false);

  public showLoading(): void {
    this.isLoadingSubject.next(true);
  }

  public hideLoading(): void {
    this.isLoadingSubject.next(false);
  }

  get isLoading$() {
    return this.isLoadingSubject.asObservable();
  }
}
