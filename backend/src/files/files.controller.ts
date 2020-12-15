import { Controller, Get, Post, Body, Put, Param, Delete, UseInterceptors, UploadedFile, UploadedFiles, HttpStatus, Res } from '@nestjs/common';
import { FilesService } from './files.service';
import { CreateFileDto } from './dto/create-file.dto';
import { UpdateFileDto } from './dto/update-file.dto';
import { FileInterceptor, FilesInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { editFileName, fileFileFilter, imageFileFilter } from 'src/files/file-uploading.utils';
import { UtilitiesService } from 'src/utilities/utilities.service';
import { I18nLang } from 'nestjs-i18n';

@Controller('files')
export class FilesController {
  constructor(
    private readonly filesService: FilesService,
    private readonly utilitiesService: UtilitiesService) {
      
    }

  destinationImagePath = './uploadedimages'
  // Uploag one image file
  @Post('uploadoneimage')
  @UseInterceptors(
    FileInterceptor('image', {
      storage: diskStorage({
        // destination: destinationFilePath,
       // destination: './uploadedimages',
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
  @Post('uploadmultipleimage')
  @UseInterceptors(
    FilesInterceptor('image', 10, {
      storage: diskStorage({
        //destination: './uploadedimages',
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
    const response = res.sendFile(image, { root: './uploadedimages' });
    return {
      status: HttpStatus.OK,
      data: response,
    };
  }

  // Upload one file
  @Post('uploadonefile')
  @UseInterceptors(
    FileInterceptor('file', {
      storage: diskStorage({
        destination: './uploadedfiles',
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

  @Get('file/:filename')
  getFile(@Param('filename') file, @Res() res) {
    const response = res.sendFile(file, { root: './uploadedfiles' });
    return {
      status: HttpStatus.OK,
      data: response,
    };
  }

  @Post('file/deleteonefile/:filename')
  async deleteOneFile(@Param('filename') fileName, @Res() res, @I18nLang() lang: string) {
   return this.filesService.deleteOneFile(fileName, lang);
  }
}
