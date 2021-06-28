import { CanActivate, ExecutionContext, Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { Observable } from 'rxjs';

import { USER_IS_NOT_LOGGED_IN } from '../../app-constants';

@Injectable()
export class JwtAuthGuard implements CanActivate {
  constructor(private jwtService: JwtService) {}

  public canActivate(context: ExecutionContext): boolean | Promise<boolean> | Observable<boolean> {
    const req = context.switchToHttp().getRequest();
    try {
      const authHeader: string = req.headers.authorization;
      const bearer = authHeader.split(' ')[0];
      const token = authHeader.split(' ')[1];

      if (bearer !== 'Bearer' || !token) {
        throw new UnauthorizedException({ message: USER_IS_NOT_LOGGED_IN });
      }

      req.user = this.jwtService.verify(token);

      return true;
    } catch (e) {
      throw new UnauthorizedException({ message: USER_IS_NOT_LOGGED_IN });
    }
  }
}
