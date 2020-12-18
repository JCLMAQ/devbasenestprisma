import { extname } from 'path';
import { existsSync, mkdirSync } from 'fs';
import { diskStorage } from 'multer';
import { v4 as uuid } from 'uuid';
import { HttpException, HttpStatus } from '@nestjs/common';

// Multer configuration
export const imageMulterConfig = {
    dest: process.env.IMAGES_STORAGE_DEST,
};

// Multer upload options
export const imageMulterOptions = {

    // Enable file size limits
    limits: {
        fileSize: +process.env.IMAGES_MAX_SIZE,
    },
    // Check the mimetypes to allow for upload
    fileFilter: (req: any, file: any, cb: any) => {
        // cb = callback
        const listOfExtensions = process.env.IMAGES_EXTENSIONS_REGEX
        // if (file.mimetype.match(/\/(jpg|jpeg|png|gif)$/)) {
        if (file.mimetype.match(`${listOfExtensions}`)) {
            // Allow storage of file
            cb(null, true);
        } else {
            // Reject file
            cb(new HttpException(`Unsupported file type ${extname(file.originalname)}`, HttpStatus.BAD_REQUEST), false);
        }
    },
    // Storage properties
    storage: diskStorage({
        // Destination storage path details
        destination: (req: any, file: any, cb: any) => {
            const uploadPath = imageMulterConfig.dest;
            // Create folder if doesn't exist
            if (!existsSync(uploadPath)) {
                mkdirSync(uploadPath);
            }
            cb(null, uploadPath);
        },
        // File modification details
        filename: (req: any, file: any, cb: any) => {
            const name = file.originalname.split('.')[0];
            const fileExtName = extname(file.originalname);
            const randomName = Array(4).fill(null).map(() => Math.round(Math.random() * 10).toString(10)).join('');
            // Calling the callback passing the random name generated with the original extension name
            cb(null, `${name}${randomName}${fileExtName}`);
            // cb(null, `${uuid()}${extname(file.originalname)}`);
        },
    }),
};
