import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { I18nService } from 'nestjs-i18n';
import { PrismaService } from 'src/prisma/prisma.service';
import { UtilitiesService } from 'src/utilities/utilities.service';
import { CreateFileDto } from './dto/create-file.dto';
import { UpdateFileDto } from './dto/update-file.dto';
import fse from 'fs-extra';
import path from 'path';

@Injectable()
export class FilesService {
  constructor(
    private prisma: PrismaService,
    private utilitiesService: UtilitiesService,
    private i18n: I18nService,
  ) {}

  async destinationFilePath(): Promise<string>{
    // Path of the files storage directory
    const destinationFiles = await this.utilitiesService.searchConfigParam( "FILES_STORAGE_DEST" );
    return destinationFiles
  };

  async destinationImagePath(): Promise<string>{
    const destinationImages = await this.utilitiesService.searchConfigParam( "FILES_STORAGE_DEST" );
    return destinationImages
  };

  
  async deleteOneFile(fileName: string, lang: string): Promise<any> {
    // Delete one file from the diskstorage
    // Seach for the location
    const storagePath = await this.utilitiesService.searchConfigParam( "FILES_STORAGE_DEST" );
    const fullPath = storagePath+"/"+fileName;
console.log("full path:", fullPath)
    // const fse = require('fs-extra');
    try{
      await fse.exists(fullPath);
      console.log('File exist and is deleted');
      // Now delete it
      try {
        await  fse.unlink(fullPath)
        return {
          status: HttpStatus.OK,
          data: "File has been deleted",
        };
      } catch (err) {
        console.error(err)
        console.log('Error File not deleted'); 
        throw new HttpException(this.i18n.translate("files.FILE_NOT_DELETED",{ lang: lang, }), 400);
      }
    } catch (err) {
        console.error(err)
        console.log('File does not exist'); 
        throw new HttpException(this.i18n.translate("files.FILE_EXIST_NO",{ lang: lang, }), 400);
    }
  }

  async copyFiles (fromPath: string, toPath: string, fileNameWithExt: string, lang: string): Promise<boolean> {
    // Copy one file from one place to the other
    const pathSep = path.sep
    const fullPathFrom = fromPath+pathSep+fileNameWithExt;
    const fullPathTo = toPath+pathSep+fileNameWithExt;
    try {
      await fse.copy(fullPathFrom, fullPathTo)
      // await fse.copy('/tmp/myfile', '/tmp/mynewfile')
      console.log('success!')
      return true
    } catch (err) {
      console.error(err)
      throw new HttpException(this.i18n.translate("files.FILE_NOT_COPIED",{ lang: lang, }), 400); 
    }
  }

    async renameOneFile(pathToFile: string, oldFileNameWithExt: string, newFileNameWithExt: string, lang: string): Promise<boolean> {
      // Rename a file (with its extension)
      const pathSep = path.sep
      console.log("Path separator : ", pathSep)
      const fullPathOld = pathToFile+pathSep+oldFileNameWithExt;
      const fullPathNew = pathToFile+pathSep+newFileNameWithExt;
      try {
        await fse.rename(fullPathOld, fullPathNew)
        console.log('success!')
        return true
      } catch (err) {
        console.error(err)
        throw new HttpException(this.i18n.translate("files.FILE_NOT_RENAMED",{ lang: lang, }), 400); 
      }
    }

    async parsePath(pathToParse: string, lang: string): Promise<Object> {
      // From a path to the parts of the path:
      // Returns: { root: '/', dir: '/home/user/dir', base: 'file.txt', ext: '.txt', name: 'file' }
      try {
        const result = await path.parse(pathToParse);
        
        return result
      } catch (err) {
        console.error(err)
        throw new HttpException(this.i18n.translate("files.FILE_PARSE_ERROR",{ lang: lang, }), 400); 
      }
    }

    async verifyOrCreateOneFolder(directoryToFix: string, lang: string): Promise<Boolean> {
      // Verify that a folder exist, and if not create it (if the path is correct)
      try {
        await fse.ensureDir(directoryToFix)
        console.log('success!')
        return true
      } catch (err) {
        console.error(err)
        throw new HttpException(this.i18n.translate("files.FILE_BAD_DIRECTORY",{ lang: lang, }), 400); 
      }

      return true
    }
  /*
  * Classic for CRUD
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
*/
}
