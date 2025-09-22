import { CurrencyPipe } from '@angular/common';
import { Component, inject, input, OnInit, signal } from '@angular/core';
import { ToastService } from '@app/core/services/toast.service';
import { AuthStore } from '@app/features/auth/store/auth.store';
import { CartService } from '@app/features/cart/services/cart.service';
import { CartStore } from '@app/features/cart/store/cart.store';
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
  readonly cartSore = inject(CartStore);
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
    return this.cartSore.addToCart(data)?.subscribe();
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
