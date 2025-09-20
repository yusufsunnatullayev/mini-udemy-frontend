import { signalStore, withMethods, withState, patchState } from '@ngrx/signals';
import { IFavourite } from '../models/favourite.interface';
import { inject } from '@angular/core';
import { FavouritesService } from '../services/favourite.service';
import { IToFavourite } from '../models/toFavourite.interface';
import { tap } from 'rxjs';
import { ToastService } from '@app/core/services/toast.service';

interface FavouritesState {
  favourites: IFavourite[];
  loading: boolean;
}

const initialState: FavouritesState = {
  favourites: [],
  loading: false,
};

export const FavouritesStore = signalStore(
  { providedIn: 'root' },
  withState(initialState),
  withMethods((store) => {
    const favouritesService = inject(FavouritesService);
    const toastService = inject(ToastService);

    return {
      getAllFavourites(userId: string) {
        patchState(store, { loading: true });

        return favouritesService.getFavourites(userId).pipe(
          tap({
            next: (favs) => {
              patchState(store, { favourites: favs, loading: false });
            },
            error: () => {
              patchState(store, { loading: false });
            },
          })
        );
      },
      addToFavourites(data: IToFavourite) {
        return favouritesService.addToFavourite(data).pipe(
          tap({
            next: (newFav: any) => {
              patchState(store, {
                favourites: [...store.favourites(), newFav],
              });
              toastService.success('Success', 'Course addedd to favourities');
            },
            error: (res) => {
              toastService.error('Error', `${res.error.message || 'Failed to add to favourities'}`);
            },
          })
        );
      },

      removeFavourite(userId: string, courseId: string) {
        return favouritesService.deleteFavourite(userId, courseId).pipe(
          tap({
            next: () => {
              patchState(store, {
                favourites: store
                  .favourites()
                  .filter((fav) => fav.userId !== userId || fav.courseId !== courseId),
              });
              toastService.success('Success', 'Course removed from favourities');
            },
            error: (res) => {
              toastService.error(
                'Error',
                `${res.error.message || 'Failed to remove from favourities'}`
              );
            },
          })
        );
      },

      isFavourite(courseId: string): boolean {
        return store.favourites().some((fav) => fav.courseId === courseId);
      },
    };
  })
);
