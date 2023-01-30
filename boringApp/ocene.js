function oceni() {
    let ocena = document.getElementById('ocena').value;
    let aktivnost = sessionStorage.getItem('oceni');
    let prijavljen = JSON.parse(sessionStorage.getItem('prijavljen'));
    let uporabnik = prijavljen.id;
    fetch(`http://localhost:3000/ocena/dodajOceno?ocena=${ocena}&TK_id_aktivnost=${aktivnost}&TK_id_uporabnik=${uporabnik}`, { method: 'GET' })
        .then((odgovor) => { return odgovor.json(); })
        .then((nekaj) => {
            console.log(nekaj);
            sessionStorage.removeItem('oceni');
        });
        window.location.href = 'aktivnosti.html';
};