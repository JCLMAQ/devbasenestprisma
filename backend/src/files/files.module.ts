import { Module } from '@nestjs/common';
import { FilesService } from './files.service';
import { FilesController } from './files.controller';
import { PrismaModule } from '../prisma/prisma.module';
import { UtilitiesModule } from '../utilities/utilities.module';

@Module({
  imports: [
    PrismaModule,
    UtilitiesModule,
  ],
  controllers: [FilesController],
  providers: [FilesService], 
  exports: [
    FilesService,
  ]
})
export class FilesModule {}
