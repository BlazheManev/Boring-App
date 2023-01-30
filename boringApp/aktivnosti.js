async function naloziAktivnosti() {
    nalozi();
    if (sessionStorage.getItem('prijavljen') != null) {
    }

    let kategorije;
    let prijavljen;
    await fetch('http://localhost:3000/kategorija/kategorija', { method: 'GET' })
        .then((odgovor) => { return odgovor.json(); })
        .then((odgovor) => {
            kategorije = odgovor;

        });
    await fetch('http://localhost:3000/aktivnost/aktivnost', { method: 'GET' })
        .then((odgovor) => { return odgovor.json(); })
        .then((aktivnosti) => {
            let doc = document.getElementById('aktivnosti');
            let kat;
            console.log(kategorije);
            if (sessionStorage.getItem('prijavljen') != null) {
                prijavljen = JSON.parse(sessionStorage.getItem('prijavljen'));
            } else {
                prijavljen = -1;
            }
            for (let i = 0; i < aktivnosti.length; i++) {
                for (let j = 0; j < kategorije.length; j++) {
                    console.log(kategorije[j]);
                    if (kategorije[j].id == aktivnosti[i].TK_id_kategorija) {
                        kat = kategorije[j].naziv;
                    }

                }

                if (aktivnosti[i].fotografija != null) {
                    doc.innerHTML += '<div> <h2>Naziv: </h2> <h3>' + aktivnosti[i].naziv +
                        '</h3> <img style="width: 100%" src="data:image/jpg;base64,' + aktivnosti[i].fotografija + '"> <h2>Opis: </h2> <p>' +
                        aktivnosti[i].opis + '</p> <h2>Kategorija: </h2> <p>' + kat +
                        '</p> <button class="btn" onclick="priljubljeno(' + aktivnosti[i].id + ', ' + prijavljen.id + ')">Dodaj med priljubljeno</button>' +
                        ' <button class="btn" onclick="ocenjevanje(' + aktivnosti[i].id + ')">Oceni aktivnost</button> ' +
                        ' <button class="btn" onclick="kontaktiraj(' + aktivnosti[i].TK_id_uporabnik + ')">Kontaktiraj uporabnika</button> </div> <hr style="border-color: black;">'

                } else {
                    doc.innerHTML += '<div> <h2>Naziv: </h2> <h3>' + aktivnosti[i].naziv +
                        '</h3> <h2>Opis: </h2> <p>' +
                        aktivnosti[i].opis + '</p> <h2>Kategorija: </h2> <p>' + kat +
                        '</p> <button class="btn" onclick="priljubljeno(' + aktivnosti[i].id + ', ' + prijavljen.id + ')">Dodaj med priljubljeno</button>' +
                        ' <button class="btn" onclick="ocenjevanje(' + aktivnosti[i].id + ')">Oceni aktivnost</button> ' +
                        ' <button class="btn" onclick="kontaktiraj(' + aktivnosti[i].TK_id_uporabnik + ')">Kontaktiraj uporabnika</button> </div> <hr style="border-color: black;">'
                }
            }


        });
}

function ocenjevanje(id) {
    if (sessionStorage.getItem('prijavljen') != null) {
        sessionStorage.setItem('oceni', id);
        window.location.href = 'oceni.html';
    } else {
        window.location.href = 'login.html';
    }
}

async function kontaktiraj(id) {
    await fetch(`http://localhost:3000/uporabnik/${id}`, { method: 'GET' })
        .then((odgovor) => { return odgovor.json(); })
        .then((odgovor) => {
            uporabnik = odgovor;
            window.open('mailto:' + uporabnik.email);
        });
}