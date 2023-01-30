var express = require('express');
//const app = require('../app');
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

const Zelja = bookshelf.Model.extend({
    tableName: 'zelja',
    idAttribute: 'id'
})

router.get('/', async(req, res) => {
    try {
        const zelja = await new Zelja().fetchAll();
        res.json(zelja.toJSON());
    } catch (error) {
        console.log(error);
        res.status(500).json({error});
    }
});

router.post('/dodaj', async(req, res) => {
    try {
        var novo = {
            zunaj: req.body.zunaj,
            dolgotrajno: req.body.dolgotrajno,
            TK_id_kategorija: req.body.TK_id_kategorija
        }
        var zelja = await Zelja.forge(novo).save();
        res.json({status: "dodano", zelja: zelja});
    } catch (error) {
        console.log(error);
        res.status(500).json({error});
    }
});
//app.listen(3000);
module.exports = router;