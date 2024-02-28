import { PartialType } from '@nestjs/mapped-types';
import { CreateUserDto } from 'src/users/dto/create-user.dto';
import { UserRole } from 'src/users/enums/users.enums';

export class UpdateUserDto extends PartialType(CreateUserDto) {
  username?: string;
  password?: string;
  email?: string;
  role?: UserRole;
}
