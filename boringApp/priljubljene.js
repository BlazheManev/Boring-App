async function priljubljeno(id_aktivnost, id_uporabnik) {
    let aktivnost = id_aktivnost;
    let uporabnik = id_uporabnik;
    if (sessionStorage.getItem('prijavljen') != null) {
        await fetch(`http://localhost:3000/priljubljeno/dodajPriljubljeno?TK_id_uporabnik=${uporabnik}&TK_id_aktivnost=${aktivnost}`, { method: 'GET' })
            .then((odgovor) => { return odgovor.json(); })
            .then((nekaj) => {
                console.log(nekaj);
            });
    } else {
        window.location.href = 'login.html';
    }
};

async function priljubljeneAktivnosti() {
    if (sessionStorage.getItem('prijavljen') != null) {
        let prijavljen = JSON.parse(sessionStorage.getItem('prijavljen'));
        nalozi();

        let kategorije;
        let priljubljene;
        await fetch('http://localhost:3000/kategorija/kategorija', { method: 'GET' })
            .then((odgovor) => { return odgovor.json(); })
            .then((odgovor) => {
                kategorije = odgovor;

            });
        await fetch(`http://localhost:3000/priljubljeno/priljubljenoUporabnik?id=${prijavljen.id}`, { method: 'GET' })
            .then((odgovor) => { return odgovor.json(); })
            .then((odgovor) => {
                priljubljene = odgovor;

            });
        await fetch(`http://localhost:3000/aktivnost/aktivnost`, { method: 'GET' })
            .then((odgovor) => { return odgovor.json(); })
            .then((aktivnosti) => {
                let doc = document.getElementById('aktivnosti');
                let kat;
                console.log(priljubljene);
                console.log(aktivnosti);
                for (let k = 0; k < priljubljene.length; k++) {
                    for (let i = 0; i < aktivnosti.length; i++) {
                        if (priljubljene[k].TK_id_aktivnost == aktivnosti[i].id) {
                            for (let j = 0; j < kategorije.length; j++) {
                                if (kategorije[j].id == aktivnosti[i].TK_id_kategorija) {
                                    kat = kategorije[j].naziv;
                                }

                            }

                            if (aktivnosti[i].fotografija != null) {
                                doc.innerHTML += '<div> <h2>Naziv: </h2> <h3>' + aktivnosti[i].naziv +
                                '</h3> <img style="width: 100%" src="data:image/jpg;base64,' + aktivnosti[i].fotografija + '"> <h2>Opis: </h2> <p>' +
                                aktivnosti[i].opis + '</p> <h2>Kategorija: </h2> <p>' + kat +
                                '</p> <button class="btn" style="background-color: rgb(236, 54, 54)" onclick="izbrisiPriljubljeno(' + priljubljene[k].id + ')">Izbriši</button><hr style="border-color: black;">';

                            } else {
                                doc.innerHTML += '<div> <h2>Naziv: </h2> <h3>' + aktivnosti[i].naziv +
                                '</h3> <h2>Opis: </h2> <p>' +
                                aktivnosti[i].opis + '</p> <h2>Kategorija: </h2> <p>' + kat +
                                '</p> <button class="btn" style="background-color: rgb(236, 54, 54)" onclick="izbrisiPriljubljeno(' + priljubljene[k].id + ')">Izbriši</button><hr style="border-color: black;">';

                            }
                        
                        }
                    }
                }


            });
    }
}

function izbrisiPriljubljeno(id) {
    fetch(`http://localhost:3000/priljubljeno/priljubljeno/${id}`, { method: 'DELETE' })
        .then((odgovor) => { return odgovor.json(); })
        .then((odgovor) => {
            console.log(odgovor);
            location.reload(true);
        });
    location.reload(true);
}