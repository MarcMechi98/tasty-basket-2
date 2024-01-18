import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MapComponent } from './map.component';
import { LocationService } from './../../../services/location.service';
import { Order } from 'src/app/shared/models/order';
import { of } from 'rxjs';
import { LatLng } from 'leaflet';

describe('MapComponent', () => {
  let component: MapComponent;
  let fixture: ComponentFixture<MapComponent>;
  let locationServiceSpy: jasmine.SpyObj<LocationService>;

  beforeEach(() => {
    const spy = jasmine.createSpyObj('LocationService', ['getCurrentLocation']);
    TestBed.configureTestingModule({
      declarations: [MapComponent],
      providers: [
        { provide: LocationService, useValue: spy }
      ],
    });
    fixture = TestBed.createComponent(MapComponent);
    component = fixture.componentInstance;
    locationServiceSpy = TestBed.inject(LocationService) as jasmine.SpyObj<LocationService>;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should set addressLatLng on set addressLatLng', () => {
    const latlng = { lat: 10, lng: 20 };
    const expectedLatLng = new LatLng(latlng.lat, latlng.lng);
    component.order = {} as Order;

    component.addressLatLng = expectedLatLng;

    expect(component.order.addressLatLng).toEqual(expectedLatLng);
  });
});
