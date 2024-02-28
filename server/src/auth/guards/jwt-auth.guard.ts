import { AuthGuard } from '@nestjs/passport';
import { GuardTypes } from 'src/auth/enums/auth.enums';
import { Injectable } from '@nestjs/common';

@Injectable()
export class JwtAuthGuard extends AuthGuard(GuardTypes.JWT) {}
