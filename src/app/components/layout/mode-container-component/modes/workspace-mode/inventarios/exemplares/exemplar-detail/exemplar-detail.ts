import { CommonModule, Location } from "@angular/common";
import { Component, AfterViewInit, inject, signal, effect, computed } from "@angular/core";
import { toSignal } from "@angular/core/rxjs-interop";
import { MatButtonModule } from "@angular/material/button";
import { MatDialog } from "@angular/material/dialog";
import { MatIconModule } from "@angular/material/icon";
import { RouterModule, ActivatedRoute, Router } from "@angular/router";
import { ToastrService } from "ngx-toastr";
import { Feature, Map, View } from 'ol';
import { Point } from "ol/geom";
import TileLayer from "ol/layer/Tile";
import VectorLayer from "ol/layer/Vector";
import { XYZ } from "ol/source";
import VectorSource from "ol/source/Vector";
import { ApiConnectionService } from "../../../../../../../../services/api-connection-service";
import { ConfirmDialogComponent } from "../../../../../../../shared/confirm-dialog-component/confirm-dialog-component";
import { Exemplar } from "../exemplar.model";
import { map } from "rxjs";
import { defaults as defaultInteractions } from 'ol/interaction';
import { defaults as defaultControls } from 'ol/control';
import { Circle, Fill, Stroke, Style } from 'ol/style';
import { AnaliseInventario } from "../../analises/analise.model";
import { FotoInventario } from "../../fotos/fotos.model";
import { NgbCarouselModule } from "@ng-bootstrap/ng-bootstrap";
import { MatTooltipModule } from "@angular/material/tooltip";
import { MapLocationComponent } from "../../../../../../../shared/map-location/map-location.component";

@Component({
  selector: 'app-exemplares-detail',
  imports: [
    CommonModule,
    MatButtonModule,
    MatIconModule,
    RouterModule,
    NgbCarouselModule,
    MatTooltipModule,
    MapLocationComponent
  ],
  templateUrl: './exemplar-detail.html',
  styleUrl: './exemplar-detail.css',
})
export class ExemplaresDetail implements AfterViewInit {

  private route = inject(ActivatedRoute);
  private router = inject(Router);
  private api = inject(ApiConnectionService);
  private dialog = inject(MatDialog);
  private toastr = inject(ToastrService);

  showPhotos = signal(false);

  exemplarId = toSignal(
    this.route.paramMap.pipe(
      map(params => params.get('id'))
    )
  );

  exemplar = signal<Exemplar | undefined>(undefined);
  analises = computed(() => this.exemplar()?.analises ?? []);
  fotos = computed(() => this.exemplar()?.fotos ?? []);
  // analises = signal<AnaliseInventario[]>([])
  // fotos = signal<FotoInventario[]>([])

  expandedAnalises = signal<Set<string>>(new Set());


  analisesOrdenadas = computed(() =>
    [...this.analises()].sort(
      (a, b) => new Date(b.data).getTime() - new Date(a.data).getTime()
    )
  );

  ultimaAnalise = computed(() => {
    const analises = this.analisesOrdenadas();
    return analises.length ? analises[0] : undefined;
  });

  map!: Map;

  constructor(private location: Location) {
    effect((onCleanup) => {
      const id = this.exemplarId();

      if (!id) {
        this.exemplar.set(undefined);
        return;
      }

      const sub = this.api.findExemplar(id).subscribe({
        next: (exemplar) => {
          this.exemplar.set(exemplar);
          this.createLayer(exemplar);
        },
        error: () => this.exemplar.set(undefined)
      });

      // const sub2 = this.api.listarAnalisesByExemplar(id).subscribe({
      //   next: (analises) => {
      //     this.analises.set(analises);

      //   },
      //   error: () => this.analises.set([])
      // });

      // const sub3 = this.api.listarFotosByExemplar(id).subscribe({
      //   next: (fotos) => {
      //     this.fotos.set(fotos);

      //   },
      //   error: () => this.analises.set([])
      // });


      onCleanup(() => {
        sub.unsubscribe()
        // sub2.unsubscribe()
        // sub3.unsubscribe()

      });
    });

    this.map = new Map({
      moveTolerance: 3,
      interactions: defaultInteractions(undefined),
      layers: [
        new TileLayer({
          source: new XYZ({
            url: 'http://mt0.google.com/vt/lyrs=s&hl=en&x={x}&y={y}&z={z}',
            attributions: '© Google'
          })
        })
      ],
      view: new View({
        projection: 'EPSG:4326',
        center: [-46.9212, -23.448],
        zoom: 10,
      }),
      controls: defaultControls({ attribution: false, zoom: false, rotate: false }),
    });
  }

  ngAfterViewInit() {
    this.map.setTarget('map-exemplar-detail');
    this.map.updateSize();
  }

  createLayer(exemplar?: Exemplar) {
    if (!exemplar) return;

    const geom = new Feature({
      geometry: new Point([exemplar.lon, exemplar.lat])
    });

    const layer = new VectorLayer({
      source: new VectorSource({ features: [geom] }),
      style: new Style({
        image: new Circle({
          radius: 10,
          fill: new Fill({ color: 'rgba(30, 136, 229, 0.5)' }),
          stroke: new Stroke({ color: '#1e88e5', width: 2 })
        })
      }),
      zIndex: 99999
    });

    console.log(layer)

    this.map.addLayer(layer);
    this.map.getView().fit(geom.getGeometry()!, { maxZoom: 18 });
  }

  delete() {
    const dialogRef = this.dialog.open(ConfirmDialogComponent, {
      width: '360px',
      data: {
        title: 'Excluir exemplar',
        message: 'Tem certeza que deseja continuar?',
        confirmText: 'Sim',
        cancelText: 'Cancelar'
      }
    });

    dialogRef.afterClosed().subscribe(confirmado => {
      if (!confirmado) return;

      this.api.removeExemplar(this.exemplarId() ?? '').subscribe({
        next: () => this.showSuccess('Exemplar apagado!'),
        error: (err) => this.showError(err.error?.message || 'Erro ao remover')
      });
    });
  }

  showSuccess(message: string) {
    this.toastr.success(message, 'Sucesso!', { progressBar: true })
      .onHidden.subscribe(() => this.voltar());
  }

  showError(message: string) {
    this.toastr.error(message, 'Erro!', { progressBar: true })
      .onHidden.subscribe(() => this.voltar());
  }

  togglePhotos() {
    this.showPhotos.set(!this.showPhotos());
  }

  voltar() {
    this.location.back();
  }

  addAnalise() {
    console.log(`/workspace?inventario/exemplares/${this.exemplarId()}/analises/new`)
    this.router.navigate([`/workspace/inventario/exemplares/${this.exemplarId()}/analises/new`]);
  }

  toggleAnalise(id: string) {
    const expanded = new Set(this.expandedAnalises());
    if (expanded.has(id)) {
      expanded.delete(id);
    } else {
      expanded.add(id);
    }
    this.expandedAnalises.set(expanded);
  }

  isExpanded(id: string) {
    return this.expandedAnalises().has(id);
  }
}