import { Module } from '@nestjs/common';
import { UtilitiesService } from './utilities.service';
import { UtilitiesController } from './utilities.controller';
import { PrismaModule } from 'src/prisma/prisma.module';
import { Emaildomain } from 'src/emaildomains/entities/emaildomain.entity';
import { EmaildomainsModule } from 'src/emaildomains/emaildomains.module';

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
