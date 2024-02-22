import { User } from "src/users/domain/user";

export class Article {
  id: number|string;
  name: string;
  description: string | null;
  user:User;
  postDate:Date;
  createdAt: Date;
  updatedAt: Date;
  isActive: boolean;
}
