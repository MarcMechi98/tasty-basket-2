import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NewTextInputComponent } from './new-text-input.component';

describe('NewTextInputComponent', () => {
  let component: NewTextInputComponent;
  let fixture: ComponentFixture<NewTextInputComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [NewTextInputComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(NewTextInputComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
