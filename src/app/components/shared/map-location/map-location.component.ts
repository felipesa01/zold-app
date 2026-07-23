import {
    AfterViewInit,
    Component,
    DestroyRef,
    effect,
    ElementRef,
    inject,
    input,
    model,
    output,
    signal,
    viewChild,
} from '@angular/core';

import Map from 'ol/Map';
import View from 'ol/View';
import TileLayer from 'ol/layer/Tile';
import VectorLayer from 'ol/layer/Vector';
import VectorSource from 'ol/source/Vector';
import OSM from 'ol/source/OSM';

import Feature from 'ol/Feature';
import Point from 'ol/geom/Point';

import { fromLonLat, toLonLat } from 'ol/proj';
import { defaults as defaultControls } from 'ol/control';

import Style from 'ol/style/Style';
import CircleStyle from 'ol/style/Circle';
import Fill from 'ol/style/Fill';
import Stroke from 'ol/style/Stroke';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import XYZ from 'ol/source/XYZ';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import Circle from 'ol/style/Circle';

export type MapLayerType = 'osm' | 'satellite';

@Component({
    selector: 'app-map-location',
    imports: [
        CommonModule,
        FormsModule,
        MatFormFieldModule,
        MatInputModule,
        MatButtonModule,
        MatIconModule,
        MatProgressSpinnerModule,
        MatSlideToggleModule
    ],
    standalone: true,
    templateUrl: './map-location.component.html',
    styleUrls: ['./map-location.component.css']
})



export class MapLocationComponent implements AfterViewInit {

    readonly lat = input<number | null>(null);
    readonly lon = input<number | null>(null);
    readonly editable = input(true);

    readonly showMyLocation = input(false);

    readonly latChange = output<number | null>();
    readonly lonChange = output<number | null>();

    readonly baseLayerInput = input<MapLayerType>('osm');
    layerType = signal<'osm' | 'satellite'>('osm');
    private readonly baseLayer = new TileLayer();

    readonly mapElement = viewChild.required<ElementRef<HTMLDivElement>>('map');

    private map!: Map;

    private readonly marker = new Feature<Point>();

    private readonly myLocationMarker = new Feature<Point>();

    private myLocationAdded = false;
    private watchId?: number;   
    

    private readonly vectorSource = new VectorSource();
    private markerAdded = false;
    private hasZoomed = false;



    loadingLocation = signal(false);

    private readonly vectorLayer = new VectorLayer({
        source: this.vectorSource
    });

    constructor() {

        this.marker.setStyle(
            new Style({
                image: new Circle({
                    radius: 8,
                    fill: new Fill({ color: 'rgba(34, 197, 94, 0.6)' }),
                    stroke: new Stroke({ color: '#fff', width: 2 })
                })
            })
        );

        this.myLocationMarker.setStyle(
            new Style({
                image: new CircleStyle({
                    radius: 7,
                    fill: new Fill({
                        color: '#1976d2'
                    }),
                    stroke: new Stroke({
                        color: '#ffffff',
                        width: 2
                    })
                })
            })
        );

        effect((onCleanup) => {

            if (!this.showMyLocation()) {
        
                if (this.watchId != null) {
                    navigator.geolocation.clearWatch(this.watchId);
                    this.watchId = undefined;
                }
        
                if (this.myLocationAdded) {
                    this.vectorSource.removeFeature(this.myLocationMarker);
                    this.myLocationAdded = false;
                }
        
                return;
            }
        
            if (!navigator.geolocation)
                return;
        
            this.watchId = navigator.geolocation.watchPosition(position => {
        
                this.updateMyLocationMarker(
                    position.coords.latitude,
                    position.coords.longitude
                );
        
            });
        
            onCleanup(() => {
        
                if (this.watchId != null) {
                    navigator.geolocation.clearWatch(this.watchId);
                    this.watchId = undefined;
                }
        
            });
        
        });

        effect(() => {
            if (!this.showMyLocation()) {
                if (this.myLocationAdded) {
                    this.vectorSource.removeFeature(this.myLocationMarker);
                    this.myLocationAdded = false;
                }
                return;
            }
            if (!navigator.geolocation)
                return;
            navigator.geolocation.getCurrentPosition(position => {
                this.updateMyLocationMarker(
                    position.coords.latitude,
                    position.coords.longitude
                );
            });
        });

        effect(() => {
            const lat = this.lat();
            const lon = this.lon();
            if (lat == null || lon == null)
                return;
            this.updateMarker(lat, lon);
        });
    }

    ngAfterViewInit(): void {

        this.map = new Map({
            target: this.mapElement().nativeElement,
            layers: [
                this.baseLayer,
                this.vectorLayer
            ],
            view: new View({
                center: fromLonLat([-46.6333, -23.5505]),
                zoom: 4
            }),
            controls: defaultControls({ attribution: false, zoom: false, rotate: false })
        });

        const lat = this.lat();
        const lon = this.lon();
        if (lat != null && lon != null) {
            this.updateMarker(lat, lon);
        }
        if (this.editable()) {
            this.map.on('click', (event) => {
                const [lon, lat] = toLonLat(event.coordinate);
                this.latChange.emit(Number(lat.toFixed(6)));
                this.lonChange.emit(Number(lon.toFixed(6)));
            });
        }

        if (this.baseLayerInput() == 'osm') {
            this.baseLayer.setSource(new OSM());
            this.layerType.set('osm');

        }
        else {
            this.baseLayer.setSource(new XYZ({ url: 'http://mt0.google.com/vt/lyrs=s&hl=en&x={x}&y={y}&z={z}', attributions: '© Google' }))
            this.layerType.set('satellite');
        }


        this.map.updateSize();
    }

    toggleLayer(): void {

        if (this.layerType() === 'osm') {
            this.baseLayer.setSource(
                new XYZ({
                    url: 'https://mt0.google.com/vt/lyrs=s&hl=en&x={x}&y={y}&z={z}',
                    attributions: '© Google'
                })
            );

            this.layerType.set('satellite');

        } else {
            this.baseLayer.setSource(new OSM());
            this.layerType.set('osm');
        }

    }


    private updateMarker(latitude: number, longitude: number): void {

        if (!this.map)
            return;

        if (
            latitude < -90 || latitude > 90 ||
            longitude < -180 || longitude > 180
        ) {
            return;
        }

        const coordinate = fromLonLat([longitude, latitude]);

        this.marker.setGeometry(
            new Point(coordinate)
        );

        if (!this.markerAdded) {

            this.vectorSource.addFeature(this.marker);

            this.markerAdded = true;

        }

        const view = this.map.getView();
        const zoom = view.getZoom() ?? 4;

        view.animate({

            center: coordinate,

            zoom: Math.max(zoom, 18),

            duration: 300

        });

    }

    getCurrentLocation(): void {

        if (!navigator.geolocation)
            return;

        this.loadingLocation.set(true);

        navigator.geolocation.getCurrentPosition(

            (position) => {

                this.loadingLocation.set(false);

                this.latChange.emit(
                    Number(position.coords.latitude.toFixed(6))
                );

                this.lonChange.emit(
                    Number(position.coords.longitude.toFixed(6))
                );

            },

            (error) => {

                this.loadingLocation.set(false);

                console.error(error);

            },

            {
                enableHighAccuracy: true,
                timeout: 10000,
                maximumAge: 0
            }

        );

    }

    clearLocation(): void {

        this.latChange.emit(null);

        this.lonChange.emit(null);

        this.vectorSource.clear();

        this.markerAdded = false;

    }


    private updateMyLocationMarker(latitude: number, longitude: number): void {

        if (!this.map) return;

        const coordinate = fromLonLat([longitude, latitude]);

        this.myLocationMarker.setGeometry(
            new Point(coordinate)
        );

        if (!this.myLocationAdded) {

            this.vectorSource.addFeature(this.myLocationMarker);

            this.myLocationAdded = true;

        }

    }
}

