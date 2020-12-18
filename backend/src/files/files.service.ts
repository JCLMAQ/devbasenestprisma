import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { I18nService } from 'nestjs-i18n';
import { PrismaService } from 'src/prisma/prisma.service';
import { File, Prisma } from '@prisma/client';
import { UtilitiesService } from 'src/utilities/utilities.service';
import { CreateFileDto } from './dto/create-file.dto';
import { UpdateFileDto } from './dto/update-file.dto';
import fse from 'fs-extra';
import { sep, extname } from 'path';
import path from 'path';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class FilesService {
  static destinationFilePath: any;
  constructor(
    private prisma: PrismaService,
    private utilitiesService: UtilitiesService,
    private i18n: I18nService,
    private configService: ConfigService
  ) {}

  // TODO Create directory for files storage id if does not exist

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
    let response = null;
    // Seach for the location
    const storagePath = process.env.FILES_STORAGE_DEST;
    const pathSep = sep;
    // const pathSep = path.sep;
    const fullPath = storagePath+pathSep+fileName;
    const fse = require('fs-extra');
    const isExist = await fse.exists(fullPath);
    if(!isExist){
      throw new HttpException(await this.i18n.translate("files.FILE_EXIST_NO",{ lang: lang, }), 400);
    }
    await fse.unlink(fullPath,(err) => {
      if (err) {
        console.error(err)
        throw new HttpException(this.i18n.translate("files.FILE_NOT_DELETED",{ lang: lang, }), 400);
    }}) 
    const result  = "File deleted: "+fileName
    return result;  
  }

async deleteOneImage(fileName: string, lang: string): Promise<any> {
    // Delete one image from the diskstorage
    let response = null;
    // Seach for the location
    const storagePath = process.env.IMAGES_STORAGE_DEST;
    const pathSep = sep;
    // const pathSep = path.sep;
    const fullPath = storagePath+pathSep+fileName;
    const fse = require('fs-extra');   
    const isExist = await fse.exists(fullPath);
    if(!isExist){
      throw new HttpException(await this.i18n.translate("files.FILE_EXIST_NO",{ lang: lang, }), 400);
    }
    await fse.unlink(fullPath,(err) => {
      if (err) {
        console.error(err)
        throw new HttpException(this.i18n.translate("files.FILE_NOT_DELETED",{ lang: lang, }), 400);
    }}) 
    const result  = "Image deleted: "+fileName
    return result;  
  }


  async copyFiles (fromPath: string, toPath: string, fileNameWithExt: string, lang: string): Promise<boolean> {
    // Copy one file from one place to the other
    const path = require('path');
    const pathSep = path.sep
    const fullPathFrom = fromPath+pathSep+fileNameWithExt;
    const fullPathTo = toPath+pathSep+fileNameWithExt;
    try {
      await fse.copy(fullPathFrom, fullPathTo)
      // await fse.copy('/tmp/myfile', '/tmp/mynewfile')
      return true
    } catch (err) {
      console.error(err)
      throw new HttpException(this.i18n.translate("files.FILE_NOT_COPIED",{ lang: lang, }), 400); 
    }
  }

    async renameOneFile(pathToFile: string, oldFileNameWithExt: string, newFileNameWithExt: string, lang: string): Promise<boolean> {
      // Rename a file (with its extension)
      const path = require('path');
      const pathSep = path.sep
      const fullPathOld = pathToFile+pathSep+oldFileNameWithExt;
      const fullPathNew = pathToFile+pathSep+newFileNameWithExt;
      try {
        await fse.rename(fullPathOld, fullPathNew)
        return true
      } catch (err) {
        console.error(err)
        throw new HttpException(this.i18n.translate("files.FILE_NOT_RENAMED",{ lang: lang, }), 400); 
      }
    }

    async parsePath(pathToParse: string, lang: string): Promise<Object> {
      // From a path to the parts of the path:
      // Returns: { root: '/', dir: '/home/user/dir', base: 'file.txt', ext: '.txt', name: 'file' }
      const path = require('path');
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
        return true
      } catch (err) {
        console.error(err)
        throw new HttpException(this.i18n.translate("files.FILE_BAD_DIRECTORY",{ lang: lang, }), 400); 
      }

      return true
    }

    /*
    * CRUD part for the file mgt in DB
    */

    async createOneFileRecord(data: Prisma.FileCreateInput): Promise<File> {
        return this.prisma.file.create({ data,
        });
      }

    async findUniqueFile(where: Prisma.FileWhereUniqueInput): Promise<File | null> {
      return this.prisma.file.findUnique({
        where,
      });
    }

    async updateOneFile(params: {
      where: Prisma.FileWhereUniqueInput;
      data: Prisma.FileUpdateInput;
    }): Promise<File> {
      const { where, data } = params;
      return this.prisma.file.update({
        data,
        where,
      });
    }
  
    async deleteOneFileRecord(where: Prisma.FileWhereUniqueInput): Promise<File> {
      return this.prisma.file.delete({
        where,
      });
    }

    async createOrUpdateFile( data: Prisma.FileUpsertArgs): Promise<File> {
      const {where, create, update} = data
      return this.prisma.file.upsert({
        where,
        create,
        update,
        })
    }

}
