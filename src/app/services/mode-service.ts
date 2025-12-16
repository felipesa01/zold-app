import { Injectable, signal } from '@angular/core';


export enum appModes {
  Map = 'MAP',
  Workspace = 'WORKSPACE'
}


@Injectable({
  providedIn: 'root',
})
export class ModeService {

  modeTurn = signal<appModes>(appModes.Map)
  
}
