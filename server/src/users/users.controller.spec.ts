import { Test, TestingModule } from '@nestjs/testing';
import { User } from 'src/users/entities/user.entity';
import { UserRole } from 'src/users/enums/users.enums';
import { UsersController } from 'src/users/users.controller';
import { UsersService } from 'src/users/users.service';

describe('UsersController', () => {
  let controller: UsersController;
  let service: UsersService;

  const mockUsers: User[] = [
    {
      id: '1',
      username: 'Test User',
      email: 'test@emil.com',
      password: 'password',
      role: UserRole.USER,
      createdAt: new Date(),
    },
    {
      id: '2',
      username: 'Test User 2',
      email: 'test2@email.com',
      password: 'password',
      role: UserRole.ADMIN,
      createdAt: new Date(),
    },
  ];

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [UsersController],
      providers: [
        {
          provide: UsersService,
          useValue: {
            findAll: jest.fn().mockResolvedValue(mockUsers),
            findOne: jest.fn().mockImplementation((id: string) => {
              return mockUsers.find((user) => user.id === id);
            }),
          },
        },
      ],
    }).compile();

    controller = module.get<UsersController>(UsersController);
    service = module.get<UsersService>(UsersService);
  });

  it('should list users', async () => {
    const result = await controller.findAll();
    expect(result).toEqual(mockUsers);
    expect(service.findAll).toHaveBeenCalled();
  });

  it('should get a user by id', async () => {
    const result = await controller.findOne('1');
    expect(result).toEqual(mockUsers[0]);
    expect(service.findOne).toHaveBeenCalledWith('1');
  });
});
