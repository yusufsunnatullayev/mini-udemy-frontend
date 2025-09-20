import { HttpClient, HttpParams } from '@angular/common/http';
import { computed, inject, Injectable, signal } from '@angular/core';
import { environment } from '@environments/environment';
import { Observable, tap } from 'rxjs';
import { ICourse } from '../models/course.model';

@Injectable({
  providedIn: 'root',
})
export class CoursesService {
  private http$ = inject(HttpClient);
  private api$ = environment.apiUrl;

  private _courses = signal<ICourse[]>([]);
  courses = computed(() => this._courses());

  private _loading = signal(false);
  loading = computed(() => this._loading());

  getCourses(search?: string, sortBy?: string, sortOrder: string = 'desc'): Observable<ICourse[]> {
    this._loading.set(true);
    let params = new HttpParams().set('sortOrder', sortOrder);

    if (search) {
      params = params.set('search', search);
    }

    if (sortBy) {
      params = params.set('sortBy', sortBy);
    }

    return this.http$.get<ICourse[]>(`${this.api$}/courses`, { params }).pipe(
      tap({
        next: (res) => {
          this._courses.set(res);
          this._loading.set(false);
        },
        error: () => {
          this._loading.set(false);
        },
      })
    );
  }

  getCourseById(id: string): Observable<ICourse> {
    return this.http$.get<ICourse>(`${this.api$}/courses/${id}`);
  }

  loadCoursesIfEmpty(): void {
    if (this._courses().length === 0) {
      this.getCourses().subscribe();
    }
  }
}
