import { extname } from 'path';
import { HttpException, HttpStatus } from '@nestjs/common';

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

// Allow only images
export const imageFileFilter = (req, file, callback) => {
  // const listOfExtensions = "\.(jpg|jpeg|png|gif)$"
  // for the regex to work with the const .env var: scratch the first and the last /
  const listOfExtensions = process.env.IMAGES_EXTENSIONS_REGEX;
  if (!file.originalname.match(`${listOfExtensions}`)) {
  console.log("list of extensions: ", listOfExtensions)
  // if (!file.originalname.match(/\.(jpg|jpeg|png|gif)$/)) {
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

export const fileFileFilter = (req, file, callback) => {
  // const listOfExtensions = "\.(pdf|doc|docx|xlsx|xls|txt)$"
  // for the regex to work with the const .env var: scratch the first and the last /
  const listOfExtensions = process.env.FILES_EXTENSIONS_REGEX;
  if (!file.originalname.match(`${listOfExtensions}`)) {
  // if (!file.originalname.match(/\.(pdf|doc|docx|xlsx|xls|txt)$/)) {
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

export const fileMaxSize = (req, file, callback) => {
  const fileMaxSize = process.env.FILES_MAX_SIZE;
  const valueCallBack =fileMaxSize // './uploadedimages'
  callback(null, valueCallBack);
};

export const imageMaxSize = (callback) => {
  const imageMaxSize = process.env.IMAGES_MAX_SIZE;
  console.log("maxsize = ", imageMaxSize)
  const valueCallBack = imageMaxSize;
  callback(valueCallBack);
};