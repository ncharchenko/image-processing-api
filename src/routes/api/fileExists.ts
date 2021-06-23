import express from 'express';
import {promises as fsPromises} from 'fs';
import logger from '../../utilities/logger';

const fs = require('fs');
const fileExists = express.Router();
const dir = fs.resolve('../../../cache');

/**
 * Check if the file with given height and width exists in cache. If so, return.
 * Otherwise, check if the image file exists and perform resize/cache if image is found, else throw error.
 */
fileExists.get('/', (req, res) => {
    // TODO: Implement
});

export default fileExists;