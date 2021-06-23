import express from 'express';
import fileExists from './api/fileExists';
import validateQuery from './api/validateQuery';
import processImage from './api/processImage';
import logger from '../utilities/logger';

const routes = express.Router();

routes.get('/', logger, (req, res) => {
    res.status(200).send('OK');
});

routes.use('/validateQuery', validateQuery);
routes.use('/processImage', processImage);
routes.use('/fileExists', fileExists);

export default routes;