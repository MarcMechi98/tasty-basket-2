import { Component } from '@angular/core';

import { LoadingService } from './../../../services/loading.service';

@Component({
  selector: 'app-loading',
  templateUrl: './loading.component.html',
  styleUrl: './loading.component.scss'
})
export class LoadingComponent {
  isLoading!: boolean;

  constructor(
    loadingService: LoadingService
  ) {
    loadingService.isLoading$.subscribe(isLoading => this.isLoading = isLoading);
  }
}
