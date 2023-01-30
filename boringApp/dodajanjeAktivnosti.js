//=====================FUNKCIJA KI SE IZVEDE ON LOAD IN NASTAVI ID UPORABNIKA V VALUE===========================
function naloziUporabnika() {
    nalozi();
    if (sessionStorage.getItem('prijavljen') != null) {
        var prijavljen = JSON.parse(sessionStorage.getItem('prijavljen'));
        let id = prijavljen.id;
        document.getElementById("TK_id_uporabnik").value = id;
        naloziKategorije();
    } else {
        window.location.href = 'login.html';
    }
}

function naloziKategorije() {
    fetch('http://localhost:3000/kategorija/kategorija', {
        method: 'GET', // *GET, POST, PUT, DELETE, etc.
    })
        .then((odgovor) => { return odgovor.json(); })
        .then((kategorije) => {
            let dokument = document.getElementById('TK_id_kategorija')
            for (let i = 0; i < kategorije.length; i++) {
                dokument.innerHTML += '<span>' + kategorije[i].naziv + '</span> ' + '<input type="radio" value=' + kategorije[i].id + ' name="TK_id_kategorija">';
            }
        });
}

async function registriraj() {
    let naziv = document.getElementById('naziv').value;
    let opis = document.getElementById('opis').value;


    let data = {
        "ime": ime,
        "priimek": priimek,
        "starost": starost,
        "email": email,
        "uporabniskoIme": uporabniskoIme,
        "geslo": geslo
    };

    console.log(data);

    fetch('http://localhost:3000/registriraj', {
        method: 'POST', // *GET, POST, PUT, DELETE, etc.
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    })
        .then((odgovor) => { return odgovor.json(); })
        .then((uporabnik) => {
            console.log(uporabnik);
        });
};

function dodajAktivnost() {
    event.preventDefault();
    var formEl = document.forms.aktivnostForma;
    var formData = new FormData(formEl);
    console.log(formData);
    document.getElementById("aktivnostForma").submit();
    window.setTimeout(function(){

        // Move to a new location or you can do something else
        window.location.href = "mojeAktivnosti.html";

    }, 1000);
    //window.location.href = 'aktivnosti.html';
}