import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from 'src/users/entities/user.entity';
import { RemoveUserResponse } from 'src/users/types/users.types';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>,
  ) {}

  async findAll(): Promise<User[]> {
    try {
      const res = await this.usersRepository.find({
        order: { username: 'ASC' },
      });

      return res;
    } catch (err) {
      throw new Error(err);
    }
  }

  async findOne(id: string): Promise<User> {
    try {
      const res = await this.usersRepository.findOne({ where: { id } });

      if (!res) {
        throw new NotFoundException(`User with ID ${id} not found`);
      }

      return res;
    } catch (err) {
      throw new Error(err);
    }
  }

  async update(id: string, updateUserDto: UpdateUserDto): Promise<User> {
    try {
      const res = await this.usersRepository.update(id, updateUserDto);

      if (res.affected === 0) {
        throw new NotFoundException(`User with ID ${id} not found`);
      }

      return this.findOne(id);
    } catch (err) {
      throw new Error(err);
    }
  }

  async remove(id: string): Promise<RemoveUserResponse> {
    const res = await this.usersRepository.delete(id);

    if (res.affected === 0) {
      throw new NotFoundException(`User with ID ${id} not found`);
    }

    return {
      message: `User with ID ${id} has been removed`,
      status: 200,
    };
  }
}
