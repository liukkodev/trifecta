import { Task } from 'src/tasks/entities/task.entity';
import { UserRole } from 'src/users/enums/users.enums';
import {
  Column,
  CreateDateColumn,
  Entity,
  OneToMany,
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

  @OneToMany(() => Task, (task) => task.user, { eager: true })
  tasks: Task[];
}
