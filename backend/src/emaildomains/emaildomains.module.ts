import { Module } from '@nestjs/common';
import { PrismaModule } from '../prisma/prisma-client.module';
import { EmaildomainsController } from './emaildomains.controller';
import { EmaildomainsService } from './emaildomains.service';

@Module({
  imports: [
    PrismaModule,
  ],
  controllers: [EmaildomainsController],
  providers: [EmaildomainsService],
  exports: [
    EmaildomainsService
  ],
})
export class EmaildomainsModule {}
