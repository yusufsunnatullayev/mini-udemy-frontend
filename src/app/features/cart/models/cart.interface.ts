import { ICourse } from '@app/features/courses/models/course.model';

export interface ICart {
  id: string;
  userId: string;
  courseId: string;
  createdAt: string;
  updatedAt: string;
  course: ICourse;
}
