import { Injectable } from '@angular/core';
import { ApplicationRef } from '@angular/core';
import * as AOS from 'aos';

@Injectable({ providedIn: 'root' })
export class AosService {
  private initialized = false;

  constructor(appRef: ApplicationRef) {
    appRef.isStable.subscribe((stable) => {
      if (stable && !this.initialized) {
        AOS.init({
          duration: 800,
          once: true,
          offset: 100,
        });
        this.initialized = true;

        setTimeout(() => AOS.refresh(), 200);
      }
    });
  }

  refresh() {
    AOS.refresh();
  }
}
