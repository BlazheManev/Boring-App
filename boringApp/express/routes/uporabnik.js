var express = require('express');
var router = express.Router();

const bcrypt = require('bcryptjs');

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

const Uporabnik = bookshelf.Model.extend({
    tableName: 'uporabnik',
    idAttribute: 'id'
})

//===========REGISTRACIJA============
router.post('/registriraj', async(req, res, next) => {
    try {
        let nov = {
            ime: req.body.ime,
            priimek: req.body.priimek,
            email: req.body.email,
            je_admin: 0,
            uporabniskoIme: req.body.uporabniskoIme,
            geslo: req.body.geslo,
            starost: req.body.starost
        }

        nov.geslo = bcrypt.hashSync(nov.geslo, 12);

        let uporabnik = await Uporabnik.forge(nov).save();
        console.log('Uporabnik uspešno registriran')
        res.json({status: 'OK', uporabnik: uporabnik.toJSON()});
    } catch (error) {
        console.log(error);
    }
})

//==========PRIDOBI VSE UPORABNIKE===================
router.get('/uporabniki', async(req, res, next) => {
    try {
        let uporabniki = await new Uporabnik().fetchAll();
        res.json(uporabniki.toJSON());
    } catch (error) {
        console.log(error);
    }
})

//==========PRIJAVA============
router.post('/prijavi', async(req, res, next) => {
    try {
        console.log(req.body);
        let ui = req.body.uporabniskoIme;
        let geslo = req.body.geslo;
        let uporabnik = await Uporabnik.where({uporabniskoIme: ui}).fetch();
        let pravilnoGeslo = bcrypt.compareSync(geslo, uporabnik.toJSON().geslo);

        if (pravilnoGeslo) {
            console.log("uporabnik prijavljen");
            res.json({status: 'OK', uporabnik: uporabnik.toJSON()});
        }else {
            res.json({status: 'Napačno geslo!'})
        }
        
    } catch (error) {
        console.log(error);
    }
})

//====================IZBRIS UPORABNIKA=================
router.delete('/uporabnik/:id', async(req, res) => {
    try {
        const {id} = req.params;
        await new Uporabnik({id: id}).destroy();
        res.json({status: "deleted"});
        
    } catch (error) {
        console.log(error);
    }
})

//===================PRIDOBI UPORABNIKA PO ID=====================
router.get('/:id', async(req, res, next) => {
    try {
        const {id} = req.params;
        let uporabnik = await Uporabnik.where({id: id}).fetch();
        res.json(uporabnik.toJSON());
    } catch (error) {
        console.log(error);
    }
})

module.exports = router;
//app.listen(3000);