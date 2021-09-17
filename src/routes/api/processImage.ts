import express from 'express';
import { promises as fsPromises } from 'fs';
import logger from '../../utilities/logger';
import getImage from '../../utilities/getImage';

const processImage = express.Router();

const fs = require('fs');
const path = require('path');
const dir: string = path.resolve('cache');
const sharp = require(`sharp`);

const processRoute = async function (req: express.Request, res: express.Response): Promise<void> {
    let fileName;
    let height = req.query.height as string;
    let width = req.query.width as string;
    if (req.query.filename) {
        fileName = req.query.filename as string;
    } else {
        res.status(400).send(`Missing filename`);
        return;
    }
    if (!parseInt(height)) {
        res.status(400).send(`Missing height`);
        return;
    }
    if (!parseInt(width)) {
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
    const img = await getImage(args);

    res.status(200).sendFile(img);
};

processImage.get('/', logger, (req: express.Request, res: express.Response): void => {
    console.log('processImage route');
    console.log(req.url);
    processRoute(req, res);
});

export default processImage;
