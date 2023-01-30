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

const Ocena = bookshelf.Model.extend({
    tableName: 'ocena',
    idAttribute: 'id'
})

//==============DODAJANJE OCENE=================
router.get('/dodajOceno', async (req, res, next) => {
    try {
        let nova = {
            ocena: req.query.ocena,
            TK_id_uporabnik: req.query.TK_id_uporabnik,
            TK_id_aktivnost: req.query.TK_id_aktivnost
        };
        console.log(nova);

        let ocena = await Ocena.forge(nova).save();
        res.json(ocena.toJSON());

    } catch (error) {
        console.log(error);
        res.status(500).json(error);
    }
});


//====================IZBRIS OCENE=================
router.delete('/ocena/:id', async(req, res) => {
    try {
        const {id} = req.params;
        let ocene = await Ocena.where({id: id}).destroy();
        res.json({status: "deleted"});
        
    } catch (error) {
        console.log(error);
    }
})

//=================PRIDOBI OCENO PO TK_id_aktivnost================
router.get('/ocenaAktivnost', async(req, res, next) => {
    try {
        let id = req.query.id;
        let ocene = await Ocena.where({TK_id_aktivnost: id}).fetchAll();
        res.json(ocene.toJSON());    

    } catch (error) {
        console.log(error);
    }
})

//=================PRIDOBI OCENO PO TK_id_uporabnik================
router.get('/ocenaUporabnik', async(req, res, next) => {
    try {
        let id = req.query.id;
        let ocene = await Ocena.where({TK_id_uporabnik: id}).fetchAll();
        res.json(ocene.toJSON());    

    } catch (error) {
        console.log(error);
    }
})

module.exports = router;
//app.listen(3000);