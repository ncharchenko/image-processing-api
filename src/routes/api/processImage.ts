import express from 'express';
import { promises as fsPromises } from 'fs';
import logger from '../../utilities/logger';
import getImage from '../../utilities/getImage';

const processImage = express.Router();

const fs = require('fs');
const path = require('path');
const dir: string = path.resolve('cache');
const sharp = require(`sharp`);

processImage.get('/', logger, (req: express.Request, res: express.Response) => {
    console.log('processImage route');
    console.log(req.url);
    let fileName;
    let height;
    let width;
    if (req.query.filename) {
        fileName = req.query.filename;
    } else {
        res.status(400).send(`Missing filename`);
        return;
    }
    if (req.query.height) {
        height = req.query.height;
    } else {
        res.status(400).send(`Missing height`);
        return;
    }
    if (req.query.width) {
        width = req.query.width;
    } else {
        res.status(400).send(`Missing width`);
        return;
    }

    // If our query is valid, build a JSON string to pass into getImage.
    const query = {
        fileName: fileName,
        height: height,
        width: width,
    };
    console.log(query);
    const args: string = JSON.stringify(query);
    const img_path = getImage(args);

    res.status(200).send(getImage(args));
});

export default processImage;
