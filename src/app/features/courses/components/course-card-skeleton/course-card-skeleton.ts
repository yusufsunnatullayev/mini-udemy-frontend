import { Component, OnInit } from '@angular/core';
import { Skeleton } from 'primeng/skeleton';

@Component({
  selector: 'app-course-card-skeleton',
  templateUrl: './course-card-skeleton.html',
  standalone: true,
  imports: [Skeleton],
})
export class CourseCardSkeletonComponent implements OnInit {
  constructor() {}

  ngOnInit(): void {}
}
