require('dotenv').config();
require('module-alias/register')
const mapRoutes = require('./mapRoutes');
const createError = require('http-errors');
const express = require('express');
const path = require('path');
const logger = require('morgan');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser')
const app = express();

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));
app.use(cookieParser());

mapRoutes(app);

app.use(logger('dev'));
app.use(express.static(path.join(__dirname, 'public')));
app.use(function (req, res, next) {
    next(createError(404));
});
app.use(function (err, req, res, next) {
    res.locals.message = err.message;
    res.locals.error = req.app.get('env') === 'development' ? err : {};
    res.status(err.status || 500);
    res.render('error');
});
const port = process.env.PORT || 3006; // Change the port number as desired
app.set('port', port);
app.listen(port, () => {
    console.log(`Server works on http://localhost:${port}`);
});

module.exports = app;
