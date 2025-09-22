import { Component, inject, input, OnInit } from '@angular/core';
import { ICourse } from '../../models/course.model';
import { CurrencyPipe } from '@angular/common';
import { ButtonModule } from 'primeng/button';
import { LucideAngularModule, ShoppingCart, Heart, Star } from 'lucide-angular';
import { Router } from '@angular/router';
import { AuthStore } from '@app/features/auth/store/auth.store';
import { ToastService } from '@app/core/services/toast.service';
import { FavouritesStore } from '@app/features/favourites/store/favourites.store';
import { RatingsService } from '@app/core/services/ratings.service';
import { CartStore } from '@app/features/cart/store/cart.store';

@Component({
  selector: 'app-course-card',
  templateUrl: './course-card.html',
  standalone: true,
  imports: [CurrencyPipe, ButtonModule, LucideAngularModule],
})
export class CourseCardComponent implements OnInit {
  private authStore = inject(AuthStore);
  readonly cartStore = inject(CartStore);
  private toastService = inject(ToastService);
  readonly favouritesStore = inject(FavouritesStore);
  readonly ratingsService = inject(RatingsService);
  course = input<ICourse>();
  router = inject(Router);

  ShoppingCartIcon = ShoppingCart;
  HeartIcon = Heart;
  StarIcon = Star;

  constructor() {}

  ngOnInit(): void {}

  get isFavourite() {
    return this.favouritesStore.isFavourite(this.course()?.id || '');
  }

  addToCart() {
    if (!this.authStore.isAuthenticated()) {
      this.toastService.warn('Warning', 'You must be logged in to add course to cart!');
      return;
    }

    const data = {
      userId: this.authStore.user()?.id || '',
      courseId: this.course()?.id || '',
    };
    return this.cartStore.addToCart(data)?.subscribe();
  }

  toggleFavvourite() {
    if (!this.authStore.isAuthenticated()) {
      this.toastService.warn('Warning', 'You must be logged in to add course to cart!');
      return;
    }

    const data = {
      userId: this.authStore.user()?.id || '',
      courseId: this.course()?.id || '',
    };

    if (this.isFavourite) {
      return this.favouritesStore.removeFavourite(data.userId, data.courseId).subscribe();
    }

    return this.favouritesStore.addToFavourites(data).subscribe();
  }
}
