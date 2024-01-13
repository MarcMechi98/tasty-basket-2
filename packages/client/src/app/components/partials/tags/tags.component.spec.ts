import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpClientModule } from '@angular/common/http';
import { RouterTestingModule } from '@angular/router/testing';

import { TagsComponent } from './tags.component';
import { FoodService } from 'src/app/services/food.service';

describe('TagsComponent', () => {
  let component: TagsComponent;
  let fixture: ComponentFixture<TagsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [TagsComponent],
      providers: [FoodService],
      imports: [HttpClientModule, RouterTestingModule]
    });

    fixture = TestBed.createComponent(TagsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should display tags when available', () => {
    component.tags = [{ name: 'Tag1', count: 5 }, { name: 'Tag2', count: 8 }];
    fixture.detectChanges();

    const tags = fixture.nativeElement.querySelectorAll('.tags a');
    expect(tags.length).toBe(2);
    expect(tags[0].textContent).toContain('Tag1(5)');
    expect(tags[1].textContent).toContain('Tag2(8)');
  });

  it('should handle no tags scenario', () => {
    component.tags = undefined;
    fixture.detectChanges();

    const tags = fixture.nativeElement.querySelectorAll('.tags a');
    expect(tags.length).toBe(0);
  });

  it('should handle empty tags array', () => {
    component.tags = [];
    fixture.detectChanges();

    const tags = fixture.nativeElement.querySelectorAll('.tags a');
    expect(tags.length).toBe(0);
  });
});
