import { Exclude, Expose } from 'class-transformer';

export class User {
  id: number | string;

  @Expose({ groups: ['me', 'admin'] })
  email: string | null;

  @Exclude({ toPlainOnly: true })
  password?: string;


  @Expose({ groups: ['me', 'admin'] })
  username: string | null;
  createdAt: Date;
  updatedAt: Date;
  isActive: boolean;
}
