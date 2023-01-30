
//Vprasalnik
async function vprasalnikZelja(){
    event.preventDefault();
    let podatki = {
        zunaj: document.vprasalnik.inputZunaj.value,
        dolgotrajno: document.vprasalnik.inputDolgotrajno.value,
        TK_id_kategorija: document.vprasalnik.inputKategorija.value
    }
    console.log(JSON.stringify(podatki));
    fetch('http://localhost:3000/zelja/dodaj', {
        method: 'POST',
        body: JSON.stringify(podatki),
        headers: {
            'Content-Type': 'application/json'
        }
    }).then((response) => {
        return response.json();
    }).then((JSONresponse) => {
        if (JSONresponse.status == "dodano") {
                console.log("Zelja je dodana");
        } 
    });
}

//
const pridobiPriporocila = () => {
    event.preventDefault();
    let zunajZelja = document.vprasalnik.inputZunaj.value;
    let dolgotrajnoZelja = document.vprasalnik.inputDolgotrajno.value;
    let TK_id_kategorijaZelja = document.vprasalnik.IDkategorije.value;
    fetch('http://localhost:3000/priporocena_aktivnost', {
        method: 'GET',
    }).then((response) => {
        return response.json();
    }).then((seznamPriporocil) => {
        const tabela = document.getElementById("pripAktivnosti");

        for(let indeks = 0; indeks < seznamPriporocil.length; indeks++){
            if (seznamPriporocil[indeks].zunaj == zunajZelja && seznamPriporocil[indeks].dolgotrajno == dolgotrajnoZelja && seznamPriporocil[indeks].TK_id_kategorija == TK_id_kategorijaZelja){
                let row = tabela.insertRow();
                /*for (const atribut in seznamPriporocil[indeks]) {
                    let izpis = row.insertCell();
                    izpis.innerHTML = seznamPriporocil[indeks][atribut];
                }*/
                row.insertCell().innerHTML = seznamPriporocil[indeks].id;
                row.insertCell().innerHTML = seznamPriporocil[indeks].naziv;
            }
        }
    })
}



//izpis kategorij
const getKategorije = () => {
    nalozi();
    fetch('http://localhost:3000/kategorija/', {
        method: 'GET'
    }).then((response) => {
        return response.json();
    }).then((seznamKategorij) => {
        const tabela = document.getElementById("kategorije");

        for(let indeks = 0; indeks < seznamKategorij.length; indeks++){
            let row = tabela.insertRow();
            for (const atribut in seznamKategorij[indeks]) {
                let izpis = row.insertCell();
                izpis.innerHTML = seznamKategorij[indeks][atribut];
            }
            let izberi = row.insertCell();
            izberi.innerHTML += "<input type='radio' value='" + seznamKategorij[indeks].id + "' name='IDkategorije'>";

        }
    });
}

const getKategorijeDodaj = () => {
    nalozi();
    event.preventDefault();
    fetch('http://localhost:3000/kategorija/', {
        method: 'GET'
    }).then((response) => {
        return response.json();
    }).then((seznamKategorij) => {
        const tabela = document.getElementById("kategorije");

        for(let indeks = 0; indeks < seznamKategorij.length; indeks++){
            let row = tabela.insertRow();
            for (const atribut in seznamKategorij[indeks]) {
                let izpis = row.insertCell();
                izpis.innerHTML = seznamKategorij[indeks][atribut];
            }

            let prijavljen = JSON.parse(sessionStorage.getItem('prijavljen'));
            if(prijavljen.je_admin == "1"){
                let izbrisi = row.insertCell();
                izbrisi.innerHTML = "<button onclick='izbrisiKategorijo(" + seznamKategorij[indeks]["id"] + ")' class='btn btn-secondary'>Odstrani kategorijo</button>";
                document.getElementById("vprasalnikK").hidden = false;
            } else if (prijavljen.je_admin != "1") {
                document.getElementById("dostop").hidden = false;
            };

            console.log(seznamKategorij.length);
        }
    });
}

async function izbrisiKategorijo(indeks) {
    fetch('http://localhost:3000/kategorija/' + indeks, {
            method: 'DELETE' 
    }).then((response) => { 
            return response.json();
    }).then((response) => {
            console.log(response);
            location.reload();
    });
}

async function dodajKategorijo() {
    let kategorija = {
        naziv: document.vprasalnikK.textKategorija.value
    }
    console.log(JSON.stringify(kategorija));
    fetch('http://localhost:3000/kategorija/dodaj', {
        method: 'POST',
        body: JSON.stringify(kategorija),
        headers: {
            'Content-Type': 'application/json'
        }
    }).then((response) => {
        return response.json();
    }).then((JSONresponse) => {
        if (JSONresponse.status == "dodano") {
                console.log("Kategorija je dodana");
        } 
    });
};