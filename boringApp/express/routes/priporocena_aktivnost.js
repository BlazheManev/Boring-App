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

const pAktivnost = bookshelf.Model.extend({
    tableName: 'prip_aktivnost',
    idAttribute: 'id'
});

router.get('/', async(req, res) => {
    try {
        const paktivnost = await new pAktivnost().fetchAll();
        res.json(paktivnost.toJSON());
    } catch (error) {
        console.log(error);
        res.status(500).json({error});
    }
});



/*router.get('/:id', async(req, res) => {
    try {
        const paktivnost = await new pAktivnost().fetchAll();
        res.json(paktivnost.toJSON());
    } catch (error) {
        console.log(error);
        res.status(500).json({error});
    }
});*/

router.post('/dodaj', async(req, res) => {
    try {
        var novo = {
            naziv: req.body.naziv,
            zunaj: req.body.zunaj,
            dolgotrajno: req.body.dolgotrajno,
            TK_id_kategorija: req.body.TK_id_kategorija
        }
        var paktivnost = await pAktivnost.forge(novo).save();
        res.json({status: "dodano", paktivnost: paktivnost});
    } catch (error) {
        console.log(error);
        res.status(500).json({error});
    }
});

//app.listen(3000);
module.exports = router;