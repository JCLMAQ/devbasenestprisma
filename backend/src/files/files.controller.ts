import { Controller, Get, Post, Body, Put, Param, Delete, UseInterceptors, UploadedFile, UploadedFiles, HttpStatus, Res } from '@nestjs/common';
import { FilesService } from './files.service';
import { CreateFileDto } from './dto/create-file.dto';
import { UpdateFileDto } from './dto/update-file.dto';
import { FileInterceptor, FilesInterceptor} from '@nestjs/platform-express';
import { UtilitiesService } from 'src/utilities/utilities.service';
import { I18nLang } from 'nestjs-i18n';
import { imageMulterOptions } from './files-image-multer-options';
import { fileMulterOptions } from './files-file-multer-options';
import * as path from 'path';
import { promisify } from 'util';
import { readFile } from 'fs';
import { File } from '@prisma/client';
import { Response } from 'express';

const readFileAsyc = promisify(readFile);

/*
  * Image part
  */
@Controller('files')
export class FilesController {
  private readonly sizes: string[];
  constructor(
    private readonly filesService: FilesService,
    private readonly utilitiesService: UtilitiesService) {
      // this.sizes = ['25X25', '50X50', '100X100', '200X200', '400X400', '900X900'];
      this.sizes = process.env.IMAGES_SIZING.split(",");
    }

  // Upload one image file
  @Post('uploadoneimage')
  @UseInterceptors(FileInterceptor('image', imageMulterOptions))
  async uploadedImage(@UploadedFile() file) {
    console.log("File data back: ", file)
    // Create the different image sizes
    await this.filesService.saveSizedImages(file);
    // Create the record in DB
    const response = {
      originalName: file.originalname,
      fileName: file.filename,
      typeFile: file.mimetype,
      size: file.size
    };
    const result = await this.filesService.createOneFileInDB(response)
    return {
      status: HttpStatus.OK,
      message: 'Image uploaded successfully!',
      data: response,
      db: result,
    };
  }
 
  // Upload multiple image files
  @Post('uploadmultipleimages')
  @UseInterceptors(
    FilesInterceptor('image', 10, imageMulterOptions))
  async uploadMultipleImages(@UploadedFiles() files) {
    const response = [];
    const resultdb = [];
    files.forEach(file => {
      this.filesService.saveSizedImages(file);
      const fileReponse = {
        originalname: file.originalname,
        filename: file.filename,
        typeFile: file.mimetype,
        size: file.size
      };
      // Create the record in DB
      const fileResult = this.filesService.createOneFileInDB(fileReponse)
      response.push(fileReponse);
      resultdb.push(fileResult)
    });
    return {
      status: HttpStatus.OK,
      message: 'Images uploaded successfully!',
      data: response,
      db: resultdb,
    };
  }

  // Get the original image (not sized)
  @Get('image/:imagename')
  async getImage(@Param('imagename') image: string, @Res() res: Response) {
    const storagePath = process.env.IMAGES_STORAGE_DEST;
    const response = res.sendFile(image, { root: storagePath });
    return {
      status: HttpStatus.OK,
      data: response,
    };
  }

  // Get the image for a specific predefined size
  @Get('imagesized/:imagename/:size')
  async getImageSized(@Param('imagename') image: string, @Param('size') size: string, @Res() res: Response) {
    // size ex '25X25', '50X50', '100X100', '200X200', '400X400', '900X900'
    const storagePath = process.env.IMAGES_STORAGE_DEST;
    const rootFolder = storagePath+path.sep+size
    const response = res.sendFile(image, { root: rootFolder });
    return {
      status: HttpStatus.OK,
      data: response,
    };
  }

  // Get the image for a specific predefined size
  @Get('imagespecsized/:imagename/:size')
  async getImageSpecSized(@Param('imagename') image: string, @Param('size') widthxheight: string, @Res() res: Response) {
    // size ex '150X100' but maintain proportion
    // Get the image to resize first
    const pathSep = path.sep
    const storagePath = process.env.IMAGES_STORAGE_DEST;
    const tempStoragePath = process.env.IMAGES_TEMP_STORAGE_DEST
    // Create the specific image
    const resizedImage = await this.filesService.resizeImage (image, widthxheight);
    // Get the specific images
    const rootFolder = process.env.IMAGES_TEMP_STORAGE_DEST;
    const response = res.sendFile(resizedImage, { root: rootFolder });
    // TODO Delete the specific sized image once used (send back to the frontend )
    // Delete the stored images
    // const fullPath = `${tempStoragePath}${pathSep}${resizedImage}`
    // const isExist = await fse.exists(fullPath);
    // if (isExist) { await fse.unlink(fullPath); };
    return {
      status: HttpStatus.OK,
      data: response,
    };
  }

  // Delete the temp folder for specific predefined size images
  @Post('imagespecsized/deletefolder')
  async deleteTempImgesFolder() {
    const pathToDelete = process.env.IMAGES_TEMP_STORAGE_DEST;
    const result= await this.filesService.deleteOneFolder(pathToDelete)
      return {
        status: HttpStatus.OK,
        data: result,
      };
  }

  // Delete one image (not a specific siezd one)
  @Post('file/deleteoneimage/:filename')
  async deleteOneImage(@Param('filename') fileName: string, @I18nLang() lang: string) {
    // the delete corresponding record in the DB is done in deleteOneImage service 
    const response = await this.filesService.deleteOneImage(fileName, lang);
    return {
      status: HttpStatus.OK,
      data: response,
    };
  }
  
  /*
  * File part
  */

  // Upload a file
  @Post('uploadonefile')
  @UseInterceptors(FileInterceptor('file', fileMulterOptions))
  async uploadedFile(@UploadedFile() file: {originalname: string, filename: string, mimetype: string, size: number}, @I18nLang() lang: string) {
    const response = {
      originalName: file.originalname,
      fileName: file.filename,
      typeFile: file.mimetype,
      size: file.size
    };
    // Create the corresponding record in DB
    const result = await this.filesService.createOneFileInDB(response)
    return {
      status: HttpStatus.OK,
      message: 'File uploaded successfully!',
      data: response,
      db: result
    };
  }

  // Upload multiple files
  @Post('uploadmultiplefiles')
  @UseInterceptors(FilesInterceptor('file', 10, fileMulterOptions))
  async uploadMultipleFiles(@UploadedFiles() files: [], @I18nLang() lang: string) {
    const response: { originalname: string; filename: string; typeFile: string; size: number; }[] = [];
    const resultdb: Promise<File>[] = [];
    files.forEach((file: { originalname: string; filename: string; mimetype: string; size: number; }) => {
      const fileReponse = {
        originalname: file.originalname,
        filename: file.filename,
        typeFile: file.mimetype,
        size: file.size
      };
      const result = this.filesService.createOneFileInDB(fileReponse)
      // Create the corresponding record in DB
      response.push(fileReponse);
      resultdb.push(result);
    });
    return {
      status: HttpStatus.OK,
      message: 'Images uploaded successfully!',
      data: response,
      db: resultdb
    };
  }

  // Download one file
  @Get('file/:filename')
  getFile(@Param('filename') file: string, @Res() res: any) {
    const rootFolder = process.env.FILES_STORAGE_DEST;
    const response = res.sendFile(file, { root: rootFolder });
    return {
      status: HttpStatus.OK,
      data: response,
    };
  }

  // Delete one file and delete the DB record
  @Post('file/deleteonefile/:filename')
  async deleteOneFile(@Param('filename') fileName: string, @I18nLang() lang: string) {
    // File has to be within the right directory (diskstorage directory define in .env)
    // the delete corresponding record in the DB is done in deleteOneFile service 
    const response = await this.filesService.deleteOneFile(fileName, lang);
    return {
      status: HttpStatus.OK,
      data: response,
    };
  }

}
