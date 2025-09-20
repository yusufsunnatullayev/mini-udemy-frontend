import { Component, inject, OnInit } from '@angular/core';
import { CoursesService } from '../services/courses.service';
import { CourseCardComponent } from '../components/course-card/course-card';
import { CourseCardSkeletonComponent } from '../components/course-card-skeleton/course-card-skeleton';
import { CoursesFilterComponent } from '../components/course-filter/course-filter';

@Component({
  selector: 'app-courses',
  templateUrl: './courses.html',
  imports: [CourseCardComponent, CourseCardSkeletonComponent, CoursesFilterComponent],
})
export class CoursesComponent implements OnInit {
  readonly coursesService = inject(CoursesService);
  skeletons = Array.from({ length: 4 });

  filterTypes = [
    { name: 'Price', code: 'price' },
    { name: 'Rating', code: 'rating' },
  ];

  orderTypes = [
    { name: 'Ascending', code: 'asc' },
    { name: 'Descending', code: 'desc' },
  ];

  ngOnInit(): void {
    this.coursesService.loadCoursesIfEmpty();
  }

  onFiltersChanged(event: { search: string; filter?: string; order?: string }): void {
    this.coursesService.getCourses(event.search, event.filter, event.order ?? 'desc').subscribe();
  }
}
