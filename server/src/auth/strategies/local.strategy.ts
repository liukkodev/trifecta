import { AuthService } from 'src/auth/auth.service';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy } from 'passport-local';
import { User } from 'src/users/entities/user.entity';

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
  constructor(private authService: AuthService) {
    super({
      usernameField: 'username',
      passwordField: 'password',
    });
    // Pass other configurations if needed inside the super() method above as an object
    // For example clientID, clientSecret, callbackURL etc. for OAuth2
  }

  async validate(username: string, password: string): Promise<User> {
    const user = await this.authService.validate(username, password);

    if (!user) {
      throw new UnauthorizedException('Invalid credentials');
    } else {
      return user;
    }
  }
}
