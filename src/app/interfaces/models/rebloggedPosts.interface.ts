import { User } from './user.interface';

export interface RebloggedPost {
  reblogId: number;
  postId: number;
  user: User;
  caption?: string;
  createdAt: string;
}
