var express = require('express');
var logger = require('morgan');
const cors = require('cors');
const fileUpload = require('express-fileupload');

var routeAktivnost = require('./routes/aktivnost');
var routeIndex = require('./routes/index');
var routeOcena = require('./routes/ocena');
var routePriljubljeno = require('./routes/priljubljeno');
var routeUporabnik = require('./routes/uporabnik');
var routeKategorija = require('./routes/kategorija');
var routeZelja = require('./routes/zelja');
var routePripAktivnost = require('./routes/priporocena_aktivnost');
var routeKoledar = require('./routes/koledar');

var routeskupinskeAktivnosti = require('./routes/skupinskeAktivnosti');

var app = express();

app.use(cors());
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(fileUpload());
app.use('/aktivnost/', routeAktivnost);
app.use('/index/', routeIndex);
app.use('/ocena/', routeOcena);
app.use('/priljubljeno/', routePriljubljeno);
app.use('/uporabnik/', routeUporabnik);
app.use('/kategorija/', routeKategorija);
app.use('/zelja/', routeZelja);
app.use('/priporocena_aktivnost/', routePripAktivnost);
app.use('/skupinskeAktivnosti/', routeskupinskeAktivnosti);
app.use('/koledar/', routeKoledar);

app.use(express.json({limit:'1mb'}));

module.exports = app;

