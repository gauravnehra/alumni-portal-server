var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var indexRouter = require('./routes/index');
var alumniRoutes = require('./routes/alumniRoutes');
var facultyRoutes = require('./routes/facultyRoutes');
var adminRoutes = require('./routes/adminRoutes');
var eventRoutes = require('./routes/eventRoutes');
var newsRoutes = require('./routes/newsRoutes');

var app = express();

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/alumni', alumniRoutes);
app.use('/faculty', facultyRoutes);
app.use('/admin', adminRoutes);
app.use('/event', eventRoutes);
app.use('/news', newsRoutes);


module.exports = app;
