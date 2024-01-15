import { ComponentFixture, TestBed } from '@angular/core/testing';
import { DefaultButtonComponent } from './default-button.component';

describe('DefaultButtonComponent', () => {
  let component: DefaultButtonComponent;
  let fixture: ComponentFixture<DefaultButtonComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [DefaultButtonComponent],
    });

    fixture = TestBed.createComponent(DefaultButtonComponent);
    component = fixture.componentInstance;
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should emit click event on button click', () => {
    spyOn(component.onClick, 'emit');
    const button = fixture.nativeElement.querySelector('button');

    button.click();

    expect(component.onClick.emit).toHaveBeenCalledWith(jasmine.anything());
  });

  it('should display the correct text on the button', () => {
    const expectedText = 'Click Me';
    component.text = expectedText;

    fixture.detectChanges();

    const buttonText = fixture.nativeElement.querySelector('button').textContent.trim();
    expect(buttonText).toContain(expectedText);
  });
});
