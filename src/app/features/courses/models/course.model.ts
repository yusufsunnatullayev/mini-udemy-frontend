export interface ICourse {
  author: string;
  authorPic: string;
  createdAt: string;
  description: string;
  hours: string;
  id: string;
  image: string;
  language: string;
  lessons: number;
  price: number;
  rating: number;
  title: string;
  updatedAt: string;
  reviews?: IReview[];
}

export interface IReview {
  id: string;
  comment: string;
  courseId: string;
  createdAt: string;
  rate: number;
  updatedAt: string;
  userId: string;
  userName: string;
}
