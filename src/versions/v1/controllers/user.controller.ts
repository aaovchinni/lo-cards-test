import { Controller, Post, Body } from '@nestjs/common';
import { UserService } from '../../../common/user/user.service';
import { LoginUserDto } from '../dto/login-user.dto';

@Controller('v1/user')
export class UserController {
  constructor(
    private readonly userService: UserService,
  ) {}

  @Post('login')
  login(@Body() loginUserDto: LoginUserDto) {
    return this.userService.auth(loginUserDto);
  }
}
