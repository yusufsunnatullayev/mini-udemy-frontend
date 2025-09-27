import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { environment } from '@environments/environment';
import { ILogin, IRegister, Profile } from '../models/auth.model';
import { Observable, switchMap, tap } from 'rxjs';
import { CookieServices } from '@app/core/services/cookie.service';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private http$ = inject(HttpClient);
  private api$ = `${environment.apiUrl}/auth`;
  private cookieService = inject(CookieServices);

  login(data: ILogin): Observable<Profile> {
    return this.http$.post<{ access_token: string }>(`${this.api$}/login`, data).pipe(
      tap((res) => {
        this.cookieService.set('access_token', res.access_token);
      }),
      switchMap(() => this.getProfile())
    );
  }

  register(data: IRegister): Observable<Profile> {
    return this.http$.post<{ access_token: string }>(`${this.api$}/register`, data).pipe(
      tap((res) => {
        this.cookieService.set('access_token', res.access_token);
      }),
      switchMap(() => this.getProfile())
    );
  }

  getProfile(): Observable<Profile> {
    return this.http$.get<Profile>(`${this.api$}/profile`);
  }
}
