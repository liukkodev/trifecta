import { UserRole } from 'src/users/enums/users.enums';
import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity()
export class User {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ unique: true })
  username: string;

  @Column()
  password?: string;

  @Column()
  email: string;

  @Column()
  role: UserRole;

  @CreateDateColumn()
  createdAt: Date;

  @Column({ nullable: true })
  refreshToken?: string;
}
