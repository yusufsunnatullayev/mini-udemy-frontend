import { inject } from '@angular/core';
import { patchState, signalStore, withMethods, withState } from '@ngrx/signals';
import { ILogin, IRegister, Profile } from '../models/auth.model';
import { AuthService } from '../services/auth.service';
import { ToastService } from '@app/core/services/toast.service';
import { Router } from '@angular/router';

interface AuthState {
  user: Profile | null;
  isAuthenticated: boolean;
  loading: boolean;
}

const initialState: AuthState = {
  user: null,
  isAuthenticated: false,
  loading: false,
};

export const AuthStore = signalStore(
  { providedIn: 'root' },
  withState(initialState),
  withMethods((store) => {
    const authService = inject(AuthService);
    const toastService = inject(ToastService);
    const router = inject(Router);

    return {
      login(data: ILogin) {
        patchState(store, { loading: true });
        authService.login(data).subscribe({
          next: (profile) => {
            patchState(store, {
              user: profile,
              isAuthenticated: true,
              loading: false,
            });
            localStorage.setItem('profile', JSON.stringify(profile));
            localStorage.setItem('isAuthenticated', 'true');

            toastService.success('Success', 'You have logged in!');
            router.navigate(['/']);
          },
          error: (res) => {
            patchState(store, { loading: false });
            toastService.error('Error', `${res.error.message || 'Failed to log in!'}`);
          },
        });
      },

      register(data: IRegister) {
        patchState(store, { loading: true });
        authService.register(data).subscribe({
          next: (profile) => {
            patchState(store, {
              user: profile,
              isAuthenticated: true,
              loading: false,
            });
            localStorage.setItem('profile', JSON.stringify(profile));
            localStorage.setItem('isAuthenticated', 'true');

            toastService.success('Success', 'You have registered!');
            router.navigate(['/']);
          },
          error: (res) => {
            patchState(store, { loading: false });
            toastService.error('Error', `${res.error.message || 'Failed to register!'}`);
          },
        });
      },

      logout() {
        patchState(store, { user: null, isAuthenticated: false });
        localStorage.removeItem('profile');
        localStorage.removeItem('isAuthenticated');
        localStorage.removeItem('access_token');
        router.navigate(['/login']);
      },

      restoreSession() {
        const profileStr = localStorage.getItem('profile');
        const isAuth = localStorage.getItem('isAuthenticated') === 'true';
        if (profileStr && isAuth) {
          const profile: Profile = JSON.parse(profileStr);
          patchState(store, { user: profile, isAuthenticated: true });
        }
      },
    };
  })
);
