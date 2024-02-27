const express = require('express');
const conmysql = require('./models/ConMysql.js');
const app = express();
const bodyParser = require('body-parser');
const path = require('path');

// app.use(session({
//     secret: 'secret',
//     resave: true,
//     saveUninitialized: true
// }));

app.use(express.static(path.join(__dirname, 'public')));
app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({ extended: true }));

app.get('/', require('./routes/index'));
app.get('/login', require('./routes/login'));
app.get('/signup', require('./routes/signup'));
app.post('/registerUser', require('./routes/register'));
// app.post('/registeruser', (req, res) => {
//     console.log(req.body.username);
//     console.log(req.body.email);
//     console.log("-----------------");
//     res.render('signup', { title: 'Signup' });
// });

app.listen(3000, () => {
    console.log('Server has started with port 3000');
});