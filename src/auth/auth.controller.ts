import { CreateUserDto } from '@modules/users/dto/create-user.dto';
import { Body, Controller, Post } from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';

import { AuthService } from './auth.service';

@ApiTags('Authorization')
@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @ApiOperation({ summary: 'Log in to account' })
  @ApiResponse({ status: 200 })
  @Post('/login')
  public async login(@Body() userDto: CreateUserDto): Promise<{ token: string }> {
    return this.authService.login(userDto);
  }

  @ApiOperation({ summary: 'Account Registration' })
  @ApiResponse({ status: 200 })
  @Post('/registration')
  public async registration(@Body() userDto: CreateUserDto): Promise<{ token: string }> {
    return this.authService.registration(userDto);
  }
}
