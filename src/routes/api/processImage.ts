import express from 'express';
import {promises as fsPromises} from 'fs';
import logger from '../../utilities/logger';

const processImage = express.Router();

const fs = require('fs');
const dir = fs.resolve('../../../cache');

processImage.get('/', logger, (req, res) => {

});

export default processImage;