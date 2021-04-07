import { Injectable } from '@nestjs/common';
import * as randomstring from 'randomstring';
import { UserToken } from './user-token';

@Injectable()
export class UserTokenService {
  generate(): UserToken {
    return new UserToken(randomstring.generate());
  }
}
