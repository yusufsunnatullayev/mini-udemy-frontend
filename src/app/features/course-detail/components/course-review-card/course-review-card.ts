import { Component, inject, input, OnInit } from '@angular/core';
import { RatingsService } from '@app/core/services/ratings.service';
import { IReview } from '@app/features/courses/models/course.model';
import { LucideAngularModule, User } from 'lucide-angular';

@Component({
  selector: 'app-course-review-card',
  templateUrl: './course-review-card.html',
  standalone: true,
  imports: [LucideAngularModule],
})
export class CourseReviewCardComponent implements OnInit {
  readonly ratingsService = inject(RatingsService);
  item = input<IReview | null>(null);

  UserIcon = User;
  constructor() {}

  ngOnInit(): void {}
}
