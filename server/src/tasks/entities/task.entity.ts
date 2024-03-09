import { TaskStatus, TaskUrgency } from 'src/tasks/enums/tasks.enums';
import { User } from 'src/users/entities/user.entity';
import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity()
export class Task {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  title: string;

  @Column()
  description: string;

  @Column()
  assignedTo: string; // TODO: Change to User entity

  @Column()
  urgency: TaskUrgency;

  @Column()
  status: TaskStatus;

  @CreateDateColumn()
  createdAt: Date;

  @ManyToOne(() => User, (user) => user.tasks, { eager: false })
  user: User;
}
