async function mojeAktivnosti() {
    if (sessionStorage.getItem('prijavljen') != null) {
        let prijavljen = JSON.parse(sessionStorage.getItem('prijavljen'));
        nalozi();

        let kategorije;
        let ocene;
        await fetch('http://localhost:3000/kategorija/kategorija', { method: 'GET' })
            .then((odgovor) => { return odgovor.json(); })
            .then((odgovor) => {
                kategorije = odgovor;

            });
        await fetch(`http://localhost:3000/ocena/ocenaUporabnik?id=${prijavljen.id}`, { method: 'GET' })
            .then((odgovor) => { return odgovor.json(); })
            .then((odgovor) => {
                ocene = odgovor;

            });
        await fetch(`http://localhost:3000/aktivnost/aktiduporabnik?id=${prijavljen.id}`, { method: 'GET' })
            .then((odgovor) => { return odgovor.json(); })
            .then((aktivnosti) => {
                let doc = document.getElementById('aktivnosti');
                let kat;
                console.log(kategorije);
                console.log(aktivnosti);
                for (let i = 0; i < aktivnosti.length; i++) {
                    let ocena = 0;
                    for (let j = 0; j < kategorije.length; j++) {
                        if (kategorije[j].id == aktivnosti[i].TK_id_kategorija) {
                            kat = kategorije[j].naziv;
                        }

                    }
                    let counter = 0;
                    for (let l = 0; l < ocene.length; l++) {
                        if (ocene[l].TK_id_aktivnost == aktivnosti[i].id) {
                            counter++;
                            ocena += ocene[l].ocena;
                        }
                        
                    }
                    let povpr = Math.round((ocena / counter) * 10) / 10;

                    if (aktivnosti[i].fotografija != null) {
                        doc.innerHTML += '<div> <h2>Naziv: </h2> <h3>' + aktivnosti[i].naziv +
                        '</h3> <img style="width: 100%" src="data:image/jpg;base64,' + aktivnosti[i].fotografija + '"> <h2>Opis: </h2> <p>' +
                        aktivnosti[i].opis + '</p> <h2>Kategorija: </h2> <p>' + kat + '</p> <h2>Povprečna ocena: </h2> <p>' + povpr +
                        '</p> <button class="btn" style="background-color: rgb(236, 54, 54)" onclick="izbrisiAktivnost(' + aktivnosti[i].id + ')">Izbriši</button><hr style="border-color: black;">';

                    } else {
                        doc.innerHTML += '<div> <h2>Naziv: </h2> <h3>' + aktivnosti[i].naziv +
                        '</h3> <h2>Opis: </h2> <p>' +
                        aktivnosti[i].opis + '</p> <h2>Kategorija: </h2> <p>' + kat + '</p> <h2>Povprečna ocena: </h2> <p>' + povpr +
                        '</p> <button class="btn" style="background-color: rgb(236, 54, 54)" onclick="izbrisiAktivnost(' + aktivnosti[i].id + ')">Izbriši</button><hr style="border-color: black;">';

                    }
                    
                }


            });
    }
}

function izbrisiAktivnost(id) {
    fetch(`http://localhost:3000/aktivnost/izbrisiAktivnost/${id}`, { method: 'DELETE' })
        .then((odgovor) => { return odgovor.json(); })
        .then((odgovor) => {
            console.log(odgovor);
            location.reload(true);
        });
    location.reload(true);
}