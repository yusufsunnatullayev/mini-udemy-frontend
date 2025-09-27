import { HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { CookieServices } from '../services/cookie.service';

export const authInterceptor: HttpInterceptorFn = (req, next) => {
  const cookieService = inject(CookieServices);
  const token = cookieService.get('access_token');

  const authReq = token
    ? req.clone({
        headers: req.headers.set('Authorization', `Bearer ${token}`),
      })
    : req;

  return next(authReq);
};
