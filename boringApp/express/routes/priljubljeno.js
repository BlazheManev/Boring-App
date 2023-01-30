var express = require('express');
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

const Priljubljeno = bookshelf.Model.extend({
    tableName: 'priljubljeno',
    idAttribute: 'id'
})

//==============DODAJANJE PRILJUBLJENEGA=================
router.get('/dodajPriljubljeno', async (req, res, next) => {
    try {
        let novo = {
            TK_id_uporabnik: req.query.TK_id_uporabnik,
            TK_id_aktivnost: req.query.TK_id_aktivnost
        };
        console.log(novo);

        let priljubljeno = await Priljubljeno.forge(novo).save();
        res.json(priljubljeno.toJSON());

    } catch (error) {
        console.log(error);
        res.status(500).json(error);
    }
});


//====================IZBRIS PRILJUBLJENO=================
router.delete('/priljubljeno/:id', async(req, res) => {
    try {
        const {id} = req.params;
        let priljubljeno = await Priljubljeno.where({id: id}).destroy();
        res.json({status: "deleted"});
        
    } catch (error) {
        console.log(error);
    }
})

//=================PRIDOBI PRILJUBLJENO PO TK_id_aktivnost================
router.get('/priljubljenoAktivnost', async(req, res, next) => {
    try {
        let id = req.query.id;
        let priljubljeno = await Priljubljeno.where({TK_id_aktivnost: id}).fetchAll();
        res.json(priljubljeno.toJSON());    

    } catch (error) {
        console.log(error);
    }
})

//=================PRIDOBI OCENO PO TK_id_uporabnik================
router.get('/priljubljenoUporabnik', async(req, res, next) => {
    try {
        let id = req.query.id;
        let priljubljeno = await Priljubljeno.where({TK_id_uporabnik: id}).fetchAll();
        res.json(priljubljeno.toJSON());    

    } catch (error) {
        console.log(error);
    }
})

module.exports = router;
//app.listen(3000);