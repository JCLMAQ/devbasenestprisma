import { Module } from '@nestjs/common';
import { PrismaModule } from '../prisma/prisma-client.module';
import { UtilitiesModule } from '../utilities/utilities.module';
import { FilesController } from './files.controller';
import { FilesService } from './files.service';

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
