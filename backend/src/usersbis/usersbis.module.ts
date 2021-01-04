import { Module } from '@nestjs/common';
import { UsersbisService } from './usersbis.service';
import { PrismaModule } from 'src/prisma/prisma.module';
import { UsersbisController } from './usersbis.controller';


@Module({
  imports: [
    PrismaModule,
  ],
  controllers: [
    UsersbisController],
  providers: [UsersbisService],
  exports: [
    UsersbisService
  ],
})
export class UsersbisModule {}