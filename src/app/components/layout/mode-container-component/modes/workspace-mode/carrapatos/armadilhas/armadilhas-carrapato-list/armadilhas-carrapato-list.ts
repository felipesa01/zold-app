import { CommonModule } from "@angular/common";
import { Component, OnInit, inject, signal } from "@angular/core";
import { MatButtonModule } from "@angular/material/button";
import { MatIconModule } from "@angular/material/icon";
import { MatPaginatorModule, PageEvent } from "@angular/material/paginator";
import { MatProgressSpinnerModule } from "@angular/material/progress-spinner";
import { MatSortModule, Sort } from "@angular/material/sort";
import { MatTableModule } from "@angular/material/table";
import { MatTabsModule } from "@angular/material/tabs";
import { Router } from "@angular/router";
import { ApiConnectionService } from "../../../../../../../../services/api-connection-service";
import { ProjectContextService } from "../../../../../../../../services/project-context.service";
import { ArmadilhaCarrapato } from "../armadilha-carrapato.model";

@Component({
    selector: 'app-armadilhas-carrapato-list',
    standalone: true,
    imports: [
      CommonModule,
      MatButtonModule,
      MatIconModule,
      MatTableModule,
      MatPaginatorModule,
      MatSortModule,
      MatTabsModule,
      MatProgressSpinnerModule
    ],
    templateUrl: './armadilhas-carrapato-list.html',
    styleUrls: ['./armadilhas-carrapato-list.css']
  })
  export class ArmadilhasCarrapatoList implements OnInit {
  
    private router = inject(Router);
    private api = inject(ApiConnectionService);
    private projectContext = inject(ProjectContextService);
  
    selectedProject = this.projectContext.selected;
  
    loading = signal(false);
  
    data = signal<ArmadilhaCarrapato[]>([]);
    filtered = signal<ArmadilhaCarrapato[]>([]);
    pagedData = signal<ArmadilhaCarrapato[]>([]);
  
    pageIndex = signal(0);
    pageSize = signal(10);
  
    selectedTab = signal(0);
  
    cols = ['nome', 'regiao', 'referencia'];
  
    ngOnInit(): void {
      this.load();
    }
  
    load() {
      this.loading.set(true);
  
      this.api.findArmadilhasCarrapatoByProjeto(
        this.selectedProject()?.id ?? ''
      ).subscribe({
        next: result => {
          this.data.set(result);
          this.filtered.set(result);
          this.updatePagedData();
        },
        complete: () => this.loading.set(false)
      });
    }
  
    reload() {
      this.load();
    }
  
    updatePagedData() {
      const start = this.pageIndex() * this.pageSize();
      const end = start + this.pageSize();
  
      this.pagedData.set(
        this.filtered().slice(start, end)
      );
    }
  
    onSearch(event: Event) {
      const value = (event.target as HTMLInputElement)
        .value
        .toLowerCase();
  
      const filtered = this.data().filter(x =>
        x.nome.toLowerCase().includes(value) ||
        x.regiao.toLowerCase().includes(value) ||
        x.referencia.toLowerCase().includes(value)
      );
  
      this.filtered.set(filtered);
  
      this.pageIndex.set(0);
  
      this.updatePagedData();
    }
  
    onPage(event: PageEvent) {
      this.pageIndex.set(event.pageIndex);
      this.pageSize.set(event.pageSize);
  
      this.updatePagedData();
    }
  
    open(item: ArmadilhaCarrapato) {
      this.router.navigate([
        '/workspace/armadilhas-carrapato',
        item.id
      ]);
    }
  
    create() {
      this.router.navigate([
        '/workspace/armadilhas-carrapato/new'
      ]);
    }
  
    goBack() {
      this.router.navigate(['/workspace']);
    }
  
    onSort(event: Sort) {}
  
    onTabChange(index: number) {
      this.selectedTab.set(index);
    }
  }