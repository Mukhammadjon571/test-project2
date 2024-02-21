import { User } from "src/users/domain/user";

export class Article {
  name: string;
  description: string | null;
  user:User;
  createdAt: Date;
  updatedAt: Date;
  isActive: boolean;
}
