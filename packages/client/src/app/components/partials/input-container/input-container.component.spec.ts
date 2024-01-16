import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InputContainerComponent } from './input-container.component';

describe('InputContainerComponent', () => {
  let component: InputContainerComponent;
  let fixture: ComponentFixture<InputContainerComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [InputContainerComponent]
    });

    fixture = TestBed.createComponent(InputContainerComponent);
    component = fixture.componentInstance;
  });

  it('should create the input container component', () => {
    expect(component).toBeTruthy();
  });

  it('should display the label', () => {
    const label = 'Test Label';
    component.label = label;
    fixture.detectChanges();
    const labelElement = fixture.nativeElement.querySelector('label');

    expect(labelElement).toBeTruthy();
    expect(labelElement.textContent).toContain(label);
  });

  it('should apply background color based on input', () => {
    const bgColor = 'lightblue';
    component.bgColor = bgColor;
    fixture.detectChanges();
    const containerElement = fixture.nativeElement.querySelector('.container');

    expect(containerElement).toBeTruthy();
    expect(containerElement.style.backgroundColor).toBe(bgColor);
  });
});
