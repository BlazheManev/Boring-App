const datumiArray = [];
const naziviArray = [];
const mestaArray = [];
function naloziDatume() {
  fetch('http://localhost:3000/koledar/koledar', { method: 'GET' })

    .then((odgovor) => { return odgovor.json(); })
    .then((skupina) => {


      for (let i = 0; i < skupina.length; i++) {
        for (const skupinah in skupina[i]) {
          if (skupinah === 'datum') {
            let dates = skupina[i][skupinah];
            datumiArray.push(dates);
          } else
            if (skupinah === 'naziv') {
              let nazivi = skupina[i][skupinah];
              naziviArray.push(nazivi);
            } else if (skupinah === 'kraj') {
              let mesta = skupina[i][skupinah];
              mestaArray.push(mesta);
            }


            
        }
      }
      const arrayLength = mestaArray.length;
      console.log(arrayLength)
      for (i = 0; i < arrayLength; i++) {
        if (proverka[i] !== idArray) {

          naziv = (naziviArray[i]);
          mesto = (mestaArray[i]);
          datumi = (datumiArray[i]);

          console.log(naziv);
          console.log(mesto);
          console.log(datumi);
          const eventStartTime = new Date()
          eventStartTime.setDate(eventStartTime.getDay() + 2)

          const eventEndTime = new Date();
          eventEndTime.setDate(eventEndTime.getDay() + 1);
          eventEndTime.setMinutes(eventEndTime.getMinutes() + 45);

          const event = {
            summary: naziv,
            location: mesto,
            description: naziv,
            colorId: 1,
            start: {
              date: datumi,
              timeZone: 'Europe/Ljubljana',
            },
            end: {
              date: datumi,
              timeZone: 'Europe/Ljubljana',
            },
          }

          // Check if we a busy and have an event on our calendar for the same time.
          calendar.freebusy.query(
            {
              resource: {
                timeMin: eventStartTime,
                timeMax: eventEndTime,
                timeZone: 'America/Denver',
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
                    return console.log('Calendar event successfully created.')
                  }
                )

              // If event array is not empty log that we are busy.
              return console.log(`Sorry I'm busy...`)
            }
          )
          proverka.push(idArray[i]);
        }
      }
    });

};



