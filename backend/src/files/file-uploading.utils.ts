import { extname } from 'path';
import { HttpException, HttpStatus } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';


// Allow only images
export const imageFileFilter = (req, file, callback) => {
  // const listOfExtensions = "/\.(jpg|jpeg|png|gif)$/"
  const listOfExtensions = process.env.IMAGES_EXTENSIONS_REGEX;
  if (!file.originalname.match(listOfExtensions)) {
    return callback(
      new HttpException(
        'Only image files are allowed!',
        HttpStatus.BAD_REQUEST,
      ),
      false,
    );
  }
  callback(null, true);
};

export const editFileName = (req, file, callback) => {
  // Add a random 10 number to the uploaded file name
  const name = file.originalname.split('.')[0];
  const fileExtName = extname(file.originalname);
  const randomName = Array(4)
    .fill(null)
    .map(() => Math.round(Math.random() * 10).toString(10))
    .join('');
  callback(null, `${name}${randomName}${fileExtName}`);
};

export const fileFileFilter = (req, file, callback) => {
  // const listOfExtensions = "/\.(pdf|doc|docx|xlsx|xls|txt)$/"
  const listOfExtensions = process.env.IMAGES_EXTENSIONS_REGEX;
  if (!file.originalname.match(listOfExtensions)) {
    return callback(
      new HttpException(
        'Only some types of files are allowed!',
        HttpStatus.BAD_REQUEST,
      ),
      false,
    );
  }
  callback(null, true);
};

export const destinationFilePath = (req, file, callback) => {
  const storagePath = process.env.FILES_STORAGE_DEST;
  const valueCallBack = storagePath; //'./uploadedfiles'
  callback(null, valueCallBack);
};

export const destinationImagePath = (req, file, callback) => {
  const storagePath = process.env.IMAGES_STORAGE_DEST;
  const valueCallBack =storagePath // './uploadedimages'
  callback(null, valueCallBack);
};