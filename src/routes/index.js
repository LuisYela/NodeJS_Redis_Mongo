const express = require('express');
const router = express.Router();
const redis = require('redis');

//conect mongo
const CoronaDatos = require('../models/CoronaDatos');

//ceate redis client
let client =redis.createClient();
client.on('connect', function(){
    console.log('Conectado a Redis');
});

router.get('/', async(req,res)=>{
    const datos = await CoronaDatos.find();
    let datosFormR = client.hgetall('datosCovid',(err,obj)=>{
        if(!obj){
            console.log('error no existe informacion')
        }else{
            const datosFormRedis = obj;
            //console.log(datosFormRedis);
            res.render('index',{datosFormRedis, datos});
        }
    });
});

router.get('/about',(req,res)=>{
    res.render('about');
});

router.get('/graficos',(req,res)=>{
    res.render('graficos');
});

router.get('/addToRedis',(req,res)=>{
    res.render('addToRedis');
});

router.post('/graficos', async(req, res)=>{
    const {departamento, dpi, edad}=req.body;
    console.log(req.body);
    const errors=[];
    if(!departamento || !dpi || !edad){
        errors.push({text:'Debe llenar todos los campos'});
    }
    if(errors.length>0){
        res.render('graficos', {
            errors,
            departamento,
            dpi,
            edad
        });
    }else{
        const newDato = new CoronaDatos({departamento,dpi,edad});
        await newDato.save();
        res.redirect('/');
    }
});

router.post('/addToRedis', function(req, res, next){
    const {departamento, dpi, edad}=req.body;
    console.log(req.body);
    const errors=[];
    if(!departamento || !dpi || !edad){
        errors.push({text:'Debe llenar todos los campos'});
    }
    if(errors.length>0){
        res.render('addToRedis', {
            errors,
            departamento,
            dpi,
            edad
        });
    }else{
        client.hmset('datosCovid',[
            'departamento', departamento,
            'dpi', dpi,
            'edad', edad
        ]);
        res.redirect('/');
    }
});

module.exports = router;