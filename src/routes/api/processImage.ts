import express from 'express';
import {promises as fsPromises} from 'fs';
import logger from '../../utilities/logger';

const processImage = express.Router();

const fs = require('fs');
const path = require('path');
const dir = path.resolve('cache');
const sharp = require(`sharp`);

const resizeImage = function(fileName: string, height: number, width: number) {
    // Resize image
    try {
        const img_dir = path.resolve('images');
        const filePath: string = path.join(img_dir,fileName);
        const img = fs.accessSync(filePath);
        let fileNameSplit = fileName.split('.');
        const resizedFileName = `${fileNameSplit[0]}-${height}-${width}.jpg`;
        if (!fs.existsSync(dir)){
            fs.mkdirSync(dir);
        }
        sharp(filePath).resize(height,width).jpeg({quality: 50}).toFile(path.join(dir,resizedFileName));
        return path.join(dir,resizedFileName);
    } catch (err) {
        // Catch an error with image resizing
        console.log(err);
        return "ERROR: Specified image not found!";
    }
}

const getImage = function(query: string) {
    const imageInfo = JSON.parse(query);
    // Is there a cleaner way to do this? Without this math, the dimensions become strings.
    const height: number = imageInfo.height as number * 1;
    const width: number = imageInfo.width as number * 1;
    const fileName: string = `${imageInfo.fileName}-${height}-${width}.jpg`;
    try {
        let filePath: string = path.join(dir,fileName);
        const img = fs.accessSync(filePath);
        // Return image from cache
        return img;
    } catch (err) {
        // Attempt to resize image
        console.log(`error ${err}`);
        if (err.code === 'ENOENT') {
            console.log(typeof(height), typeof(width));
            const img = resizeImage(`${imageInfo.fileName}.jpg`, height as number, width as number);
            return img;
        }
    }
}

processImage.get('/', logger, (req: express.Request, res: express.Response) => {
    console.log("processImage route");
    console.log(req.url);
    let fileName;
    let height;
    let width;
    if (req.query.filename) {
        fileName = req.query.filename;
    }
    else {
        res.status(400).send(`Missing filename`);
        return;
    }
    if (req.query.height) {
        height = req.query.height;
    }
    else {
        res.status(400).send(`Missing height`);
        return;
    }
    if (req.query.width) {
        width = req.query.width;
    }
    else {
        res.status(400).send(`Missing width`);
        return;
    }

    // If our query is valid, build a JSON string to pass into getImage.
    let query = {
        fileName: fileName,
        height: height,
        width: width
    };
    console.log(query);
    let args: string = JSON.stringify(query);
    let img_path = getImage(args);

    res.status(200).send(getImage(args));
});

export default processImage;