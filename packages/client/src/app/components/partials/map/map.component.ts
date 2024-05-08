import { LocationService } from './../../../services/location.service';
import { Component, ElementRef, Input, OnChanges, ViewChild } from '@angular/core';
import { LatLng, LatLngExpression, LatLngTuple, LeafletMouseEvent, Map, Marker, icon, map, marker, tileLayer } from 'leaflet';

import { Order } from 'src/app/shared/models/order';

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrl: './map.component.scss'
})
export class MapComponent implements OnChanges {

  @ViewChild('map', { static: true }) mapRef!: ElementRef;
  @Input() order!: Order;
  @Input() readonly: Boolean = false;

  private readonly DEFAULT_LAT_LNG: LatLngTuple = [13.75, 21.62];
  private readonly MARKER_ZOOM_LVL = 16;
  private readonly MARKER_ICON = icon({
    iconUrl:
      'https://res.cloudinary.com/foodmine/image/upload/v1638842791/map/marker_kbua9q.png',
    iconSize: [42, 42],
    iconAnchor: [21, 42],
  });

  private map!: Map;
  private currentMarker!: Marker;

  constructor(
    private locationService: LocationService,
  ) {}

  get addressLatLng(): LatLng {
    return this.order.addressLatLng!;
  }

  set addressLatLng(latlng: LatLng) {
    if (!latlng.lat.toFixed) return;

    latlng.lat = parseFloat(latlng.lat.toFixed(8));
    latlng.lng = parseFloat(latlng.lng.toFixed(8));
    this.order.addressLatLng = latlng;
  }

  ngOnChanges(): void {
    if (!this.order) return;

    this.initializeMap();

    if (this.readonly && this.addressLatLng) {
      this.showLocationOnReadonlyMode();
    }
  }

  public findMyLocation(): void {
    this.locationService.getCurrentLocation$().subscribe({
      next: (latlng) => {
        this.setMarker(latlng);
        this.map.setView(latlng, this.MARKER_ZOOM_LVL);
      },
      error: (error) => console.error(error),
    });
  }

  private initializeMap(): void {
    if (this.map) return;

    this.map = map(this.mapRef.nativeElement, {
      attributionControl: false,
    }).setView(this.DEFAULT_LAT_LNG, 1);

    tileLayer('https://{s}.tile.osm.org/{z}/{x}/{y}.png').addTo(this.map);

    this.map.on('click', (event: LeafletMouseEvent) => {
      this.setMarker(event.latlng);
    });
  }

  private setMarker(latlng: LatLngExpression): void {
    this.addressLatLng = latlng as LatLng;

    if (this.currentMarker) {
      this.currentMarker.setLatLng(latlng);
      return;
    };

    this.currentMarker = marker(latlng, {
      icon: this.MARKER_ICON,
      draggable: true
    }).addTo(this.map);

    this.currentMarker.on('dragend', () => {
      this.addressLatLng = this.currentMarker.getLatLng();
    });
  }

  private showLocationOnReadonlyMode() {
    const map = this.map;
    this.setMarker(this.addressLatLng);
    map.setView(this.addressLatLng, this.MARKER_ZOOM_LVL);

    map.dragging.disable();
    map.touchZoom.disable();
    map.doubleClickZoom.disable();
    map.scrollWheelZoom.disable();
    map.boxZoom.disable();
    map.keyboard.disable();
    map.off('click');
    this.currentMarker.dragging!.disable();
  }
}
