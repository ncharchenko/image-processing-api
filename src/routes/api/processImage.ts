import express from 'express';
import {promises as fsPromises} from 'fs';

const processImage = express.Router();

const fs = require('fs');
const dir = fs.resolve('../../../cache');



export default processImage;