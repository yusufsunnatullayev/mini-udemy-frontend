import { Component, inject, input, OnInit, signal } from '@angular/core';
import { ICourse } from '@app/features/courses/models/course.model';
import { InputTextModule } from 'primeng/inputtext';
import { SelectModule } from 'primeng/select';
import { CourseReviewCardComponent } from '../course-review-card/course-review-card';
import { TextareaModule } from 'primeng/textarea';
import { FormsModule } from '@angular/forms';
import { ISelectOption } from '@app/core/models/select-option.model';
import { ButtonModule } from 'primeng/button';
import { CourseDetailService } from '../../services/course-detail.service';
import { AuthStore } from '@app/features/auth/store/auth.store';
import { ToastService } from '@app/core/services/toast.service';
import { CarouselModule } from 'primeng/carousel';

@Component({
  selector: 'app-course-detail-reviews',
  templateUrl: './course-detail-reviews.html',
  standalone: true,
  imports: [
    CourseReviewCardComponent,
    FormsModule,
    InputTextModule,
    TextareaModule,
    SelectModule,
    ButtonModule,
    CarouselModule,
  ],
})
export class CourseDetailReviewsComponent implements OnInit {
  private courseDetailService = inject(CourseDetailService);
  private toastService = inject(ToastService);
  readonly authStore = inject(AuthStore);
  course = input<ICourse | null>(null);

  constructor() {}
  value!: string;
  selectedRate: ISelectOption | undefined;
  rates: ISelectOption[] | undefined;

  isSubmitting = signal(false);

  ngOnInit() {
    this.rates = [
      { name: '5', code: '5' },
      { name: '4', code: '4' },
      { name: '3', code: '3' },
      { name: '2', code: '2' },
      { name: '1', code: '1' },
    ];
  }

  addReview() {
    if (!this.value || !this.selectedRate) {
      return this.toastService.error('Error', 'The fields must be filled!');
    }

    this.isSubmitting.set(true);
    const data = {
      userName: this.authStore.user()?.fullName || '',
      rate: Number(this.selectedRate),
      userId: this.authStore.user()?.id || '',
      courseId: this.course()?.id || '',
      comment: this.value,
    };

    this.courseDetailService.addReview(data).subscribe({
      next: () => {
        this.value = '';
        this.toastService.success('Success', 'Review added!');
        this.isSubmitting.set(false);
      },
      error: (res) => {
        this.value = '';
        this.toastService.error('Error', `${res.error.message || 'Failed to add review!'}`);
        this.isSubmitting.set(false);
      },
    });
  }
}
