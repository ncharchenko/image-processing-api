import express from 'express';
import {promises as fsPromises} from 'fs';
import logger from '../../utilities/logger';

const processImage = express.Router();

const fs = require('fs');
const path = require('path');
const dir = path.resolve('../../../cache');
const sharp = require(`sharp`);

const resizeImage = function(fileName: string, height: number, width: number) {
    // Resize image
    console.log('resize');
    try {
        const filePath: string = path.join("../../../images",fileName)
        const resizedFileName = `${fileName}-${height}-${width}.jpg`
        sharp(filePath).resize(height,width).jpeg({quality: 50}).toFile(fs.join(dir,resizedFileName));
        console.log("Resizing image");
        return fs.readFile(fs.join(dir,resizedFileName));
    } catch {
        // Catch an error with image resizing
        return "ERROR: Specified image not found!";
    }
}

const getImage = function(query: string) {
    console.log('getImage');
    const imageInfo = JSON.parse(query);
    let height: number = imageInfo.height;
    let width: number = imageInfo.width;
    let fileName: string = `${imageInfo.fileName}-${height}-${width}.jpg`;
    let filePath: string = path.join(dir,fileName);
    try {
        const img = fsPromises.readFile(filePath, 'utf-8');
        // Return image from cache
        return img;
    } catch {
        // Attempt to resize image
        const img = resizeImage(`${fileName}.jpg`, height, width);
        return img;
    }
}

processImage.get('/', logger, (req) => {
    console.log("processImage route");
    let fileName;
    let height;
    let width;
    if (req.query.fileName) {
        fileName = req.query.filename;
    }
    else {
        return `Missing filename`;
    }
    if (req.query.height) {
        height = req.query.height;
    }
    else {
        return `Missing height`;
    }
    if (req.query.width) {
        width = req.query.width;
    }
    else {
        return `Missing width`;
    }

    // If our query is valid, build a JSON string to pass into getImage.
    let query = {
        fileName: fileName,
        height: height,
        width: width
    };
    console.log(query);
    let args: string = JSON.stringify(query);
    return getImage(args);
});

export default processImage;