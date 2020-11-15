import { Module } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { PrismaService } from './prisma.service';

@Module({
  imports: [
    ConfigService,
  ],
  providers: [PrismaService],
  exports: [PrismaService],
})
export class PrismaModule {}
