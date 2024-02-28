import { AuthGuard } from '@nestjs/passport';
import { AuthStrategies } from 'src/auth/enums/auth.enums';
import { Injectable } from '@nestjs/common';

@Injectable()
export class LocalAuthGuard extends AuthGuard(AuthStrategies.LOCAL) {}
