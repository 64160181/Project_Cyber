const express = require('express');
const conmysql = require('./models/ConMysql.js');
const app = express();
const bodyParser = require('body-parser');
const path = require('path');
const ejs = require('ejs');

app.use(express.static(path.join(__dirname, 'public')));
app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({ extended: true }));

app.get('/', require('./routes/index'));
app.get('/login', require('./routes/login'));
app.get('/signup', require('./routes/signup'));
app.post('/registerUser', require('./routes/signup'));

app.listen(3000, () => {
    console.log('Server has started with port 3000');
});