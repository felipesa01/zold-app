import { AfterViewInit, Component, computed, inject } from '@angular/core';
import { MapService } from '../../../../services/map-service';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import TileLayer from 'ol/layer/Tile';
import { GeoTIFF, TileDebug } from 'ol/source';
import { Feature } from 'ol';
import { Point } from 'ol/geom';
import VectorLayer from 'ol/layer/Vector';
import VectorSource from 'ol/source/Vector';
import Icon from 'ol/style/Icon';
import Style from 'ol/style/Style';
import { LayersService } from '../../../../services/layers-service';
import { ResponsiveService } from '../../../../services/responsive-service';

@Component({
  selector: 'app-map-component',
  imports: [NgbModule],
  templateUrl: './map-component.html',
  styleUrl: './map-component.css',
})
export class MapComponent implements AfterViewInit {
  private responsive = inject(ResponsiveService);
  isMobile = computed(() => this.responsive.isSmallScreen());

  constructor(private mapService: MapService, private layerService: LayersService) { }


  ngAfterViewInit(): void {
    this.startMap();
  }


  startMap() {

    this.mapService.updateView();
    this.mapService.setTileSource();
    this.mapService.updateSize('map');

    setTimeout(() => {
      this.fitTrees();
    }, 1000)
  }

  changeTileLayer() {
    const tile = new TileLayer({
      source: new TileDebug(),
    })

    this.mapService.setTileSource(tile)
  }


  fitTrees() {
    const extent = this.layerService.arvoresLayer.getSource()?.getExtent()
    const padding = this.isMobile() ? [10, 50, 10, 50] : [200, 200, 200, 200]
    if (extent) this.mapService.map.getView().fit(extent, { padding: padding, duration: 1200 })
  }

  modoMapa: 'satelite' | 'mapa' = 'satelite';
  trocarCamada() {
    this.modoMapa = this.modoMapa === 'satelite' ? 'mapa' : 'satelite';
    this.mapService.changeTileSource(this.modoMapa);
  }
}
