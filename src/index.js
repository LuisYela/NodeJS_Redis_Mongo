const express = require('express');
const path = require('path');
const Handlebars = require('handlebars');
const exphbs = require('express-handlebars');
const methodOverride = require('method-override');
const session = require('express-session');
const {allowInsecurePrototypeAccess} = require('@handlebars/allow-prototype-access');
const bodyParser=require('body-parser');
//inicializaciones
const app=express();
require('./database');

//settings
app.set('port', process.env.PORT || 3000);
app.set('views', path.join(__dirname, 'views'));
app.engine('.hbs', exphbs({
    defaultLayout: 'main',
    layoutDir: path.join(app.get('views'), 'layouts'),
    partialDir: path.join(app.get('views'), 'partials'),
    handlebars: allowInsecurePrototypeAccess(Handlebars),
    extname: 'hbs'
}));
app.set('view engine', '.hbs');

//middleswares
app.use(express.urlencoded({extended:false}));
app.use(methodOverride('_method'));
app.use(session({
    secret: 'mysecretapp',
    resave:true,
    saveUninitialized:true
}));
//global variables
//routes
app.use(require('./routes/index'));

//static files
app.use(express.static(path.join(__dirname, 'public')));

//server is listennig
app.listen(app.get('port'),()=>{
    console.log('server on port ', app.get('port'));
})

//body parser
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:false}));
