import { Module } from '@nestjs/common';
import { EmaildomainsService } from './emaildomains.service';
import { EmaildomainsController } from './emaildomains.controller';

@Module({
  controllers: [EmaildomainsController],
  providers: [EmaildomainsService]
})
export class EmaildomainsModule {}
