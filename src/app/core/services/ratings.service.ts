import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class RatingsService {
  getFilledStars(rating?: number) {
    return Array.from({ length: rating ?? 0 });
  }

  getOutlinedStars(rating?: number) {
    return Array.from({ length: 5 - (rating ?? 0) });
  }
}
