const express = require ('express');
const path = require('path');
const morgan = require ('morgan');
const multer = require('multer');
const uuid = require('uuid/v4');
//los usaamos para formatear las fechas 
const {format}=require('timeago.js')

//const ejsLint = require('ejs-lint');

//inicializacion
const app= express();
//conexion de la base de datos
require('./database');

//seting
app.set('port',process.env.PORT || 3000);
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

//middelware

app.use(morgan('dev'));
app.use(express.urlencoded({ extended: false}));
const storage = multer.diskStorage({
    //con destination le damos el camino a las carpetas  siguiendo las rutas 
    destination: path.join(__dirname, 'public/img/uploads'),
    //le damos al uuid la extencion de la imagen
    filename:(req, file, cb, filename) => {
        cb(null, uuid() + path.extname(file.originalname));
    }
});

app.use(multer({ storage: storage }).single('image'));
 

//global Variable
//aqui usamos timeago para la formatear la fecha
app.use((req, res, next) => {
    app.locals.format = format;
    next()
})


//Router
app.use(require('./routes/index'));

//archivos estaticos
//con esta linea de codigo le estamos indicando  al navegador que los archivos que busca esn en la carpeta public
app.use(express.static(path.join(__dirname, 'public')));

//server start
app.listen(3000, () => {
    console.log(`server on port ${app.get('port')}`);
});