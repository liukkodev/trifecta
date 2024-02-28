import { AuthModule } from './auth/auth.module';
import { Module } from '@nestjs/common';
import { TasksModule } from './tasks/tasks.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersModule } from './users/users.module';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'sqlite',
      database: 'db.sqlite3',
      entities: [__dirname + '/**/*.entity{.ts,.js}'],
      synchronize: true, // PROD: Don't use this in production
      logging: true,
      logger: 'advanced-console', // PROD: Don't use this in production
    }),
    TasksModule,
    AuthModule,
    UsersModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
