const mongoose =require('mongoose');
const { Schema } = mongoose;

const CoronaSchema= new Schema({
    Nombre:{type: String, required:true},
    Departamento: {type:String, required:true},
    Edad: {type:Number, required:true},
    Forma_contagio: {type: String, required:true},
    Estado: {type: String, required:true},
});

module.exports=mongoose.model('Corona', CoronaSchema);