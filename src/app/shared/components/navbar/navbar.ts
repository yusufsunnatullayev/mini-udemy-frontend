import { Component, inject, OnInit, signal, ViewChild, OnDestroy } from '@angular/core';
import { Router, RouterLink, RouterLinkActive } from '@angular/router';
import { ButtonModule } from 'primeng/button';
import { LucideAngularModule, Moon, Sun, User, ShoppingCart } from 'lucide-angular';
import { AuthService } from '@features/auth/services/auth.service';
import { Popover, PopoverModule } from 'primeng/popover';
import { Subscription } from 'rxjs';
import { AuthStore } from '@app/features/auth/store/auth.store';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.html',
  standalone: true,
  imports: [ButtonModule, RouterLink, RouterLinkActive, LucideAngularModule, PopoverModule],
})
export class NavbarComponent implements OnInit, OnDestroy {
  readonly authStore = inject(AuthStore);
  authService = inject(AuthService);
  router = inject(Router);
  isDarkMode = signal(localStorage.getItem('mode') === 'dark');

  @ViewChild('op') popover!: Popover;

  private subscription = new Subscription();

  navbarItems = [
    {
      id: 1,
      title: 'Home',
      link: '/',
    },
    {
      id: 2,
      title: 'Courses',
      link: '/courses',
    },
    {
      id: 3,
      title: 'Favourites',
      link: '/favourites',
    },
  ];

  MoonIcon = Moon;
  SunIcon = Sun;
  UserIcon = User;
  ShoppingCartIcon = ShoppingCart;

  ngOnInit(): void {
    const element = document.querySelector('html');
    if (!element) return;

    if (this.isDarkMode()) {
      element.classList.add('my-app-dark');
    } else {
      element.classList.remove('my-app-dark');
    }
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  togglePopover(event: Event) {
    this.popover.toggle({ currentTarget: event.currentTarget as HTMLElement });
  }

  logout() {
    this.authStore.logout();
    this.popover.hide();
  }

  toggleDarkMode() {
    const element = document.querySelector('html');
    if (!element) return;

    const isDark = element.classList.toggle('my-app-dark');
    this.isDarkMode.set(isDark);
    localStorage.setItem('mode', isDark ? 'dark' : 'light');
  }
}
