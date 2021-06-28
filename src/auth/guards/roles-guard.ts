import { Role } from '@modules/roles/models/roles.model';
import { User } from '@modules/users/models/user.model';
import {
  CanActivate,
  ExecutionContext,
  HttpException,
  HttpStatus,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { JwtService } from '@nestjs/jwt';
import { Observable } from 'rxjs';

import { NO_ACCESS, USER_IS_NOT_LOGGED_IN } from '../../app-constants';
import { ROLES_KEY } from '../roles-auth.decorator';

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(private jwtService: JwtService, private reflector: Reflector) {}

  public canActivate(context: ExecutionContext): boolean | Promise<boolean> | Observable<boolean> {
    try {
      const requireRoles = this.reflector.getAllAndOverride<string[]>(ROLES_KEY, [
        context.getHandler(),
        context.getClass(),
      ]);

      if (!requireRoles) {
        return true;
      }

      const req = context.switchToHttp().getRequest();
      const authHeader: string = req.headers.authorization;
      const bearer = authHeader.split(' ')[0];
      const token = authHeader.split(' ')[1];

      if (bearer !== 'Bearer' || !token) {
        throw new UnauthorizedException({ message: USER_IS_NOT_LOGGED_IN });
      }

      const user: User = this.jwtService.verify(token);
      req.user = user;

      return user.roles.some((role: Role) => requireRoles.includes(role.value));
    } catch (e) {
      throw new HttpException({ message: NO_ACCESS }, HttpStatus.FORBIDDEN);
    }
  }
}
