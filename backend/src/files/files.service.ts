import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { UtilitiesService } from 'src/utilities/utilities.service';
import { CreateFileDto } from './dto/create-file.dto';
import { UpdateFileDto } from './dto/update-file.dto';

@Injectable()
export class FilesService {
  constructor(
    private prisma: PrismaService,
    private utilitiesService: UtilitiesService,
  ) {}

  async destinationFilePath(){
    const destinationFiles = await this.utilitiesService.searchConfigParam( "FILES_STORAGE_URL" );
    return destinationFiles
  };

  async destinationImagePath(){
    const destinationImages = await this.utilitiesService.searchConfigParam( "IMAGES_STORAGE_URL" );
    return destinationImages
  };

    
  create(createFileDto: CreateFileDto) {
    return 'This action adds a new file';
  }

  findAll() {
    return `This action returns all files`;
  }

  findOne(id: number) {
    return `This action returns a #${id} file`;
  }

  update(id: number, updateFileDto: UpdateFileDto) {
    return `This action updates a #${id} file`;
  }

  remove(id: number) {
    return `This action removes a #${id} file`;
  }
}
