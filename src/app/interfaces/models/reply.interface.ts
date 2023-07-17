import { User } from './user.interface';

export interface Reply {
  replyId: number;
  postId: number;
  user: User;
  reply: string;
  createdAt: string;
}
