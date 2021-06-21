import express from 'express';

const routes = express.Router();

routes.get('/', (req, res) => {
    res.send('using main api route');
});

export default routes;