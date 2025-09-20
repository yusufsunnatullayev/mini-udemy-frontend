import { CurrencyPipe } from '@angular/common';
import { Component, inject, input, OnInit, signal } from '@angular/core';
import { ToastService } from '@app/core/services/toast.service';
import { AuthStore } from '@app/features/auth/store/auth.store';
import { CartService } from '@app/features/cart/services/cart.service';
import { ICourse } from '@app/features/courses/models/course.model';
import { FavouritesStore } from '@app/features/favourites/store/favourites.store';
import { LucideAngularModule, ShoppingCart } from 'lucide-angular';
import { ButtonModule } from 'primeng/button';

@Component({
  selector: 'app-course-detail-action',
  templateUrl: './course-detail-action.html',
  standalone: true,
  imports: [CurrencyPipe, ButtonModule, LucideAngularModule],
})
export class CourseDetailActionComponent implements OnInit {
  readonly authStore = inject(AuthStore);
  readonly favouritesStore = inject(FavouritesStore);
  private toastService = inject(ToastService);
  private cartService = inject(CartService);
  course = input<ICourse | null>(null);

  ShoppingCartIcon = ShoppingCart;
  isAddingToFavourities = signal(false);
  isAddingToCart = signal(false);

  constructor() {}

  ngOnInit(): void {}

  addToCart() {
    this.isAddingToCart.set(true);
    const data = {
      userId: this.authStore.user()?.id || '',
      courseId: this.course()?.id || '',
    };
    return this.cartService.addToCart(data).subscribe({
      next: () => {
        this.toastService.success('Success', 'Course added to cart!');
        this.isAddingToCart.set(false);
      },
      error: (res) => {
        this.toastService.error('Error', `${res.error.message || 'Failed to add course to cart'}`);
        this.isAddingToCart.set(false);
      },
    });
  }

  addToFavourite() {
    this.isAddingToFavourities.set(true);
    const data = {
      userId: this.authStore.user()?.id || '',
      courseId: this.course()?.id || '',
    };
    return this.favouritesStore.addToFavourites(data).subscribe({
      next: () => {
        this.isAddingToFavourities.set(false);
      },
      error: () => {
        this.isAddingToFavourities.set(false);
      },
    });
  }
}
