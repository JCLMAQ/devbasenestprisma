import { Test, TestingModule } from '@nestjs/testing';
import { EmaildomainsController } from './emaildomains.controller';
import { EmaildomainsService } from './emaildomains.service';

describe('EmaildomainsController', () => {
  let controller: EmaildomainsController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [EmaildomainsController],
      providers: [EmaildomainsService],
    }).compile();

    controller = module.get<EmaildomainsController>(EmaildomainsController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
