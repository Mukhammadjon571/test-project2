import { User } from '../../../domain/user';
import { UserEntity } from '../entities/user.entity';


export class UserMapper {
  static toDomain(raw: UserEntity): User {
    const user = new User();
    user.id = raw.id;
    user.email = raw.email;
    user.password = raw.password;
    user.username = raw.username;
    user.createdAt = raw.createdAt;
    user.updatedAt = raw.updatedAt;
    user.isActive = raw.isActive;
    return user;
  }

  static toPersistence(user: User): UserEntity {
    const userEntity = new UserEntity();
    if (user.id && typeof user.id === 'number') {
      userEntity.id = user.id;
    }
    userEntity.email = user.email;
    userEntity.password = user.password;
    userEntity.username = user.username;
    userEntity.createdAt = user.createdAt;
    userEntity.updatedAt = user.updatedAt;
    userEntity.isActive = user.isActive;
    return userEntity;
  }
}
