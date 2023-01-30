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

const Aktivnost = bookshelf.Model.extend({
    tableName: 'aktivnost',
    idAttribute: 'id'
})

const Uporabnik = bookshelf.Model.extend({
    tableName: 'uporabnik',
    idAttribute: 'id'
})

// ========AKTIVNOST==========

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

// ========DRUGO==========

router.get('/', function (req, res) {
    res.send("Moja spletna aplikacija");
});

module.exports = router;
//app.listen(3000);