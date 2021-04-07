import { Test, TestingModule } from '@nestjs/testing';
import { UserService } from './user.service';
import { User } from './user';
import { UserTokenService } from './token/user-token.service';
import { UnauthorizedException } from '@nestjs/common';
import { UserToken } from './token/user-token';

describe('UserService', () => {
  let service: UserService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [UserService, UserTokenService],
    }).compile();

    service = module.get<UserService>(UserService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('findByEmail', () => {
    describe('when user with given email exists', () => {
      it('should return the user object', () => {
        const email = 'admin@admin.ru';

        const user = service.findByEmail(email);
        expect(user).toBeInstanceOf(User);
      });
    });

    describe('otherwise', () => {
      it('should return undefined', async () => {
        const email = 'non-existing@email.ru';

        const user = service.findByEmail(email);
        expect(user).toBeUndefined();
      });
    });
  });

  describe('auth', () => {
    describe('when user with given email and password exists', () => {
      it('should return the user token object', () => {
        const loginUser = {
          email: 'admin@admin.ru',
          password: '12345678',
        };

        const token = service.auth(loginUser);
        expect(token).toBeInstanceOf(UserToken);
      });
    });

    describe('when user with given email exists but password is wrong', () => {
      it('should throw the "UnauthorizedException"', () => {
        const loginUser = {
          email: 'admin@admin.ru',
          password: '1111',
        };

        try {
          service.auth(loginUser);
        } catch (err) {
          expect(err).toBeInstanceOf(UnauthorizedException);
        }
      });
    });

    describe('when user with given email and password does not exist', () => {
      it('should throw the "UnauthorizedException"', () => {
        const loginUser = {
          email: 'non-existing@email.ru',
          password: '123',
        };

        try {
          service.auth(loginUser);
        } catch (err) {
          expect(err).toBeInstanceOf(UnauthorizedException);
        }
      });
    });
  });
});
