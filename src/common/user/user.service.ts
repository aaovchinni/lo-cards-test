import { Injectable, UnauthorizedException } from '@nestjs/common';
import { User } from './user';
import { UserTokenService } from './token/user-token.service';
import { LoginUserDto } from '../../versions/v1/dto/login-user.dto';
import { UserToken } from './token/user-token';

@Injectable()
export class UserService {
  private users: User[] = [
    new User('admin@admin.ru', '12345678'),
    new User('user@user.ru', '87654321'),
  ];

  constructor(
    private readonly userTokenService: UserTokenService,
  ) {}

  findByEmail(email: string): User | undefined {
    email = email.toLowerCase();

    return this.users.find(user => user.email.toLowerCase() === email);
  }

  auth(loginUserDto: LoginUserDto): UserToken | UnauthorizedException {
    const { email, password } = loginUserDto;

    const foundUser = this.findByEmail(email);

    if (!foundUser || foundUser.password !== password) {
      throw new UnauthorizedException();
    }

    return this.userTokenService.generate();
  }
}
