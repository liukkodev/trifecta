import { AuthService } from './auth.service';
import { CreateUserDto } from 'src/users/dto/create-user.dto';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { LocalAuthGuard } from 'src/auth/guards/local-auth.guard';
import { LogoutResponse } from 'src/auth/types/auth.types';
import { Request as RequestWithCookies, Response } from 'express';
import { User } from 'src/users/entities/user.entity';
import {
  Controller,
  Get,
  Post,
  Body,
  UseGuards,
  Res,
  Req,
  UnauthorizedException,
} from '@nestjs/common';
import { COOKIE_OPTIONS } from 'src/auth/utils/auth.utils';
import { LoginUserDto } from 'src/auth/dto/login-user.dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('register')
  register(@Body() createUserDto: CreateUserDto): Promise<User> {
    return this.authService.register(createUserDto);
  }

  @UseGuards(LocalAuthGuard)
  @Post('login')
  async login(@Body() dto: LoginUserDto, @Res() res: Response): Promise<void> {
    try {
      const { access_token, refresh_token } = await this.authService.login(dto);
      this.setRefreshTokenCookie(res, refresh_token);

      res.json({ access_token });
    } catch (err) {
      throw new UnauthorizedException('Unable to login');
    }
  }

  @Post('refresh')
  async refresh(
    @Req() req: RequestWithCookies,
    @Res() res: Response,
  ): Promise<void> {
    try {
      const refreshToken = req.cookies.refresh_token;
      const { access_token, refresh_token } =
        await this.authService.refreshToken(refreshToken);
      this.setRefreshTokenCookie(res, refresh_token);

      res.json({ access_token });
    } catch (err) {
      throw new UnauthorizedException('Unable to refresh token');
    }
  }

  @Post('logout')
  logout(@Req() req: RequestWithCookies): Promise<LogoutResponse> {
    try {
      const refreshToken = req.cookies.refresh_token;

      return this.authService.logout(refreshToken);
    } catch (err) {
      throw new UnauthorizedException('Unable to logout');
    }
  }

  @UseGuards(JwtAuthGuard)
  @Get('test')
  getTest(): string {
    return 'You are authenticated!';
  }

  private setRefreshTokenCookie(res: Response, refreshToken: string): void {
    res.cookie('refresh_token', refreshToken, COOKIE_OPTIONS);
  }
}
