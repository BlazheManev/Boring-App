async function registriraj() {
    let ime = document.getElementById('ime').value;
    let priimek = document.getElementById('priimek').value;
    let starost = document.getElementById('starost').value;
    let email = document.getElementById('email').value;
    let uporabniskoIme = document.getElementById('uporabniskoIme').value;
    let geslo = document.getElementById('geslo').value;

    console.log(uporabniskoIme);
    console.log(geslo);


    let data = { "ime": ime, 
    "priimek": priimek, 
    "starost": starost, 
    "email": email, 
    "uporabniskoIme": uporabniskoIme, 
    "geslo": geslo };

    console.log(data);

    fetch('http://localhost:3000/uporabnik/registriraj', {
        method: 'POST', // *GET, POST, PUT, DELETE, etc.
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    })
        .then((odgovor) => { return odgovor.json(); })
        .then((odgovor) => {
            console.log(odgovor.status);
            if (odgovor.status === 'OK') {
                sessionStorage.setItem('prijavljen', JSON.stringify(odgovor.uporabnik));
                window.location.href = 'dodajanjeAktivnosti.html';
            } else {

            }
        });
};