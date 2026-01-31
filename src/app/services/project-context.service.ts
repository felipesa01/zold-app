import { computed, inject, Injectable, signal } from "@angular/core";
import { Projeto } from "./api-connection-service";
import { WorkspaceReuseStrategy } from "../components/layout/mode-container-component/modes/workspace-mode/workspace-reuse.strategy";
import { ReuseCacheService } from "../components/layout/mode-container-component/modes/workspace-mode/reuse-cache.service";

@Injectable({ providedIn: 'root' })
export class ProjectContextService {

    private _projects = signal<Projeto[]>([]);
    private _selectedId = signal<string | null>(null);

    projects = this._projects.asReadonly();
    selectedId = this._selectedId.asReadonly();

    selected = computed(() => {
        const id = this._selectedId();
        return this._projects().find(p => p.id === id) ?? null;
    });

    private reuseCache = inject(ReuseCacheService);

    constructor() { }

    setProjects(projects: Projeto[]) {
        this._projects.set(projects);

        const savedId = localStorage.getItem('selectedProjectId');
        if (savedId) {
            this._selectedId.set(savedId);
        }
    }

    selectProjectById(id: string | null) {
        this._selectedId.set(id);

        if (id) {
            localStorage.setItem('selectedProjectId', id);
        } else {
            localStorage.removeItem('selectedProjectId');
        }

        this.reuseCache.clearCache();
    }
}