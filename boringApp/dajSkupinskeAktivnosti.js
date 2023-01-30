async function dodajZaSkupinsko() {
    let naziv = document.getElementById('naziv').value;
    let kraj = document.getElementById('kraj').value;
    let datum = document.getElementById('datum').value;
	let max_kolicina = document.getElementById('maks').value;
	let TK_id_kategorija = document.getElementById('kategorija').value;
	
	let seznam = {
		"naziv": naziv,
		"kraj": kraj,
		"datum": datum,
		"max_kolicina": max_kolicina,
		"TK_id_kategorija": TK_id_kategorija
	};
	
	console.log(seznam);
	
	await fetch('http://localhost:3000/skupinskeAktivnosti/dodajSkupinskeAktivnosti', {
        method: 'POST',
		body: JSON.stringify(seznam),
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        
		
    }).then((odgovor) => { return odgovor.json(); })
      .then((skupinske_aktivnosti) => {console.log(skupinske_aktivnosti)})
	
};

async function naloziSkupinskeAktivnosti() {
	 await fetch('http://localhost:3000/skupinskeAktivnosti/skupinska_aktivnost', { method: 'GET' })
        .then((odgovor) => { return odgovor.json(); })
        .then((skupinske_aktivnosti) => {
            let skupinsko = document.getElementById('skupinskeAktivnosti');
			skupinsko.innerHTML = `
			<tr>
                <th>Naziv</th>
                <th>Kraj</th>
                <th>Datum</th>
				<th>Max kolicina</th>
				<th>Kategorija</th>
            </tr>
             `;

              for (let i = 0; i < skupinske_aktivnosti.length; i++) {
                let vrstica = skupinsko.insertRow();
                for (const lastnost in skupinske_aktivnosti[i]) {
					
                    if (lastnost !== 'id') {
                        let polje = vrstica.insertCell();
                        polje.innerHTML = skupinske_aktivnosti[i][lastnost];
                    }
                }
				let gumb = vrstica.insertCell();
					gumb.innerHTML = '<button class="btn" onclick="izbrisiSkupinskeAktivnosti(' + skupinske_aktivnosti[i].id + ')">Izbris</button>';
            }


	});
}
	function izbrisiSkupinskeAktivnosti(id) {
		console.log("id: "+id);
    fetch(`http://localhost:3000/skupinskeAktivnosti/brisiSkupinskeAktivnosti/${id}`, { method: 'DELETE' })
        .then((odgovor) => { 
		console.log("test");
		return odgovor.json(); })
        .then((odgovor) => {
            console.log(odgovor);
            location.reload(true);
        }).catch(err => {
			console.log(err);
		});
}
