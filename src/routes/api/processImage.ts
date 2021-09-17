import express from 'express';
import { promises as fsPromises } from 'fs';
import fs from 'fs';
import path from 'path';
import logger from '../../utilities/logger';
import getImage from '../../utilities/getImage';

const processImage = express.Router();
const imgDir: string = path.resolve('images');
const cacheDir: string = path.resolve('cache');
const sharp = require(`sharp`);

const processRoute = async function (req: express.Request, res: express.Response): Promise<void> {
    let fileName = req.query.filename as string;
    let height = req.query.height as string;
    let width = req.query.width as string;
    let filePath = path.join(imgDir,`${fileName}.jpg`);
    if (fileName == null || !fs.existsSync(filePath)) {
        res.status(400).send(`Missing filename`);
        return;
    }
    if (!parseInt(height) || parseInt(height) < 0) {
        res.status(400).send(`Missing height`);
        return;
    }
    if (!parseInt(width) || parseInt(width) < 0) {
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
