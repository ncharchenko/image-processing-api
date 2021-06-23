import express from 'express';
import {promises as fsPromises} from 'fs';
import logger from '../../utilities/logger';

const validateQuery = express.Router();

validateQuery.get('/', (req, res) => {
    if (req.query.fileName) {
        let fileName = req.query.fileName;
    }
    else {
        res.status(400).send(`Missing filename`);
    }
    if (req.query.height) {
        let height = req.query.height;
    }
    else {
        res.status(400).send(`Missing height`);
    }
    if (req.query.width) {
        let width = req.query.width;
    }
    else {
        res.status(400).send(`Missing width`);
    }
    // Check
});

export default validateQuery;