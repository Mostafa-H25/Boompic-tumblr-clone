export interface User {
  userId: number;
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  profilePic: string;
  birthday: string;
  following: Set<number>;
  followers: Set<number>;
  blocked: Set<number>;
  tags: Set<string>;
  createdAt: string;
  isVerified: boolean;
  isActive: boolean;
  isAuthenticated: boolean;
  status: string;
}
