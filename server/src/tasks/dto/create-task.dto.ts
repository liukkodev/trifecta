import { TaskStatus, TaskUrgency } from 'src/tasks/enums/tasks.enums';
import { User } from 'src/users/entities/user.entity';

export class CreateTaskDto {
  title: string;
  description: string;
  assignedTo: string;
  urgency: TaskUrgency;
  status: TaskStatus;
  user: User;
}
