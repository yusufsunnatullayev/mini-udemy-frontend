import { HttpClient, HttpParams } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { environment } from '@environments/environment';
import { IToFavourite } from '../models/toFavourite.interface';
import { Observable } from 'rxjs';
import { IFavourite } from '../models/favourite.interface';

@Injectable({
  providedIn: 'root',
})
export class FavouritesService {
  private http$ = inject(HttpClient);
  private api$ = environment.apiUrl;

  getFavourites(userId: string): Observable<IFavourite[]> {
    let params = new HttpParams().set('userId', userId);
    return this.http$.get<IFavourite[]>(`${this.api$}/favourites`, { params });
  }

  addToFavourite(data: IToFavourite) {
    return this.http$.post(`${this.api$}/favourites`, data);
  }

  deleteFavourite(userId: string, courseId: string) {
    let params = new HttpParams().set('userId', userId).set('courseId', courseId);
    return this.http$.delete(`${this.api$}/favourites`, { params });
  }
}
