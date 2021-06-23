import express from 'express';
import fileExists from './api/fileExists';
import processImage from './api/processImage';

const routes = express.Router();

routes.get('/', (req, res) => {
    res.status(200).send('OK');
});

routes.use('/fileExists', fileExists);
routes.use('/processImage', processImage);

export default routes;