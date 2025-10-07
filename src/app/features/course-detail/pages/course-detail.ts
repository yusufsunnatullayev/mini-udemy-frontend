import { Component, inject, OnInit, signal } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ICourse } from '@app/features/courses/models/course.model';
import { CoursesService } from '@app/features/courses/services/courses.service';
import { CourseDetailContentComponent } from '../components/course-detail-content/course-detail-content';
import { CourseDetailActionComponent } from '../components/course-detail-action/course-detail-action';
import { CourseDetailReviewsComponent } from '../components/course-detail-reviews/course-detail-reviews';
import { CourseDetailSkeletonComponent } from '../components/course-detail-skeleton/course-detail-skeleton';

@Component({
  selector: 'app-course-detail',
  templateUrl: './course-detail.html',
  standalone: true,
  imports: [
    CourseDetailContentComponent,
    CourseDetailActionComponent,
    CourseDetailReviewsComponent,
    CourseDetailSkeletonComponent,
  ],
})
export class CourseDetailComponent implements OnInit {
  private courseService = inject(CoursesService);
  private route = inject(ActivatedRoute);

  loading = signal(false);
  courseId = signal('');
  course = signal<ICourse | null>(null);

  ngOnInit(): void {
    this.route.paramMap.subscribe((params) => {
      const id = params.get('id');
      if (id) {
        this.courseId.set(id);
        this.fetchCourseById(id);
      }
    });
  }

  fetchCourseById(id: string) {
    this.loading.set(true);
    this.courseService.getCourseById(id).subscribe({
      next: (data) => {
        this.course.set(data);
        this.loading.set(false);
      },
      error: () => this.loading.set(false),
    });
  }

  addReviewToList(newReview: any) {
    const current = this.course();
    if (!current) return;

    const currentReviews = current.reviews || [];

    const existingIndex = currentReviews.findIndex(
      (r) => r.userId === newReview.userId && r.courseId === newReview.courseId
    );

    let updatedReviews;

    if (existingIndex !== -1) {
      updatedReviews = [...currentReviews];
      updatedReviews[existingIndex] = newReview;
    } else {
      updatedReviews = [...currentReviews, newReview];
    }

    this.course.update(() => ({
      ...current,
      reviews: updatedReviews,
    }));
  }

  refreshCourse() {
    if (this.courseId()) {
      this.fetchCourseById(this.courseId());
    }
  }
}
