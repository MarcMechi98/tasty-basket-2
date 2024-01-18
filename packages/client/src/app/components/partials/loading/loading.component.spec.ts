import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { BehaviorSubject } from 'rxjs';

import { LoadingComponent } from './loading.component';
import { LoadingService } from './../../../services/loading.service';

describe('LoadingComponent', () => {
  let component: LoadingComponent;
  let fixture: ComponentFixture<LoadingComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [LoadingComponent],
      providers: [
        {
          provide: LoadingService,
          useValue: { isLoading$: new BehaviorSubject<boolean>(true) },
        },
      ],
    });

    fixture = TestBed.createComponent(LoadingComponent);
    component = fixture.componentInstance;
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should display loading container when isLoading is true', fakeAsync(() => {
    fixture.detectChanges();
    tick();

    const containerElement: HTMLElement = fixture.nativeElement.querySelector('.container');

    expect(containerElement).toBeTruthy();
    expect(containerElement.textContent).toContain('Loading...');
  }));
});
