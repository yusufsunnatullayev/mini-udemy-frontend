import { Component, inject } from '@angular/core';
import { NavbarComponent } from './shared/components/navbar/navbar';
import { NavigationEnd, Router, RouterOutlet } from '@angular/router';
import { ToastModule } from 'primeng/toast';
import { AosService } from './core/services/aos.service';
import { AuthStore } from './features/auth/store/auth.store';

@Component({
  selector: 'app-root',
  template: `
    <p-toast />
    <div class="w-full h-screen flex flex-col">
      <!-- Navbar 🚩  -->
      <app-navbar />
      <div class="flex-1">
        <!-- Router 🚩  -->
        <router-outlet></router-outlet>
      </div>
    </div>
  `,
  imports: [NavbarComponent, RouterOutlet, ToastModule],
})
export class App {
  private authStore = inject(AuthStore);

  constructor(router: Router, aos: AosService) {
    this.authStore.restoreSession();
    router.events.subscribe((event) => {
      if (event instanceof NavigationEnd) {
        setTimeout(() => aos.refresh(), 200);
      }
    });
  }

  toggleDarkMode() {
    const element = document.querySelector('html');
    element?.classList.toggle('my-app-dark');
  }
}
