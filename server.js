const express = require('express');
const conmysql = require('./models/ConMysql.js');
const app = express();
const bodyParser = require('body-parser');
const path = require('path');
const ejs = require('ejs');
const flash = require('express-flash');
const session = require('express-session');

app.use(session({
    secret: 'keyboard',
    resave: false,
    saveUninitialized: true,
    cookie: { maxAge: 60*60*1000 }
}));
app.use(flash());

app.use(express.static(path.join(__dirname, 'public')));
app.set('view engine', 'ejs');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.get('/', require('./routes/index'));
app.get('/login', require('./routes/login'));
app.get('/signup', require('./routes/signup'));
app.get('/post_board', require('./routes/post_board'));
app.get('/my_board', require('./routes/my_board'));
app.get('/logout', require('./routes/index'));
app.get('/show_post/:id', require('./routes/show_post'));
app.post('/registerUser', require('./routes/signup'));
app.post('/loginUser', require('./routes/login'));
app.post('/add_new_post', require('./routes/post_board'));
app.post('/edit/:id', require('./routes/my_board'));
app.post('/delete/:id', require('./routes/my_board'));

app.listen(3000, () => {
    console.log('Server has started with port 3000');
    console.log('http://localhost:3000');
});