require('dotenv').config();
require('module-alias/register')
const {HttpStatusCode} = require("axios");
const mapRoutes = require('./mapRoutes');
const createError = require('http-errors');
const express = require('express');
const path = require('path');
const logger = require('morgan');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const jwtprivatekey = process.env.JWT_PRIVATE_KEY;
if (!jwtprivatekey) {
    throw new Error('JWT_PRIVATE_KEY is required for env variables');
}
const SESSION_EXPIRED = 429
const {verify} = require("jsonwebtoken");
const app = express();

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));
app.use(cookieParser());

app.use((req, res, next) => {
    if (['/login', '/register'].includes(req.url)) {
        next();
    } else {
        const token = req.headers.authorization.replace(/^Bearer\s+/, "").trim();
        if (token.length === 0) {
            res.status(HttpStatusCode.Unauthorized).send("No token provided");
            return;
        }
        try {
            verify(token, jwtprivatekey);
            next();
        } catch (err) {
            res.status(SESSION_EXPIRED).send();
        }
    }
});

mapRoutes(app);

app.use(logger('dev'));
app.use(express.static(path.join(__dirname, 'public')));
app.use(function (req, res, next) {
    next(createError(404));
});
app.use((err, req, res, next) => {
    res.locals.message = err.message;
    res.locals.error = req.app.get('env') === 'development' ? err : {};
    res.status(err.status || 500);
    res.render('error');
});
const port = process.env.PORT || 4000; // Change the port number as desired
app.set('port', port);
app.listen(port, () => {
    console.log(`Server works on http://localhost:${port}`);
});

module.exports = app;
