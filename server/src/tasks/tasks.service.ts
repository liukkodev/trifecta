import { CreateTaskDto } from './dto/create-task.dto';
import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Task } from 'src/tasks/entities/task.entity';
import { TaskStatus } from 'src/tasks/enums/tasks.enums';
import { UpdateTaskDto } from './dto/update-task.dto';
import { RemoveTaskResponse } from 'src/tasks/types/task.types';
import { User } from 'src/users/entities/user.entity';

@Injectable()
export class TasksService {
  constructor(
    @InjectRepository(Task)
    private tasksRepository: Repository<Task>,
  ) {}

  async create(createTaskDto: CreateTaskDto, user: User): Promise<Task> {
    console.log('user', user);

    try {
      const task = this.tasksRepository.create({
        ...createTaskDto,
        user,
      });

      return await this.tasksRepository.save(task);
    } catch (err) {
      throw new Error(err);
    }
  }

  async findAll(): Promise<Task[]> {
    try {
      return await this.tasksRepository.find({ order: { createdAt: 'DESC' } });
    } catch (err) {
      throw new Error(err);
    }
  }

  async findOne(id: string): Promise<Task> {
    try {
      const task = await this.tasksRepository.findOne({
        where: { id },
      });

      if (!task) {
        throw new NotFoundException(`Task with ID ${id} not found`);
      }

      return task;
    } catch (err) {
      throw new Error(err);
    }
  }

  async update(id: string, updateTaskDto: UpdateTaskDto): Promise<Task> {
    try {
      const res = await this.tasksRepository.update(
        { id },
        { ...updateTaskDto },
      );

      if (res.affected === 0) {
        throw new NotFoundException(`Task with ID ${id} not found`);
      }

      return await this.findOne(id);
    } catch (err) {
      throw new Error(err);
    }
  }

  async remove(id: string): Promise<RemoveTaskResponse> {
    try {
      const res = await this.tasksRepository.delete({ id });

      if (res.affected === 0) {
        throw new NotFoundException(`Task with ID ${id} not found`);
      }

      return { message: 'Task deleted successfully', status: 200 };
    } catch (err) {
      throw new Error(err);
    }
  }

  async removeAll(): Promise<void> {
    try {
      return await this.tasksRepository.clear();
    } catch (err) {
      throw new Error(err);
    }
  }

  async findPending(): Promise<Task[]> {
    return this.findTasksByStatus(TaskStatus.PENDING);
  }

  async findInProgress(): Promise<Task[]> {
    return this.findTasksByStatus(TaskStatus.IN_PROGRESS);
  }

  async findDone(): Promise<Task[]> {
    return this.findTasksByStatus(TaskStatus.DONE);
  }

  private async findTasksByStatus(status: TaskStatus): Promise<Task[]> {
    try {
      const res = await this.tasksRepository.find({
        where: { status },
        order: { createdAt: 'DESC' },
      });

      return res;
    } catch (err) {
      throw new Error(err);
    }
  }
}
