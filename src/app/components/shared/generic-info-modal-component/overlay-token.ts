import { InjectionToken } from '@angular/core';
import { OverlayRef } from '@angular/cdk/overlay';

export const DIALOG_OVERLAY_REF = new InjectionToken<OverlayRef>('DIALOG_OVERLAY_REF');
