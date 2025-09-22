import { patchState, signalStore, withMethods, withState } from '@ngrx/signals';
import { ICart } from '../models/cart.interface';
import { inject } from '@angular/core';
import { CartService } from '../services/cart.service';
import { ToastService } from '@app/core/services/toast.service';
import { tap } from 'rxjs';
import { IToCart } from '../models/toCart.interface';
import { Router } from '@angular/router';

interface CartState {
  cart: ICart[];
  loading: boolean;
}

const initialState: CartState = {
  cart: [],
  loading: false,
};

export const CartStore = signalStore(
  { providedIn: 'root' },
  withState(initialState),
  withMethods((store) => {
    const cartService = inject(CartService);
    const toastService = inject(ToastService);
    const router = inject(Router);

    return {
      getCartCourses(userId: string) {
        patchState(store, { loading: true });

        return cartService.getCartCourses(userId).pipe(
          tap({
            next: (cart) => {
              patchState(store, { cart, loading: false });
            },
            error: () => {
              patchState(store, { loading: false });
            },
          })
        );
      },

      addToCart(data: IToCart) {
        const existingItem = store.cart().find((item) => item.courseId === data.courseId);
        if (existingItem) {
          toastService.info('Info', 'Course is already in the cart!');
          return;
        }
        return cartService.addToCart(data).pipe(
          tap({
            next: (newCartItem: any) => {
              patchState(store, {
                cart: [...store.cart(), newCartItem],
              });
              toastService.success('Success', 'Course added to cart!');
            },
            error: (res) => {
              toastService.error(
                'Error',
                `${res.error.message || 'Failed to add course to cart'!}`
              );
            },
          })
        );
      },

      removeFromCart(id: string) {
        return cartService.deleteFromCart(id).pipe(
          tap({
            next: () => {
              patchState(store, {
                cart: store.cart().filter((item) => item.id !== id),
              });
              toastService.success('Success', 'Course removed from cart!');
            },
            error: (res) => {
              toastService.error(
                'Error',
                `${res.error.message || 'Failed to remove course from cart!'}`
              );
            },
          })
        );
      },

      clearCart() {
        store.cart().forEach((item) => {
          cartService.deleteFromCart(item.id).subscribe();
        });
        patchState(store, { cart: [] });
        router.navigate(['/courses']);
      },

      getTotal() {
        return store.cart().reduce((total, item) => total + item.course.price, 0);
      },
    };
  })
);
