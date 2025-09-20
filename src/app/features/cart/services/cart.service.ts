import { HttpClient, HttpParams } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { environment } from '@environments/environment';
import { IToCart } from '../models/toCart.interface';
import { ICart } from '../models/cart.interface';

@Injectable({
  providedIn: 'root',
})
export class CartService {
  private http$ = inject(HttpClient);
  private api$ = environment.apiUrl;

  getCartCourses(userId: string) {
    let params = new HttpParams().set('userId', userId);
    return this.http$.get<ICart[]>(`${this.api$}/cart`, { params });
  }

  addToCart(data: IToCart) {
    return this.http$.post(`${this.api$}/cart`, data);
  }

  deleteFromCart(id: string) {
    return this.http$.delete(`${this.api$}/cart/${id}`);
  }
}
