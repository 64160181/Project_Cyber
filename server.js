const express = require('express');
const conmysql = require('./models/ConMysql.js');
const app = express();
const bodyParser = require('body-parser');
const path = require('path');
const ejs = require('ejs');
const flash = require('express-flash');
const session = require('express-session');
const port = process.env.PORT || 3000;

app.use(session({
    secret: 'keyboard',
    resave: false,
    saveUninitialized: true,
    cookie: { maxAge: 60*60*1000 }
}));
app.use(flash());

app.use(express.static(path.join(__dirname, 'public')));
app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({ extended: true }));

app.get('/', require('./routes/index'));
app.get('/logout', require('./routes/index'));

app.get('/login', require('./routes/login'));
app.post('/loginUser', require('./routes/login'));

app.get('/signup', require('./routes/signup'));
app.post('/registerUser', require('./routes/signup'));

app.get('/profile', require('./routes/profile'));
app.get('/editProfile', require('./routes/profile'));
app.post('/update_user', require('./routes/profile'));
app.post('/update_password', require('./routes/profile'));

app.get('/post_board', require('./routes/board'));
app.get('/my_board', require('./routes/board'));
app.get('/show_post/:id', require('./routes/board'));
app.post('/add_new_post', require('./routes/board'));
app.post('/delete_post', require('./routes/board'));
app.post('/edit_post', require('./routes/board'));
app.post('/edit_post_view', require('./routes/board'));

app.get('/adminBKB', require('./routes/admin'));
app.post('/view_user_profile', require('./routes/admin'));
app.post('/view_edit_user', require('./routes/admin'));
app.post('/edit_user', require('./routes/admin'));
app.post('/edit_password', require('./routes/admin'));
app.post('/delete_user', require('./routes/admin'));

app.post('/comments', require('./routes/board'));


app.listen(port, () => {
    console.log('Server has started with port 3000');
    console.log('http://localhost:3000');
});