import { Component, inject, input, OnInit } from '@angular/core';
import { RatingsService } from '@app/core/services/ratings.service';
import { ICourse } from '@app/features/courses/models/course.model';
import { LucideAngularModule, BookCheck, AlarmClockCheck, Globe } from 'lucide-angular';

@Component({
  selector: 'app-course-detail-content',
  templateUrl: './course-detail-content.html',
  standalone: true,
  imports: [LucideAngularModule],
})
export class CourseDetailContentComponent implements OnInit {
  course = input<ICourse | null>(null);
  readonly ratingsService = inject(RatingsService);

  BookCheckIcon = BookCheck;
  AlarmClockCheckIcon = AlarmClockCheck;
  GlobeIcon = Globe;

  constructor() {}

  ngOnInit(): void {}
}
