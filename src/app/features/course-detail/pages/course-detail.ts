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

  constructor() {}

  ngOnInit(): void {
    this.route.paramMap.subscribe((params) => {
      this.courseId.set(params.get('id')!);
    });
    this.loading.set(true);

    this.courseService.getCourseById(this.courseId()).subscribe({
      next: (data) => {
        this.course.set(data);
        this.loading.set(false);
        console.log(data);
      },
      error: () => {
        this.loading.set(false);
      },
    });
  }
}
