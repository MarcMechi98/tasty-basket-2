import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TitleComponent } from './title.component';

describe('TitleComponent', () => {
  let component: TitleComponent;
  let fixture: ComponentFixture<TitleComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [TitleComponent],
    });

    fixture = TestBed.createComponent(TitleComponent);
    component = fixture.componentInstance;
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should display the title with default styles', () => {
    const defaultTitle = 'Default Title';
    component.title = defaultTitle;
    fixture.detectChanges();

    const h1Element: HTMLHeadingElement = fixture.nativeElement.querySelector('h1');

    expect(h1Element.textContent).toContain(defaultTitle);
    expect(h1Element.style.margin).toBe('1rem 0px 1rem 0.2rem');
    expect(h1Element.style.fontSize).toBe('1.7rem');
  });

  it('should display the title with custom styles', () => {
    const customTitle = 'Custom Title';
    const customMargin = '2rem 0px';
    const customFontSize = '2rem';

    component.title = customTitle;
    component.margin = customMargin;
    component.fontSize = customFontSize;
    fixture.detectChanges();

    const h1Element: HTMLHeadingElement = fixture.nativeElement.querySelector('h1');

    expect(h1Element.textContent).toContain(customTitle);
    expect(h1Element.style.margin).toBe(customMargin);
    expect(h1Element.style.fontSize).toBe(customFontSize);
  });
});
