// course-detail-skeleton.component.ts
import { Component } from '@angular/core';
import { SkeletonModule } from 'primeng/skeleton';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-course-detail-skeleton',
  standalone: true,
  imports: [CommonModule, SkeletonModule],
  template: `
    <div class="w-full flex flex-col gap-5">
      <!-- Course Image -->
      <p-skeleton width="100%" height="250px" class="rounded-lg md:h-[400px]"></p-skeleton>

      <!-- Title + Stars -->
      <div class="w-full flex items-center justify-between">
        <p-skeleton width="40%" height="2rem"></p-skeleton>
        <div class="flex items-center gap-1 mb-1">
          <p-skeleton width="1.5rem" height="1.5rem" borderRadius="50%"></p-skeleton>
          <p-skeleton width="1.5rem" height="1.5rem" borderRadius="50%"></p-skeleton>
          <p-skeleton width="1.5rem" height="1.5rem" borderRadius="50%"></p-skeleton>
          <p-skeleton width="1.5rem" height="1.5rem" borderRadius="50%"></p-skeleton>
          <p-skeleton width="1.5rem" height="1.5rem" borderRadius="50%"></p-skeleton>
        </div>
      </div>

      <!-- Lessons, Hours, Language -->
      <div class="flex items-center justify-between md:justify-start gap-5">
        <div class="flex flex-col md:flex-row items-center gap-2">
          <p-skeleton width="1.5rem" height="1.5rem" borderRadius="50%"></p-skeleton>
          <p-skeleton width="6rem" height="1rem"></p-skeleton>
        </div>
        <div class="flex flex-col md:flex-row items-center gap-2">
          <p-skeleton width="1.5rem" height="1.5rem" borderRadius="50%"></p-skeleton>
          <p-skeleton width="5rem" height="1rem"></p-skeleton>
        </div>
        <div class="flex flex-col md:flex-row items-center gap-2">
          <p-skeleton width="1.5rem" height="1.5rem" borderRadius="50%"></p-skeleton>
          <p-skeleton width="7rem" height="1rem"></p-skeleton>
        </div>
      </div>

      <!-- Description -->
      <div class="w-full md:w-3/4 flex flex-col gap-3 mt-3">
        <p-skeleton width="30%" height="1.5rem"></p-skeleton>
        <p-skeleton width="100%" height="5rem"></p-skeleton>
      </div>

      <!-- Author -->
      <div class="flex flex-col gap-3">
        <p-skeleton width="30%" height="1.5rem"></p-skeleton>
        <div class="flex items-center gap-2">
          <p-skeleton width="2.5rem" height="2.5rem" borderRadius="50%"></p-skeleton>
          <p-skeleton width="6rem" height="1.2rem"></p-skeleton>
        </div>
      </div>
    </div>
  `,
})
export class CourseDetailSkeletonComponent {}
