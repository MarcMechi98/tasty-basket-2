import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-search-bar',
  templateUrl: './search-bar.component.html',
  styleUrls: ['./search-bar.component.scss']
})
export class SearchBarComponent {

  searchTerm: string = '';

  constructor(
    activatedRoute: ActivatedRoute,
    private router: Router
  ) {
    activatedRoute.params.subscribe(params => {
      if (params['search']) {
        this.searchTerm = params['search'];
      }
    });
  }

  searchFood(term: string): void {
    if (term) {
      this.router.navigateByUrl(`/search/${term}`);
    }
  }
}
