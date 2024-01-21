import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { By } from '@angular/platform-browser';

import { NotFoundComponent } from './not-found.component';

describe('NotFoundComponent', () => {
  let component: NotFoundComponent;
  let fixture: ComponentFixture<NotFoundComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [NotFoundComponent],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NotFoundComponent);
    component = fixture.componentInstance;
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should not be visible by default', () => {
    const containerElement = fixture.debugElement.query(By.css('div'));
    expect(containerElement).toBeNull();
  });

  it('should be visible with default message and link text when visible is true', () => {
    component.visible = true;
    fixture.detectChanges();

    const containerElement = fixture.debugElement.query(By.css('div'));
    const messageElement = fixture.debugElement.query(By.css('div')).nativeElement.textContent.trim();
    const linkElement = fixture.debugElement.query(By.css('a')).nativeElement.textContent.trim();

    const cleanedMessage = messageElement.replace(linkElement, '').trim();

    expect(containerElement).toBeTruthy();
    expect(cleanedMessage).toBe('Not found :(');
  });


  it('should be visible with custom message and link text when provided', () => {
    component.visible = true;
    component.message = 'Custom Message';
    component.resetLinkText = 'Retry';
    fixture.detectChanges();

    const containerElement = fixture.debugElement.query(By.css('div')).nativeElement;
    const linkElement = containerElement.querySelector('a');

    expect(containerElement).toBeTruthy();
    expect(linkElement.textContent.trim()).toBe('Retry');
    expect(linkElement.getAttribute('routerLink')).toBe('/');
  });
});
