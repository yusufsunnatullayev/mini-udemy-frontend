import { Component, inject, OnInit } from '@angular/core';
import { CartStore } from '../store/cart.store';
import { AuthStore } from '@app/features/auth/store/auth.store';
import { CartItemCardComponent } from '../components/cart-item-card/cart-item-card';
import { CartSummaryComponent } from '../components/cart-summary/cart-summary';
import { CartItemSkeletonComponent } from '../components/cart-item-skeleton/cart-item-skeleton';
import { NameComponent } from '@app/shared/components/no-data/no-data';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.html',
  standalone: true,
  imports: [CartItemCardComponent, CartSummaryComponent, CartItemSkeletonComponent, NameComponent],
})
export class CartComponent implements OnInit {
  readonly cartStore = inject(CartStore);
  readonly authStore = inject(AuthStore);

  constructor() {}

  ngOnInit(): void {
    this.cartStore.getCartCourses(this.authStore.user()?.id || '').subscribe((data) => {
      console.log(data);
    });
  }
}
