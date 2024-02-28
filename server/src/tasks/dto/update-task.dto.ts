import { CreateTaskDto } from './create-task.dto';
import { PartialType } from '@nestjs/mapped-types';
import { TaskStatus, TaskUrgency } from 'src/tasks/enums/tasks.enums';

export class UpdateTaskDto extends PartialType(CreateTaskDto) {
  title?: string;
  description?: string;
  assignedTo?: string;
  urgency?: TaskUrgency;
  status?: TaskStatus;
}
