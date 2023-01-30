var express = require('express');
var app = express();
var router = express.Router();
const { google } = require('googleapis');


app.use(express.json({ limit: '1mb' }));

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

const skupinskeAktivnosti = bookshelf.Model.extend({
    tableName: 'skupinska_aktivnost',
    idAttribute: 'id'
})

router.get('/skupinska_aktivnost', async (req, res, next) => {
    try {
        let skupinskaAktivnost = await skupinskeAktivnosti.fetchAll();
        res.json(skupinskaAktivnost.toJSON());
    } catch (error) {
        console.log(error);
    }
})

router.post('/dodajSkupinskeAktivnosti', async (req, res, next) => {
    console.log(req);
    try {
        let novaAktivnost = {
            naziv: req.body.naziv,
            kraj: req.body.kraj,
            datum: req.body.datum,
            max_kolicina: req.body.max_kolicina,
            TK_id_kategorija: req.body.TK_id_kategorija
        };

        console.log(novaAktivnost);
        //add to calendar

        const { OAuth2 } = google.auth;



        const oAuth2Client = new OAuth2('968831299947-pa8gfiqlfadi30a0lb9dpi343ha2av43.apps.googleusercontent.com');

        oAuth2Client.setCredentials({
            refresh_token: '1//04aR00TKJnHvlCgYIARAAGAQSNwF-L9IrcYXkaRm03nBFhg1LBgJehp3sQNQrB9ffwz7DP5wEWv0vWwHOtTRi38OUYyUw-EfzG98'
        });

        oAuth2Client.setCredentials({
            refresh_token: '1//04aR00TKJnHvlCgYIARAAGAQSNwF-L9IrcYXkaRm03nBFhg1LBgJehp3sQNQrB9ffwz7DP5wEWv0vWwHOtTRi38OUYyUw-EfzG98',
        });
        const eventStartTime = new Date()
        eventStartTime.setDate(eventStartTime.getDay() + 2)
        const calendar = google.calendar({ version: 'v3', auth: oAuth2Client })

        const eventEndTime = new Date();
        eventEndTime.setDate(eventEndTime.getDay() + 4);
        eventEndTime.setMinutes(eventEndTime.getMinutes() + 45);
        
        const calendar = google.calendar({ version: 'v3', auth: oAuth2Client })
        const event = {
            summary: novaAktivnost.naziv,
            location: novaAktivnost.kraj,
            description: novaAktivnost.naziv,
            colorId: 1,
            start: {
                date: novaAktivnost.datum,
                timeZone: 'Europe/Ljubljana',
            },
            end: {
                date: novaAktivnost.datum,
                timeZone: 'Europe/Ljubljana',
            },
        }
        calendar.freebusy.query(
            {
                resource: {
                    timeMin: eventStartTime,
                    timeMax: eventEndTime,
                    timeZone: 'Europe/Ljubljana',
                    items: [{ id: 'primary' }],
                },
            },
            (err, res) => {
                // Check for errors in our query and log them if they exist.
                if (err) return console.error('Free Busy Query Error: ', err)

                // Create an array of all events on our calendar during that time.
                const eventArr = res.data.calendars.primary.busy

                // Check if event array is empty which means we are not busy
                if (eventArr.length === 0)
                    // If we are not busy create a new calendar event.
                    return calendar.events.insert(
                        { calendarId: 'primary', resource: event },
                        err => {
                            // Check for errors and log them if they exist.
                            if (err) return console.error('Error Creating Calender Event:', err)
                            // Else log that the event was created.
                            return console.log('Calendar event successfully created.'+event)
                        }
                    )

                // If event array is not empty log that we are busy.
                return console.log(`Sorry I'm busy...`)
            }
        );
        let skupinskoAktivnost = await new skupinskeAktivnosti().save(novaAktivnost);


        res.json(skupinskoAktivnost.toJSON());

    } catch (error) {
        console.log(error);
        res.status(500).json(error);
    }
});

router.delete('/brisiSkupinskeAktivnosti/:id', async (req, res, next) => {
    try {
        console.log(req.params);
        let { id } = req.params;
        const result = await new skupinskeAktivnosti({ id: id }).destroy();
        console.log("Skupinska aktivnost odstranjena!");
        res.json(result);
    } catch (error) {
        console.log(error);
        res.status(500).json(error);
    }
});

router.get('/', function (req, res) {
    res.send("Moja prva spletna aplikacija");
});


module.exports = router;
