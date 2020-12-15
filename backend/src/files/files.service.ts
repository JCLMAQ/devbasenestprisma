import { HttpException, Injectable } from '@nestjs/common';
import { I18nService } from 'nestjs-i18n';
import { PrismaService } from 'src/prisma/prisma.service';
import { UtilitiesService } from 'src/utilities/utilities.service';
import { CreateFileDto } from './dto/create-file.dto';
import { UpdateFileDto } from './dto/update-file.dto';


@Injectable()
export class FilesService {
  constructor(
    private prisma: PrismaService,
    private utilitiesService: UtilitiesService,
    private i18n: I18nService,
  ) {}

  async destinationFilePath(): Promise<string>{
    const destinationFiles = await this.utilitiesService.searchConfigParam( "FILES_STORAGE_DEST" );
    return destinationFiles
  };

  async destinationImagePath(): Promise<string>{
    const destinationImages = await this.utilitiesService.searchConfigParam( "FILES_STORAGE_DEST" );
    return destinationImages
  };

  
  async deleteOneFile(fileName: string, lang: string): Promise<any> {

    // Seach for the location
    const storagePath = await this.utilitiesService.searchConfigParam( "FILES_STORAGE_DEST" );
    const fullPath = storagePath+"/"+fileName;
console.log("full path:", fullPath)
    const fs = require('fs');
  fs.exists(fullPath, (err) => {
      if (err) {
        console.error(err)
console.log('File does not exist');    
        throw new HttpException(this.i18n.translate("files.FILE_EXIST_NO",{ lang: lang, }), 400);
      }
      console.log('File exist');
    });
    fs.unlink(fullPath, (err) => {
      if (err) {
console.error(err)
console.log('File has not been Deleted');    
throw new HttpException(this.i18n.translate("files.FILE_NOT_DELETED",{ lang: lang, }), 400);
      }
      console.log('File has been Deleted');    
      return true
    });
  }

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
