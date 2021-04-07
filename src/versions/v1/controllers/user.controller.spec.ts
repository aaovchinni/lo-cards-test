import { Test, TestingModule } from '@nestjs/testing';
import { UserController } from './user.controller';
import { UserToken } from '../../../common/user/token/user-token';
import { UserModule } from '../../../common/user/user.module';
import { UnauthorizedException } from '@nestjs/common';

describe('UserController', () => {
  let controller: UserController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [UserController],
      imports: [UserModule],
    }).compile();

    controller = module.get<UserController>(UserController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('login', () => {
    describe('when user with given email and password exists', () => {
      it('should return the user token object', () => {
        const loginUser = {
          email: 'admin@admin.ru',
          password: '12345678',
        };

        const token = controller.login(loginUser);
        expect(token).toBeInstanceOf(UserToken);
      });
    });

    describe('otherwise', () => {
      it('should throw the "UnauthorizedException"', () => {
        const loginUser = {
          email: 'non-existing@email.ru',
          password: '1111',
        };

        try {
          controller.login(loginUser);
        } catch (err) {
          expect(err).toBeInstanceOf(UnauthorizedException);
        }
      });
    });
  });
});
