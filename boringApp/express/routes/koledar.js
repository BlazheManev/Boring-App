var express = require('express');
var app = express();
var router = express.Router();

var knex = require('knex')({
    client: 'mysql',
    connection: {
        host: '127.0.0.1',
        user: 'root',
        password: 'password',
        port: 3307,
        database: 'boringapp'
    }
});

const bookshelf = require('bookshelf')(knex);

const Skupinska_aktivnost = bookshelf.Model.extend({
    tableName: 'skupinska_aktivnost',
    idAttribute: 'id'
})

const Kategorija = bookshelf.Model.extend({
    tableName: 'kategorija',
    idAttribute: 'id'
})



router.get('/aktivnost', async(req, res, next) => {
    try {
        console.log(Aktivnost);
        let aktivnost = await Aktivnost.fetchAll();
        res.json(aktivnost.toJSON());
    } catch (error) {
        console.log(error);
    }
})

router.get('/dodajAktivnost', async (req, res, next) => {
    try {
        let nova = {
            naziv: req.query.naziv,
            opis: req.query.opis,
            TK_id_uporabnik: 1
        };
        console.log(nova);

        let aktivnost = await Aktivnost.forge(nova).save();
        res.json(aktivnost.toJSON());

    } catch (error) {
        console.log(error);
        res.status(500).json(error);
    }
});




router.get('/skupinska_aktivnost', async(req, res, next) => {
    try {
        console.log(Skupinska_aktivnost);
        let skupinska_aktivnost = await Skupinska_aktivnost.fetchAll();
        res.json(skupinska_aktivnost.toJSON());
    } catch (error) {
        console.log(error);
    }
})

router.get('/skupina',async(req,res,next) =>{
try{
    const id=req.query.id;
    console.log(id);
    Skupinska_aktivnost.where("id",id).fetch().then(function (skus){
        if (skus) console.log(skus.toJSON());
        res.json(skus.toJSON())
    }).catch(function(err){
        console.error(err);
        res.status(500).json(err)
    });
}catch(erorr){
    console.log(erorr)
    res.status(500).json.erorr;
}
});
router.get('/ena_skupina/:id',async(req,res,next) => {
    try{
        const id= req.params.id;
        let skupina= await new Skupinska_aktivnost().where('id',id).fetch();
        res.json(skupina.toJSON());
    }catch(erorr){
       res.status(500).json(erorr)
    }
}) 
router.get('/koledar',async(req,res,next) => {
    try{
        let podatki=await new Skupinska_aktivnost().fetchAll();
        res.json(podatki.toJSON());
    }catch(erorr){
       res.status(500).json(erorr)
    }
}) 
router.post('/koledar',async(req,res,next) => {
    try{
        let podatki=await new Skupinska_aktivnost().fetchAll();
        res.json(podatki.toJSON());
    }catch(erorr){
       res.status(500).json(erorr)
    }
})

module.exports = router;
