import { Controller, Get, Post, Body, Put, Param, Delete, UseInterceptors, UploadedFile, UploadedFiles, HttpStatus, Res } from '@nestjs/common';
import { FilesService } from './files.service';
import { CreateFileDto } from './dto/create-file.dto';
import { UpdateFileDto } from './dto/update-file.dto';
import { FileInterceptor, FilesInterceptor} from '@nestjs/platform-express';
import { UtilitiesService } from 'src/utilities/utilities.service';
import { I18nLang } from 'nestjs-i18n';
import { imageMulterOptions } from './files-image-multer-options';
import { fileMulterOptions } from './files-file-multer-options';
import * as sharp from 'sharp';
import * as path from 'path';
import { promisify } from 'util';
import { readFile } from 'fs';

const readFileAsyc = promisify(readFile);

@Controller('files')
export class FilesController {
  private readonly sizes: string[];
  constructor(
    private readonly filesService: FilesService,
    private readonly utilitiesService: UtilitiesService) {
      this.sizes = ['25X25', '50X50', '100X100', '200X200', '400X400', '900X900'];
    }

  // Uploag one image file

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

  @Get('image/:imagename')
  getImage(@Param('imagename') image, @Res() res) {
    // Get the original image (not sized)
    const response = res.sendFile(image, { root: './uploadedimages' });
    return {
      status: HttpStatus.OK,
      data: response,
    };
  }

  @Get('imagesized/:imagename/:size')
  // Get the image for a specific predefined size
  getImageSized(@Param('imagename') image, @Param('size') size, @Res() res) {
    // size ex '25X25', '50X50', '100X100', '200X200', '400X400', '900X900'
    const rootFolder = './uploadedimages'+path.sep+size
    const response = res.sendFile(image, { root: rootFolder });
    return {
      status: HttpStatus.OK,
      data: response,
    };
  }

  @Post('file/deleteoneimage/:filename')
  async deleteOneImage(@Param('filename') fileName, @I18nLang() lang: string) {
    const response = await this.filesService.deleteOneImage(fileName, lang);
    return {
      status: HttpStatus.OK,
      data: response,
    };
  }
  

  @Post('uploadonefile')
  @UseInterceptors(FileInterceptor('file', fileMulterOptions))
  async uploadedFile(@UploadedFile() file) {
    console.log(file)
    const response = {
      originalName: file.originalname,
      fileName: file.filename,
      typeFile: file.mimetype,
      size: file.size
    };
    const result = await this.filesService.createOneFileInDB(response)
    return {
      status: HttpStatus.OK,
      message: 'File uploaded successfully!',
      data: response,
      db: result
    };
  }

  // Upload multiple image files
  @Post('uploadmultiplefiles')
  @UseInterceptors(FilesInterceptor('file', 10, fileMulterOptions))
  async uploadMultipleFiles(@UploadedFiles() files) {
    const response = [];
    const resultdb = [];
    files.forEach(file => {
      const fileReponse = {
        originalname: file.originalname,
        filename: file.filename,
        typeFile: file.mimetype,
        size: file.size
      };
      const result = this.filesService.createOneFileInDB(fileReponse)
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

  @Get('file/:filename')
  getFile(@Param('filename') file, @Res() res) {
    const response = res.sendFile(file, { root: './uploadedfiles' });
    return {
      status: HttpStatus.OK,
      data: response,
    };
  }

  @Post('file/deleteonefile/:filename')
  async deleteOneFile(@Param('filename') fileName, @I18nLang() lang: string) {
    // File has to be within the right directory (diskstorage directory define in .env)
    const response = await this.filesService.deleteOneFile(fileName, lang);
    return {
      status: HttpStatus.OK,
      data: response,
    };
  }

  // private async saveImages (file): Promise<void> {
  //   const [, ext] = file.mimetype.split('/');
  //   if (['jpeg', 'jpg', 'png'].includes(ext)) {
  //     this.sizes.forEach((s: string) => {
  //       const [size] = s.split('X');
  //       // console.log(`${__dirname}/../uploadedimages/${s}/${file.fileName}`)
  //       readFileAsyc(file.path)
  //         .then((b: Buffer) => {
  //           return sharp(b)
  //             .resize(+size)
  //             .toFile(
  //               // `${__dirname}/../uploadedimages/${s}/${file.fileName}`,
  //               `./uploadedimages/${s}/${file.filename}`,
  //             );
  //         })
  //         .then(console.log)
  //         .catch(console.error);
  //     });
  //   }
  // }

}
