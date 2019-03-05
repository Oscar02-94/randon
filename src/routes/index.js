const { Router } = require ('express');
const router = Router();
const path = require('path');
const Image = require('../models/image')
//usamos unlink para eliminar la imagen que tenemos almacenada en nustras rutas
const { unlink } = require('fs-extra')
//el metodo path lo usamos para posisionarnos en la carpeta donde esten almacenadas nutras img
const paht = require('path');

//const ejsLint = require('ejs-lint');

router.get('/',  async(req, res) => {
   const images = await Image.find()
   //console.log(images);
   
   res.render( 'index', { images });
});

router.get('/subida', (req, res) => {
    res.render('upload');
});

router.post('/uploader', async (req, res) => {
    const image = new Image();
    image.title = req.body.title,
    image.description = req.body.description,
    image.fieldname = req.body.filename,
    image.path = '/img/uploads/' + req.file.filename,
    image.originalname = req.file.originalname,
    image.mimetype = req.file.mimetype,
    image.size = req.file.size,

    await image.save();
    // con esto redireccionamos ala paagina principal
    res.redirect('/');
    //console.log(image);
    //console.log(req.file)
    res.send('upload');
});



router.get('/image/:id', async (req, res) => {
    const { id } = req.params;
    const image = await Image.findById(id);
    console.log(image)
    res.render('perfil', { image });

});


router.get('/image/:id/delete', async (req, res) => {
    //con este codigo emos eliminado los datos de la imagen que tenemos  almacenados en la base de datos
    const { id } = req.params;
     const image = await Image.findByIdAndDelete(id);
     //aqui le decimos la ruta con unlink donde esat ubicada la carpeta donde tenemos guardadas nuestras imagenes,
     //ya que mostramos la ruta le concatenamos la imagen y le decimos el camino con path
    await unlink(path.resolve('./src/public' + image.path));
    //No quiero que me mustre ningun mensaje quiero que me redireccione ala vista principal
    //res.send('imagen eliminada')
    res.redirect('/')
});




module.exports = router; 
