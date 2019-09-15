const express = require('express');
const bodyParser = require('body-parser');
const dotenv = require('dotenv');
const logger = require('morgan');
const app = express();

/**
 * raven sentry: monitor and fix crashes in real time  
 */
if (process.env.NODE_ENV === 'development') {
    dotenv.config({ path: '.env.development' });
}
if (process.env.NODE_ENV === 'production') {
    dotenv.config({ path: '.env.production' });
}

app.use(logger('dev'));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.disable('x-powered-by');
app.set('port', process.env.PORT);
app.set('host', process.env.NODEJS_IP);

const userController = require('./controllers/user');

app.get('/api/v1.0', (req, res) => { res.json({ hello: 'CMS-API JS' }); });
app.post('/api/v1.0/user/signup', userController.postSignUpUser);
app.post('/api/v1.0/user/login', userController.postLogin);
app.post('/api/v1.0/user/profile', userController.postProfile);

/**
 * Initialize server
 */
app.listen(app.get('port'), app.get('host'), () => {
    console.log(`Microservicio corriendo en http://${app.get('host')}:${app.get('port')}`);
});