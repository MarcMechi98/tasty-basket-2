import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StarRatingComponent } from './star-rating.component';

describe('StarRatingComponent', () => {
  let component: StarRatingComponent;
  let fixture: ComponentFixture<StarRatingComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [StarRatingComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(StarRatingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should display stars with default size', () => {
    component.stars = 3;
    fixture.detectChanges();

    const starImages = fixture.nativeElement.querySelectorAll('.container img');

    expect(starImages.length).toBe(5);
    for (let i = 0; i < 3; i++) {
      expect(starImages[i].getAttribute('src')).toContain('star-full');
    }
  });

  it('should display no stars', () => {
    component.stars = 0;
    fixture.detectChanges();

    const starImages = fixture.nativeElement.querySelectorAll('.container img');

    expect(starImages.length).toBe(5);
    for (let i = 0; i < 5; i++) {
      expect(starImages[i].getAttribute('src')).toContain('star-empty');
    }
  });
});
