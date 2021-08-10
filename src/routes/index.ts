import express from 'express';
import processImage from './api/processImage';
import logger from '../utilities/logger';

const routes = express.Router();

routes.get('/', logger, (req, res) => {
    res.status(200).send('OK');
});

routes.use('/processImage', processImage);

export default routes;