import { Routes } from '@angular/router';
import { NoAuthGuard } from './core/guards/no-auth.guard';
import { AuthGuard } from './core/guards/auth.guard';

export const routes: Routes = [
  {
    path: '',
    loadComponent: () => import('./features/home/pages/home').then((c) => c.HomeComponent),
  },
  {
    path: 'login',
    canActivate: [NoAuthGuard],
    loadComponent: () => import('./features/auth/login/pages/login').then((c) => c.LoginComponent),
  },
  {
    path: 'register',
    canActivate: [NoAuthGuard],
    loadComponent: () =>
      import('./features/auth/register/pages/register').then((c) => c.RegisterComponent),
  },
  {
    path: 'courses',
    loadComponent: () => import('./features/courses/pages/courses').then((c) => c.CoursesComponent),
  },
  {
    path: 'courses/:id',
    canActivate: [AuthGuard],
    loadComponent: () =>
      import('./features/course-detail/pages/course-detail').then((c) => c.CourseDetailComponent),
  },
  {
    path: 'favourites',
    canActivate: [AuthGuard],
    loadComponent: () =>
      import('./features/favourites/pages/favourites').then((c) => c.FavouritesComponent),
  },
  {
    path: 'cart',
    canActivate: [AuthGuard],
    loadComponent: () => import('./features/cart/pages/cart').then((c) => c.CartComponent),
  },
];
