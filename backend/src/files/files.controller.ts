import { Controller, Get, Post, Body, Put, Param, Delete, UseInterceptors, UploadedFile, UploadedFiles, HttpStatus, Res } from '@nestjs/common';
import { FilesService } from './files.service';
import { CreateFileDto } from './dto/create-file.dto';
import { UpdateFileDto } from './dto/update-file.dto';
import { FileInterceptor, FilesInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { editFileName, fileFileFilter, imageFileFilter, destinationFilePath, destinationImagePath } from 'src/files/file-uploading.utils';
import { UtilitiesService } from 'src/utilities/utilities.service';
import { I18nLang } from 'nestjs-i18n';
import { config } from 'dotenv/types';
import { ConfigService } from '@nestjs/config';

@Controller('files')
export class FilesController {
  constructor(
    private readonly filesService: FilesService,
    private readonly utilitiesService: UtilitiesService) {
    }

  // Uploag one image file
  @Post('uploadoneimage')
  @UseInterceptors(
    FileInterceptor('image', {
      storage: diskStorage({
        // destination: destinationImagePath,
        destination: destinationImagePath ,
        filename: editFileName,
      }),
      fileFilter: imageFileFilter,
    }),
  )
  async uploadedImage(@UploadedFile() file) {
    const response = {
      originalname: file.originalname,
      filename: file.filename,
    };
    return {
      status: HttpStatus.OK,
      message: 'Image uploaded successfully!',
      data: response,
    };
  }
 
  // Upload multiple image files
  @Post('uploadmultipleimages')
  @UseInterceptors(
    FilesInterceptor('image', 10, {
      storage: diskStorage({
        destination: destinationImagePath,
        filename: editFileName,
      }),
      fileFilter: imageFileFilter,
    }),
  )
  async uploadMultipleImages(@UploadedFiles() files) {
    const response = [];
    files.forEach(file => {
      const fileReponse = {
        originalname: file.originalname,
        filename: file.filename,
      };
      response.push(fileReponse);
    });
    return {
      status: HttpStatus.OK,
      message: 'Images uploaded successfully!',
      data: response,
    };
  }

  @Get('image/:imagename')
  getImage(@Param('imagename') image, @Res() res) {
    const response = res.sendFile(image, { root: './uploadedfiles' });
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
  @UseInterceptors(
    FileInterceptor('file', {
      storage: diskStorage({
        destination: destinationFilePath,
        filename: editFileName,
      }),
      fileFilter: fileFileFilter,
    }),
  )
  async uploadedFile(@UploadedFile() file) {
    const response = {
      originalname: file.originalname,
      filename: file.filename,
    };
    return {
      status: HttpStatus.OK,
      message: 'File uploaded successfully!',
      data: response,
    };
  }


  // Upload multiple image files
  @Post('uploadmultiplefiles')
  @UseInterceptors(
    FilesInterceptor('image', 10, {
      storage: diskStorage({
        destination: destinationFilePath,
        filename: editFileName,
      }),
      fileFilter: imageFileFilter,
    }),
  )
  async uploadMultipleFiles(@UploadedFiles() files) {
    const response = [];
    files.forEach(file => {
      const fileReponse = {
        originalname: file.originalname,
        filename: file.filename,
      };
      response.push(fileReponse);
    });
    return {
      status: HttpStatus.OK,
      message: 'Images uploaded successfully!',
      data: response,
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

}
