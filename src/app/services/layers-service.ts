import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Feature } from "ol";
import VectorSource from "ol/source/Vector";
import { take } from "rxjs";
import GeoJSON from 'ol/format/GeoJSON.js';
import VectorLayer from "ol/layer/Vector";
import Fill from "ol/style/Fill";
import Stroke from "ol/style/Stroke";
import { Style, Text } from "ol/style";
import Circle from "ol/style/Circle";
import TileLayer from "ol/layer/Tile";
import OsmSource from 'ol/source/OSM';
import { XYZ } from "ol/source";
import CircleStyle from "ol/style/Circle";


export interface mappingResultObject {
    layerId: string,
    layerName: string,
    fonteGS_front: string
    fonteGS_back: string,
    pk_name: string,
    pk_type?: string,
    pk_value: number,
    geomFeature: undefined | Feature,
    nameFeature: undefined | string,
    cluster_mode?: string,
    cluster_name?: string,
    feature?: Feature
}



@Injectable({
    providedIn: 'root',
})
export class LayersService {

    fasesLayer: VectorLayer<VectorSource> = new VectorLayer();
    arvoresLayer: VectorLayer<VectorSource> = new VectorLayer();

    constructor(private http: HttpClient) {

        this.http.get('/assets/vetores/fases.json').pipe(take(1)).subscribe(e => {
            let features: Feature[] = new GeoJSON({ dataProjection: "EPSG:4326", featureProjection: 'EPSG:4326', }).readFeatures(e);
            this.fasesLayer.setSource(new VectorSource({
                features: features,
            }));
            const properties_ = {
                'name': 'Fases',
                'id': 1,
            }
            this.fasesLayer.setProperties(properties_);
            this.fasesLayer.setStyle(this.styleFases)
        });

        this.http.get('/assets/vetores/arvores.json').pipe(take(1)).subscribe(e => {
            let features: Feature[] = new GeoJSON({ dataProjection: "EPSG:4326", featureProjection: 'EPSG:4326', }).readFeatures(e);
            this.arvoresLayer.setSource(new VectorSource({
                features: features,
            }));
            const properties_ = {
                'name': 'Árvores',
                'id': 2,
            }
            this.arvoresLayer.setProperties(properties_);
            this.arvoresLayer.setStyle(this.styleArvores)

        });
    }

    zoomToResolution4326(zoom: number): number {
        return 360 / (256 * Math.pow(2, zoom));
    }

    styleFases = (feature: any, resolution: number) => {

        const nome = feature.get('nome');
        const showLabel = resolution >= this.zoomToResolution4326(20);

        return new Style({
            stroke: new Stroke({
                color: '#ffd900ff',
                width: 2
            }),
            fill: new Fill({
                color: 'rgba(0,0,0,0)' // sem preenchimento
            }),
            text: showLabel
                ? new Text({
                    text: nome || '',
                    font: 'bold 15px sans-serif',
                    fill: new Fill({ color: '#000000ff' }),
                    stroke: new Stroke({ color: '#ffd900ff', width: 3 }),
                    placement: "point",
                    textAlign: "center"
                })
                : undefined
        });
    }

    styleArvores = (feature: any, resolution: number) => {

        const nome = feature.get('nome');
        const showLabel = resolution >= this.zoomToResolution4326(20);

        return new Style({
            image: new CircleStyle({
                radius: 10,
                stroke: new Stroke({
                    color: '#ffffffff',
                    width: 3
                }),
                fill: new Fill({
                    color: 'rgba(38, 182, 33, 0.7)'
                })
            })
        });
    }



    higthlihtOptionToInfo = {
        'polygon': new VectorLayer({
            source: new VectorSource({}),
            properties: { 'name': 'highlihtOptionToInfoPol', 'id': 'HLOptiontoInfoPol' },
            style: new Style({
                stroke: new Stroke({
                    color: '#fd2929',
                    width: 3,
                }),
                fill: new Fill({
                    color: 'rgba(209, 30, 48, 0.3)',
                }),
            }),
            zIndex: 99999
        }),
        'line': new VectorLayer({
            source: new VectorSource({}),
            properties: { 'name': 'highlihtOptiontoInfoLin', 'id': 'HLOptiontoInfoLin' },
            style: new Style({
                stroke: new Stroke({
                    color: '#fd2929',
                    width: 2,
                }),
            }),
            zIndex: 99999
        }),
        'point': new VectorLayer({
            source: new VectorSource({}),
            properties: { 'name': 'highlihtOptiontoInfoPt', 'id': 'HLOptiontoInfoPt' },
            style: new Style({
                image: new Circle({
                    radius: 10,
                    fill: new Fill({ color: 'rgba(209, 30, 48, 0.5)' }),
                    stroke: new Stroke({
                        color: 'red', width: 2
                    })
                }),
            }),
            zIndex: 99999
        })
    };


    tileSources = [
        new TileLayer(
            { source: new OsmSource(), properties: { name: 'OSM', imgThumb: './assets/images/tileThumbs/osm.png', categoria: 'OSM' } }
        ),
        new TileLayer({
            source: new XYZ({ url: 'http://mt0.google.com/vt/lyrs=s&hl=en&x={x}&y={y}&z={z}', attributions: '© Google' }),
        })
    ];

}
