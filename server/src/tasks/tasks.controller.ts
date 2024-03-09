import { CreateTaskDto } from './dto/create-task.dto';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { Task } from 'src/tasks/entities/task.entity';
import { TasksService } from './tasks.service';
import { UpdateTaskDto } from './dto/update-task.dto';
import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
} from '@nestjs/common';
import { RemoveTaskResponse } from 'src/tasks/types/task.types';
import { User } from 'src/users/entities/user.entity';
import { GetUser } from 'src/auth/decorators/get-user.decorator';

@Controller('tasks')
export class TasksController {
  constructor(private readonly tasksService: TasksService) {}

  @UseGuards(JwtAuthGuard)
  @Post('create')
  async create(
    @Body() createTaskDto: CreateTaskDto,
    @GetUser() user: User,
  ): Promise<Task> {
    return await this.tasksService.create(createTaskDto, user);
  }

  @UseGuards(JwtAuthGuard)
  @Get('status/all')
  async findAll(): Promise<Task[]> {
    return await this.tasksService.findAll();
  }

  @UseGuards(JwtAuthGuard)
  @Get(':id')
  async findOne(@Param('id') id: string): Promise<Task> {
    return await this.tasksService.findOne(id);
  }

  @UseGuards(JwtAuthGuard)
  @Patch(':id')
  async update(
    @Param('id') id: string,
    @Body() updateTaskDto: UpdateTaskDto,
  ): Promise<Task> {
    return await this.tasksService.update(id, updateTaskDto);
  }

  @UseGuards(JwtAuthGuard)
  @Delete(':id')
  async remove(@Param('id') id: string): Promise<RemoveTaskResponse> {
    return await this.tasksService.remove(id);
  }

  @UseGuards(JwtAuthGuard)
  @Get('status/pending')
  async findPending(): Promise<Task[]> {
    return await this.tasksService.findPending();
  }

  @UseGuards(JwtAuthGuard)
  @Get('status/in-progress')
  async findInProgress(): Promise<Task[]> {
    return await this.tasksService.findInProgress();
  }

  @UseGuards(JwtAuthGuard)
  @Get('status/done')
  async findDone(): Promise<Task[]> {
    return await this.tasksService.findDone();
  }
}
