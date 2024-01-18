import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule, FormsModule, FormControl } from '@angular/forms';

import { InputValidationComponent } from './input-validation.component';

describe('InputValidationComponent', () => {
  let component: InputValidationComponent;
  let fixture: ComponentFixture<InputValidationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [InputValidationComponent],
      imports: [FormsModule, ReactiveFormsModule],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(InputValidationComponent);
    component = fixture.componentInstance;

    component.control = new FormControl('');
    component.shouldDisplayError = true;
    fixture.detectChanges();
  });

  it('should create the input validation component', () => {
    expect(component).toBeTruthy();
  });

  it('should display error messages correctly', () => {
    component.control.setErrors({ required: true });
    component.ngOnChanges({ control: true });
    fixture.detectChanges();

    const errorList = fixture.nativeElement.querySelector('.error-list');
    expect(errorList).toBeTruthy();

    const errorMessages = fixture.nativeElement.querySelectorAll('.error-list div');
    expect(errorMessages.length).toBe(1);
    expect(errorMessages[0].textContent).toContain('Should not be empty');
  });

  it('should not display error messages when there are no errors', () => {
    component.control.setErrors(null);
    component.ngOnChanges({ control: true });
    fixture.detectChanges();

    expect(component.errorMessages.length).toBe(0);
  });

  it('should display correct error message for "required" validation error', () => {
    component.control.setErrors({ required: true });
    component.ngOnChanges({ control: true });
    fixture.detectChanges();

    expect(component.errorMessages.length).toBe(1);
    expect(component.errorMessages[0]).toBe('Should not be empty');
  });

});
