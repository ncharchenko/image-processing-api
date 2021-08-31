import express from 'express';
import { promises as fsPromises } from 'fs';
import logger from '../utilities/logger';

const fs = require('fs');
const path = require('path');
const dir: string = path.resolve('cache');
const sharp = require(`sharp`);

const resizeImage = function (fileName: string, height: number, width: number) {
    // Resize image
    try {
        const img_dir = path.resolve('images');
        const filePath: string = path.join(img_dir, fileName);
        const fileNameSplit = fileName.split('.');
        const resizedFileName = `${fileNameSplit[0]}-${height}-${width}.jpg`;
        if (!fs.existsSync(dir)) {
            fs.mkdirSync(dir);
        }
        sharp(filePath).resize(height, width).jpeg({ quality: 50 }).toFile(path.join(dir, resizedFileName));
        return path.join(dir, resizedFileName) as string;
    } catch (err) {
        // Catch an error with image resizing
        console.log(err);
        return 'ERROR: Specified image not found!';
    }
};

export default resizeImage;
