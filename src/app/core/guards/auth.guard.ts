import { inject, Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { CookieServices } from '../services/cookie.service';

@Injectable({
  providedIn: 'root',
})
export class AuthGuard implements CanActivate {
  private router = inject(Router);
  private cookieService = inject(CookieServices);

  canActivate(): boolean {
    const token = this.cookieService.get('access_token');
    if (token) {
      return true;
    } else {
      this.router.navigate(['/login']);
      return false;
    }
  }
}
