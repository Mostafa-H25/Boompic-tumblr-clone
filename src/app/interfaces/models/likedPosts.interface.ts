import { User } from './user.interface';

export interface LikedPost {
  likeId: number;
  postId: number;
  user: User;
}
