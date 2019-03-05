const mongoose = require ('mongoose');

mongoose.connect('mongodb://localhost/randon',{
    useNewUrlParser: true
})

.then( db => console.log('db esta conectada'))
.catch( err => console.error(err));
