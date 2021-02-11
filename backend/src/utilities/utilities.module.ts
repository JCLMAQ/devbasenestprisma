import { Module } from '@nestjs/common';
import { UtilitiesService } from './utilities.service';
import { UtilitiesController } from './utilities.controller';
import { PrismaModule } from '../prisma/prisma.module';
import { Emaildomain } from '../emaildomains/entities/emaildomain.entity';
import { EmaildomainsModule } from '../emaildomains/emaildomains.module';

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
