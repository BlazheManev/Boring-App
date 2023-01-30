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
//const fileUpload = require('express-fileupload');
//app.use(fileUpload());

const Aktivnost = bookshelf.Model.extend({
    tableName: 'aktivnost',
    idAttribute: 'id'
})


//=================PRIDOBI VSE AKTIVNOSTI================
router.get('/aktivnost', async(req, res, next) => {
    try {
        let aktivnost = await Aktivnost.fetchAll();
        let aktivnosti = aktivnost.toJSON();
        for (let i = 0; i < aktivnosti.length; i++) {
            if (aktivnosti[i].fotografija != null) {
                aktivnosti[i].fotografija = Buffer.from(aktivnosti[i].fotografija, 'base64').toString('base64');
            }
        }
        res.json(aktivnosti);
    } catch (error) {
        console.log(error);
    }
})

//=================PRIDOBI AKTIVNOST PO ID================
router.get('/aktivnostid', async(req, res, next) => {
    try {
        let id = req.query.id;
        let aktivnost = await Aktivnost.where({id: id}).fetch();
        let aktivnosti = aktivnost.toJSON();
        for (let i = 0; i < aktivnosti.length; i++) {
            if (aktivnosti[i].fotografija != null) {
                aktivnosti[i].fotografija = Buffer.from(aktivnosti[i].fotografija, 'base64').toString('base64');
            }
        }
        res.json(aktivnosti);
    } catch (error) {
        console.log(error);
    }
})

//=================PRIDOBI AKTIVNOSTI PO TK_id_uporabnik================
router.get('/aktiduporabnik', async(req, res, next) => {
    try {
        let id = req.query.id;
        let aktivnost = await Aktivnost.where({TK_id_uporabnik: id}).fetchAll();
        let aktivnosti = aktivnost.toJSON();
        for (let i = 0; i < aktivnosti.length; i++) {
            if (aktivnosti[i].fotografija != null) {
                aktivnosti[i].fotografija = Buffer.from(aktivnosti[i].fotografija, 'base64').toString('base64');
            }
        }
        res.json(aktivnosti);  

    } catch (error) {
        console.log(error);
    }
})

//=================PRIDOBI AKTIVNOSTI PO TK_id_kategorija================
router.get('/aktidkategorija', async(req, res, next) => {
    try {
        let id = req.query.id;
        let aktivnost = await Aktivnost.where({TK_id_kategorija: id}).fetchAll();
        let aktivnosti = aktivnost.toJSON();
        for (let i = 0; i < aktivnosti.length; i++) {
            if (aktivnosti[i].fotografija != null) {
                aktivnosti[i].fotografija = Buffer.from(aktivnosti[i].fotografija, 'base64').toString('base64');
            }
        }
        res.json(aktivnosti);   

    } catch (error) {
        console.log(error);
    }
})

//==========================PRIDOBI VSE AKTIVNOSTI Z ENAKIM NAZIVOM==========================
router.get('/aktivnostnaziv', async(req, res, next) => {
    try {
        let naziv = req.query.naziv;
        let aktivnost = await Aktivnost.where({naziv: naziv}).fetchAll();
        let aktivnosti = aktivnost.toJSON();
        for (let i = 0; i < aktivnosti.length; i++) {
            if (aktivnosti[i].fotografija != null) {
                aktivnosti[i].fotografija = Buffer.from(aktivnosti[i].fotografija, 'base64').toString('base64');
            }
        }
        res.json(aktivnosti);  

    } catch (error) {
        console.log(error);
    }
})

//==============DODAJANJE AKTIVNOSTI=================
router.post('/dodajAktivnost', async (req, res, next) => {
    try {
        console.log(req.body)
        console.log(req.files)
        let datoteka;
        if (req.files != null) {
            datoteka = Buffer.from(req.files.slika.data);
        } else {
            datoteka = null;
        }
        let nova = {
            naziv: req.body.naziv,
            opis: req.body.opis,
            fotografija: datoteka,
            TK_id_kategorija: req.body.TK_id_kategorija,
            TK_id_uporabnik: req.body.TK_id_uporabnik
        };

        let aktivnost = await Aktivnost.forge(nova).save();
        res.status(201);

    } catch (error) {
        console.log(error);
        res.status(500).json(error);
    }
});

//=================IZBRIŠI AKTIVNOST================
router.delete('/izbrisiAktivnost/:id', async(req, res, next) => {
    try {
        let id = req.params.id;
        console.log(id);
        await Aktivnost.where({id: id}).destroy();
        console.log('Aktivnost izbrisana uspešno');
        res.status(200)
    } catch (error) {
        console.log(error);
    }
})

module.exports = router;
//app.listen(3000);