import { User } from './user.interface';

export interface Post {
  postId: number;
  user: User;
  title?: string;
  caption?: string;
  imageUrl?: string;
  tags: Set<string>;
  likes: Set<number>;
  reblogs: Set<number>;
  replies: Set<number>;
  createdAt: string;
}
