import { Module } from '@nestjs/common';
import { EmaildomainsService } from './emaildomains.service';
import { EmaildomainsController } from './emaildomains.controller';
import { PrismaModule } from '../prisma/prisma.module';

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
