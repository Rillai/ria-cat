import { CreateUserDto } from '@modules/users/dto/create-user.dto';
import { User } from '@modules/users/models/user.model';
import { UsersService } from '@modules/users/users.service';
import { HttpException, HttpStatus, Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcryptjs';

import { JwtPayload } from './auth.interface';

@Injectable()
export class AuthService {
  constructor(private usersService: UsersService, private jwtService: JwtService) {}

  public async login(userDto: CreateUserDto): Promise<{ token: string }> {
    const user: User = await this.validateUser(userDto);

    return this.generateToken(user);
  }

  public async registration(userDto: CreateUserDto): Promise<{ token: string }> {
    const candidate = await this.usersService.getUserByEmail(userDto.email);

    if (candidate) {
      throw new HttpException('A user with this email already exists', HttpStatus.BAD_REQUEST);
    }

    const hashPassword: string = await bcrypt.hash(userDto.password, 5);
    const user: User = await this.usersService.createUser({ ...userDto, password: hashPassword });

    return this.generateToken(user);
  }

  private async generateToken(user: User): Promise<{ token: string }> {
    const payload: JwtPayload = { email: user.email, id: user.id, roles: user.roles };

    return {
      token: this.jwtService.sign(payload),
    };
  }

  private async validateUser(userDto: CreateUserDto): Promise<User> {
    const user: User = await this.usersService.getUserByEmail(userDto.email);
    const passwordEquals = await bcrypt.compare(userDto.password, user.password);

    if (user && passwordEquals) {
      return user;
    }

    throw new UnauthorizedException({ message: 'Invalid email or password' });
  }
}
