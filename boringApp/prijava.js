async function prijavi() {
    let uporabniskoIme = document.getElementById('uporabniskoIme').value;
    let geslo = document.getElementById('geslo').value;

    console.log(uporabniskoIme);
    console.log(geslo);


    let data = { "uporabniskoIme": uporabniskoIme, "geslo": geslo };

    console.log(data);

    fetch('http://localhost:3000/uporabnik/prijavi', {
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
                window.location.href = 'aktivnosti.html';
            }else {

            }
        });
};