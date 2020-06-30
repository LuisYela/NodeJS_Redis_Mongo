const mongoose =require('mongoose');
const { Schema } = mongoose;

const CoronaSchema= new Schema({
    departamento: {type:String, required:true},
    dpi: {type: String, required:true},
    edad: {type:Number, required:true},
    fecha: {type:Date, default: Date.now}
});

module.exports=mongoose.model('Corona', CoronaSchema);