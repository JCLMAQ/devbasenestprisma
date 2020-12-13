import { Test, TestingModule } from '@nestjs/testing';
import { EmaildomainsService } from './emaildomains.service';

describe('EmaildomainsService', () => {
  let service: EmaildomainsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [EmaildomainsService],
    }).compile();

    service = module.get<EmaildomainsService>(EmaildomainsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
