var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
const mongoose = require('mongoose');
require('dotenv').config();

var indexRouter = require('./routes/indexRoutes');
var alumniRoutes = require('./routes/alumniRoutes');
var facultyRoutes = require('./routes/facultyRoutes');
var adminRoutes = require('./routes/adminRoutes');
var eventRoutes = require('./routes/eventRoutes');
var newsRoutes = require('./routes/newsRoutes');

mongoose.connect(process.env.DB_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
}).catch(error => {
    console.log("Could not establish connection to database.");
    console.log('\n**********\n' + error);
    process.exit();
})

mongoose.connection.on('connected', () => {
    console.log('**********\nConnection with database established.\n**********');
})

mongoose.connection.on('error', err => {
    console.log('Connection with db lost.');
    console.log('\n**********\n' + error);
    process.exit();
})

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
