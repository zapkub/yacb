import { json } from 'body-parser';
import express from 'express';
import { config } from './config';
import { getIntentProcessorHandler } from './intentproc';
const morgan = require('morgan');


console.log('start....');
async function bootstrap() {
    const app = express();
    app.use(json({}));
    app.use(morgan('tiny'));


    app.post('/line', getIntentProcessorHandler());

    app.all('*', (req, res) => {
        res.status(404);
        res.send('empty');
    });


    app.listen(config.port, () => {
        console.log('> Ready to serve at http://localhost:' + config.port);
    });
}


bootstrap();