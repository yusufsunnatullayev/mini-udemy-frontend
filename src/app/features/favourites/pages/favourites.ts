import { Component, inject, OnInit } from '@angular/core';
import { FavouritesStore } from '../store/favourites.store';
import { AuthStore } from '@app/features/auth/store/auth.store';
import { CourseCardComponent } from '@app/features/courses/components/course-card/course-card';
import { CourseCardSkeletonComponent } from '@app/features/courses/components/course-card-skeleton/course-card-skeleton';
import { NameComponent } from '@app/shared/components/no-data/no-data';

@Component({
  selector: 'app-favourites',
  templateUrl: './favourites.html',
  imports: [CourseCardComponent, CourseCardSkeletonComponent, NameComponent],
})
export class FavouritesComponent implements OnInit {
  readonly favouritesStore = inject(FavouritesStore);
  readonly authStore = inject(AuthStore);
  skeletons = Array.from({ length: 4 });

  constructor() {}

  ngOnInit(): void {
    const userId = this.authStore.user()?.id || '';
    this.favouritesStore.getAllFavourites(userId).subscribe();
  }
}
