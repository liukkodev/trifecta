import { TaskStatus, TaskUrgency } from 'src/tasks/enums/tasks.enums';
import {
  Column,
  CreateDateColumn,
  Entity,
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
}
