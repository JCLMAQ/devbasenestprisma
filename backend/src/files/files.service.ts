import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { I18nService } from 'nestjs-i18n';
import { PrismaService } from 'src/prisma/prisma.service';
import { File, Prisma } from '@prisma/client';
import { UtilitiesService } from 'src/utilities/utilities.service';
import { CreateFileDto } from './dto/create-file.dto';
import { UpdateFileDto } from './dto/update-file.dto';
import sharp from 'sharp';
import * as fse from 'fs-extra';
import * as path from 'path';
import { ConfigService } from '@nestjs/config';
import { promisify } from 'util';

const readFileAsyc = promisify(fse.readFile);
@Injectable()
export class FilesService {
  private readonly sizes: string[];
  static destinationFilePath: any;
  constructor(
    private prisma: PrismaService,
    private utilitiesService: UtilitiesService,
    private i18n: I18nService,
    private configService: ConfigService
  ) {
    // this.sizes = ['25X25', '50X50', '100X100', '200X200', '400X400', '900X900'];
    this.sizes = process.env.IMAGES_SIZING.split(",");
  }

    async deleteOneFile(fileName: string, lang: string): Promise<any> {
      // Delete one file from the diskstorage
      let response = null;
      // Seach for the location
      const storagePath = process.env.FILES_STORAGE_DEST;
      const fullPath = storagePath+path.sep+fileName;
      const isExist = await fse.stat(fullPath);
      if(!isExist){
        throw new HttpException(await this.i18n.translate("files.FILE_EXIST_NO",{ lang: lang, }), 400);
      }
      await fse.unlink(fullPath,(err) => {
        if (err) {
          console.error(err)
          throw new HttpException(this.i18n.translate("files.FILE_NOT_DELETED",{ lang: lang, }), 400);
      }}) 
      //  Delete the image within the DB
      await this.deleteOneFileInDB(fileName);
      const result  = "File deleted: "+fileName
      return result;  
    }

    async deleteOneImage(fileName: string, lang: string): Promise<any> {
        // Delete one image from the diskstorage
        let response = null;
        // Search for the location
        const storagePath = process.env.IMAGES_STORAGE_DEST;
        const fullPath = storagePath+path.sep+fileName;
        const isExist = await fse.stat(fullPath);
        if(!isExist){
          throw new HttpException(await this.i18n.translate("files.FILE_EXIST_NO",{ lang: lang, }), 400);
        }
        await fse.unlink(fullPath,(err) => {
          if (err) {
            console.error(err)
            throw new HttpException(this.i18n.translate("files.FILE_NOT_DELETED",{ lang: lang, }), 400);
        }}) 
        //  Delete the image within the DB
        await this.deleteOneFileInDB(fileName);
        const result  = "Image deleted: "+fileName
        // Delete sized images
        await this.deleteSizedImages(fileName);
        return result;  
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
    }

    async saveSizedImages (file): Promise<void> {
      // Resize images to specific sizes : 
      // '25X25', '50X50', '100X100', '200X200', '400X400', '900X900'
      const lang = "en";
      const [, ext] = file.mimetype.split('/');
      const pathSep = path.sep;
      const storagePath = process.env.IMAGES_STORAGE_DEST;
      if (['jpeg', 'jpg', 'png', 'tiff'].includes(ext)) {
        await this.sizes.forEach((s: string) => {
          // test if folder exist and if not create it
          this.verifyOrCreateOneFolder(`${storagePath}${pathSep}${s}`, lang);
          // const isExist = fse.exists(`${storagePath}${pathSep}${s}`);
          // if (!isExist) { fse.mkdir(`${storagePath}${pathSep}${s}`); }
          const [size] = s.split('X');
          readFileAsyc(file.path)
            .then((b: Buffer) => {
              return sharp(b)
                .resize(+size)
                .toFile(
                  // `${__dirname}/../uploadedimages/${s}/${file.fileName}`,
                  `${storagePath}${pathSep}${s}${pathSep}${file.filename}`,
                );
            })
            .then(console.log)
            .catch(console.error);
        });
      }
    }

    async deleteSizedImages (fileName: string): Promise<void> {
      // Delete sized images if they exist
      await this.sizes.forEach((size: string) => { 
        // Size format is ex 25X25
        const storagePath = process.env.IMAGES_STORAGE_DEST;
        const fullPathDest = storagePath+path.sep+size+path.sep+fileName;
console.log("path to delete : ", fullPathDest)
        const isExist = fse.access(fullPathDest);
        if(isExist) {  // Then delete it
          fse.unlink(fullPathDest,(err) => {
            if (err) {
              console.error(err)
          }}) 
        }
      });
    }

    async resizeImage (fileName, widthxheight: string ): Promise<string> {
      // Resize images to any sizes with yyyXzzz: ex 2500X200
      // width x height
      // Name of the resized fimage : fileName-widthxheight.ext
      const lang = "en";
      const size = widthxheight.split('X');
      const fileSplit = fileName.split('.');
      const pathSep = path.sep;
      const storagePath = process.env.IMAGES_TEMP_STORAGE_DEST;
      const fullPath = `${storagePath}${pathSep}${fileSplit[0]}-${widthxheight}.${fileSplit[1]}`
      // test if folder where to store the new file exist and if not create it
      const testfolder = await this.verifyOrCreateOneFolder(`${storagePath}`, lang);
      console.log(testfolder)
      // verify first that the file does'not exist, if exist delete it
      const isExist = await fse.stat(fullPath);
      if (isExist) { await fse.unlink(fullPath); };
      // Limit resizing to somme extensions
      if (['jpeg', 'jpg', 'png', 'tiff'].includes(fileSplit[1])) {
        /* 
        * output.png is a yyy pixels wide and zzz pixels high image
        * containing a nearest-neighbour scaled version
        * contained within the north-east corner of a semi-transparent white canvas
        */  
       // Get the file from the storage place
        const originStoragePath = process.env.IMAGES_STORAGE_DEST;
        const pathToOriginalFile = `${originStoragePath}${pathSep}${fileName}`
        // Create the file and store it
        await readFileAsyc(pathToOriginalFile)
          .then((b: Buffer) => {
            return sharp(b)
              .resize(+size[0], +size[1], {
                kernel: sharp.kernel.nearest,
                fit: 'contain',
                position: 'right top',
                background: { r: 255, g: 255, b: 255, alpha: 0.5 }
              })
              .toFile(
                `${storagePath}${pathSep}${fileSplit[0]}-${widthxheight}.${fileSplit[1]}`,
              );
          })
          .then(console.log)
          .catch(console.error);
        const newFileName = `${fileSplit[0]}-${widthxheight}.${fileSplit[1]}`;
        console.log(newFileName)
        return newFileName
      }
    }

    async deleteOneFolder(pathToDelete: string): Promise<any>{
        const result = await fse.remove(pathToDelete);
        console.log("delete one folder: ", result)
      return result
    }
    /*
    * Not used for now
    */

    async destinationFilePath(): Promise<string>{
      // Path of the files storage directory
      const destinationFiles = await this.utilitiesService.searchConfigParam( "FILES_STORAGE_DEST" );
      return destinationFiles
    };

    async destinationImagePath(): Promise<string>{
      const destinationImages = await this.utilitiesService.searchConfigParam( "FILES_STORAGE_DEST" );
      return destinationImages
    };

    async illegalFileNameCharacterReplace(fileName) {
      // WithDraw and replace illegal characters in file name and replace it with _
      // filename = filename.replace(/[/\\?%*:|"<>]/g, '-');
      return fileName.replace(/[/\\?%*:|"<>]/g, '_');
    }

    async parsePath(pathToParse: string, lang: string): Promise<Object> {
      //  TOBETESTED
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

    async renameOneFile(pathToFile: string, oldFileNameWithExt: string, newFileNameWithExt: string, lang: string): Promise<boolean> {
      //  TOBETESTED
      // Rename a file (with its extension)
      const fullPathOld = pathToFile+path.sep+oldFileNameWithExt;
      const fullPathNew = pathToFile+path.sep+newFileNameWithExt;
      try {
        await fse.rename(fullPathOld, fullPathNew)
        return true
      } catch (err) {
        console.error(err)
        throw new HttpException(this.i18n.translate("files.FILE_NOT_RENAMED",{ lang: lang, }), 400); 
      }
    }

    async copyFiles (fromPath: string, toPath: string, fileNameWithExt: string, lang: string): Promise<boolean> {
      //  TOBETESTED 
      // Copy one file from one place to the other
      const fullPathFrom = fromPath+path.sep+fileNameWithExt;
      const fullPathTo = toPath+path.sep+fileNameWithExt;
      try {
        await fse.copy(fullPathFrom, fullPathTo)
        // await fse.copy('/tmp/myfile', '/tmp/mynewfile')
        return true
      } catch (err) {
        console.error(err)
        throw new HttpException(this.i18n.translate("files.FILE_NOT_COPIED",{ lang: lang, }), 400); 
      }
    }

    /*
    * CRUD part for the file mgt in DB
    */
  
    async createOneFileInDB(response){
      // Create the record in DB
      const dataFile = "";
      const ownerFile = "";
      const data = {name: response.originalName, storageName: response.fileName, type: response.typeFile, data: dataFile, owner: ownerFile, size: response.size };
      return await this.createOneFileRecord(data);
    }

    async deleteOneFileInDB(storageName) {
      const dataFile = "";
      const ownerFile = "";
      const softDelete = this.configService.get<number>("ENABLE_SOFT_DELETE") === 1
      if(softDelete) {   
        // Soft delete
        const where = { storageName : storageName };
        const data = { isDeleted: new Date() }
        const params = { where, data }
        return await this.updateOneFile(params)
      } else {
        // Hard delete
        const where = { storageName: storageName };
        return await this.deleteOneFileRecord(where);
      }
    }
    
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
