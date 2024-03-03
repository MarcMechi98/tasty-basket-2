import { Injectable } from '@angular/core';
import {
  HttpEvent,
  HttpInterceptor,
  HttpHandler,
  HttpRequest,
  HttpEventType,
} from '@angular/common/http';
import { Observable, tap } from 'rxjs';
import { LoadingService } from 'src/app/services/loading.service';

@Injectable()
export class LoadingInterceptor implements HttpInterceptor {

  private numOfPendingRequests = 0;

  constructor(
    private loadingService: LoadingService
  ) {}

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    this.loadingService.showLoading();
    this.numOfPendingRequests++;

    return next.handle(req).pipe(
      tap({
        next: (event) => {
          if (event.type === HttpEventType.Response) {
            this.handleHideLoading();
          }
        },
        error: () => {
          this.handleHideLoading();
        }
      })
    );
  }

  private handleHideLoading() {
    this.numOfPendingRequests--;

    if (this.numOfPendingRequests === 0) {
      this.loadingService.hideLoading();
    }
  }
}
