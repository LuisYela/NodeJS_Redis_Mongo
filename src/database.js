const mongoose = require('mongoose');

//mongoose.connect('mongodb://localhost/datosCorona', {
mongoose.connect('mongodb://34.72.188.135:27017/datosCorona', {
    useCreateIndex:true,
    useNewUrlParser:true,
    useFindAndModify:false
})
    .then(db => console.log('DB conectada'))
    .catch(err => console.error(err))

