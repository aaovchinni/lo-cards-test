import { Test, TestingModule } from '@nestjs/testing';
import { UserTokenService } from './user-token.service';
import { UserToken } from './user-token';

describe('UserTokenService', () => {
  let service: UserTokenService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [UserTokenService],
    }).compile();

    service = module.get<UserTokenService>(UserTokenService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('generate', () => {
    it('should return the user token object', () => {
      const token = service.generate();

      expect(token).toBeInstanceOf(UserToken);
    });
  });
});
