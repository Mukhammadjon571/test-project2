import {
  Column,
  CreateDateColumn,
  Entity,
  Index,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
  
} from 'typeorm';
import { EntityRelationalHelper } from 'src/utils/relational-entity-helper';

import { Exclude, Expose } from 'class-transformer';
import { User } from '../../../../domain/user';

@Entity({
  name: 'user',
})
export class UserEntity extends EntityRelationalHelper implements User {
  static toPersistence(user: any): any {
    throw new Error("Method not implemented.");
  }
  @PrimaryGeneratedColumn()
  id: number;
 
  @Column({ type: String, unique: true, nullable: true })
  @Expose({ groups: ['me', 'admin'] })
  email: string | null;

  @Column({ nullable: true })
  @Exclude({ toPlainOnly: true })
  password?: string;


  @Index()
  @Column({ type: String, nullable: true })
  username: string | null;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @Column('boolean', {default: true})
  isActive: boolean;
}
