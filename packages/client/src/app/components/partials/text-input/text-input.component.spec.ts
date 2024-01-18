import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormControl, FormsModule, ReactiveFormsModule } from '@angular/forms';

import { TextInputComponent } from './text-input.component';
import { InputContainerComponent } from '../input-container/input-container.component';
import { InputValidationComponent } from '../input-validation/input-validation.component';

describe('TextInputComponent', () => {
  let component: TextInputComponent;
  let fixture: ComponentFixture<TextInputComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [TextInputComponent, InputContainerComponent, InputValidationComponent],
      imports: [FormsModule, ReactiveFormsModule],
    })
    .compileComponents();

    fixture = TestBed.createComponent(TextInputComponent);
    component = fixture.componentInstance;
    component.control = new FormControl();
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize with correct inputs', () => {
    component.label = 'Your Label';
    component.placeholder = 'Your Placeholder';

    expect(component.label).toBe('Your Label');
    expect(component.control).toBeTruthy();
    expect(component.placeholder).toBe('Your Placeholder');
    expect(component.shouldDisplayErrors).toBe(true);
    expect(component.type).toBe('text');
  });
});
