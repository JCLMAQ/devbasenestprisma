import { Module } from '@nestjs/common';
import { EmaildomainsModule } from '../emaildomains/emaildomains.module';
import { PrismaModule } from '../prisma/prisma-client.module';
import { UtilitiesController } from './utilities.controller';
import { UtilitiesService } from './utilities.service';

@Module({
  imports: [
    PrismaModule,
    EmaildomainsModule,
  ],
  controllers: [UtilitiesController],
  providers: [UtilitiesService],
  exports: [UtilitiesService]
})
export class UtilitiesModule {}
