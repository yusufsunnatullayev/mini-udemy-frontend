import { inject, Injectable } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';

@Injectable({
  providedIn: 'root',
})
export class CookieServices {
  private cookieService = inject(CookieService);

  set(name: string, value: any, expiresIn: number = 1) {
    this.cookieService.set(name, value, expiresIn);
  }

  get(name: string) {
    return this.cookieService.get(name);
  }

  remove(name: string) {
    this.cookieService.delete(name);
  }
}
