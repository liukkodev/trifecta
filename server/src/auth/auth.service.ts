import * as bcrypt from 'bcrypt';
import { CreateUserDto } from 'src/users/dto/create-user.dto';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { JsonWebTokenError, JwtService, TokenExpiredError } from '@nestjs/jwt';
import {
  AccessTokenPayload,
  AuthTokens,
  LoginResponse,
  LogoutResponse,
  RefreshTokenPayload,
} from 'src/auth/types/auth.types';
import { Repository } from 'typeorm';
import { User } from 'src/users/entities/user.entity';
import { UserRole } from 'src/users/enums/users.enums';
import { TokenExpirations, TokenTypes } from 'src/auth/enums/auth.enums';
import { LoginUserDto } from 'src/auth/dto/login-user.dto';
import { CreateTokensDto } from 'src/auth/dto/create-tokens.dto';

const SALT_ROUNDS = 10;

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>,
    private jwtService: JwtService,
  ) {}

  async validate(usernameProp: string, passwordProp: string): Promise<User> {
    const user: User = await this.usersRepository.findOne({
      where: { username: usernameProp },
    });

    if (!user) throw new UnauthorizedException('User not found');

    const passwordMatches = await bcrypt.compare(passwordProp, user.password);
    if (!passwordMatches) throw new UnauthorizedException('Invalid password');

    const { password, ...result } = user;

    return result;
  }

  async register(createUserDto: CreateUserDto): Promise<User> {
    try {
      const plainTextPassword = createUserDto.password;
      let hashedPassword = await bcrypt.hash(plainTextPassword, SALT_ROUNDS);

      return this.usersRepository.save({
        ...createUserDto,
        role: UserRole.USER, // Default role
        password: hashedPassword,
      });
    } catch (err) {
      throw new Error('Registration failed');
    }
  }

  async login(dto: LoginUserDto): Promise<LoginResponse> {
    try {
      const user = await this.usersRepository.findOne({
        where: { username: dto.username },
      });
      const createTokensDto: CreateTokensDto = {
        username: user.username,
        role: user.role,
        id: user.id,
      };
      const tokens = await this.createTokens(createTokensDto);

      await this.usersRepository.update(
        { username: user.username },
        { refreshToken: tokens.refresh_token },
      );

      return tokens;
    } catch (err) {
      throw new UnauthorizedException('Login failed');
    }
  }

  async refreshToken(refreshToken: string): Promise<LoginResponse> {
    if (!refreshToken) {
      throw new UnauthorizedException('Invalid refresh token');
    }

    try {
      // sub is the user id
      const { sub } = this.jwtService.verify(refreshToken, {
        secret: process.env.JWT_SECRET,
      });

      if (!sub) {
        throw new UnauthorizedException('Invalid refresh token');
      }

      const user: User = await this.usersRepository.findOne({
        where: { id: sub },
      });
      if (!user || !user.refreshToken || user.refreshToken !== refreshToken) {
        throw new UnauthorizedException('Invalid refresh token');
      }

      const tokens = await this.createTokens(user);

      await this.usersRepository.update(
        { username: user.username },
        { refreshToken: tokens.refresh_token },
      );

      return tokens;
    } catch (e) {
      if (e instanceof TokenExpiredError) {
        throw new UnauthorizedException('Expired refresh token');
      } else if (e instanceof JsonWebTokenError) {
        throw new UnauthorizedException('Invalid refresh token');
      }
      throw Error('Failed to refresh token');
    }
  }

  async logout(refreshToken: string): Promise<LogoutResponse> {
    // sub is the user id
    const { sub } = this.jwtService.decode(refreshToken);

    try {
      // Set user's refresh token to null
      await this.usersRepository.update(sub, { refreshToken: null });

      return { message: 'Logged out', status: 200 };
    } catch (err) {
      throw new UnauthorizedException('Failed to log out');
    }
  }

  private async createTokens(dto: CreateTokensDto): Promise<AuthTokens> {
    const accessTokenPayload: AccessTokenPayload = {
      name: dto.username,
      role: dto.role,
      sub: dto.id,
    };
    const accessToken = this.jwtService.sign(accessTokenPayload, {
      expiresIn: TokenExpirations.ACCESS,
    });

    const refreshTokenPayload: RefreshTokenPayload = {
      sub: dto.id,
      tokenType: TokenTypes.REFRESH,
    };
    const refreshToken = this.jwtService.sign(refreshTokenPayload, {
      expiresIn: TokenExpirations.REFRESH,
    });

    return {
      access_token: accessToken,
      refresh_token: refreshToken,
    };
  }
}
