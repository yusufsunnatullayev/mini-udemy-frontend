import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { environment } from '@environments/environment';
import { IReview } from '../models/review.model';

@Injectable({
  providedIn: 'root',
})
export class CourseDetailService {
  private http$ = inject(HttpClient);
  private api$ = environment.apiUrl;

  addReview(data: IReview) {
    return this.http$.post(`${this.api$}/reviews`, data);
  }
}
