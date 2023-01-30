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

const Kategorija = bookshelf.Model.extend({
    tableName: 'kategorija',
    idAttribute: 'id'
})


//=================PRIDOBI VSE KATEGORIJE================
router.get('/kategorija', async(req, res, next) => {
    try {
        let kategorije = await Kategorija.fetchAll();
        res.json(kategorije.toJSON());
    } catch (error) {
        console.log(error);
    }
})

router.get('/', async(req, res) => {
    try {
        const kategorija = await new Kategorija().fetchAll();
        res.json(kategorija.toJSON());
    } catch (error) {
        console.log(error);
        res.status(500).json({error});
    }
});

router.post('/dodaj', async(req, res) => {
    try {
        var novo = {
            naziv: req.body.naziv
        }
        var kategorija = await Kategorija.forge(novo).save();
        res.json({status: "dodano", kategorija: kategorija});
    } catch (error) {
        console.log(error);
        res.status(500).json({error});
    }
});

router.delete('/:id', async(req, res) => {
    try {
        const {id} = req.params;
        let kategorija = await Kategorija.where({id: id}).destroy();
        res.json({status: "deleted"});
        
    } catch (error) {
        console.log(error);
        res.status(500).json({error});
    }
});

//app.listen(3000);
module.exports = router;
