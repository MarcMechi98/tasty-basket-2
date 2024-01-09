import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute, Router } from '@angular/router';
import { of } from 'rxjs';

import { SearchBarComponent } from './search-bar.component';

describe('SearchBarComponent', () => {
  let component: SearchBarComponent;
  let fixture: ComponentFixture<SearchBarComponent>;
  let mockRouter: any;

  beforeEach(() => {
    mockRouter = jasmine.createSpyObj('Router', ['navigateByUrl']);

    TestBed.configureTestingModule({
      declarations: [SearchBarComponent],
      providers: [
        {
          provide: ActivatedRoute,
          useValue: {
            params: of({ search: 'some-value' })
          }
        },
        { provide: Router, useValue: mockRouter }
      ]
    });

    fixture = TestBed.createComponent(SearchBarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should navigate when searchFood is called with a term', () => {
    const searchTerm = 'test-search';
    component.searchFood(searchTerm);
    expect(mockRouter.navigateByUrl).toHaveBeenCalledWith(`/search/${searchTerm}`);
  });

  it('should not navigate when searchFood is called with an empty term', () => {
    const emptySearchTerm = '';
    component.searchFood(emptySearchTerm);
    expect(mockRouter.navigateByUrl).not.toHaveBeenCalled();
  });

  it('should have the correct placeholder in the input element', () => {
    const inputElement = fixture.nativeElement.querySelector('input');
    expect(inputElement.getAttribute('placeholder')).toBe('Search Tasty Basket');
  });

  it('should call searchFood when the search button is clicked', () => {
    const inputElement = fixture.nativeElement.querySelector('input');
    const buttonElement = fixture.nativeElement.querySelector('button');
    spyOn(component, 'searchFood');

    inputElement.value = 'test-search';
    inputElement.dispatchEvent(new Event('input'));
    buttonElement.click();

    expect(component.searchFood).toHaveBeenCalledWith('test-search');
  });
});
