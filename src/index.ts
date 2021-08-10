import express from 'express';
import logger from './utilities/logger';
import routes from './routes/index';

const app = express();

const port = 3000;

app.use('/', routes);
app.use(logger);

app.listen(port, () => {
    console.log(`Hello world! I am listening on port ${port}!`)
});

export default app;