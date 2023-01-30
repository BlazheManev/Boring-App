
function naloziSkupinskaAktivnost(){
    //nalozi();
    
    var url_string =window.location.href;
    var url = new URL(url_string);
    var id =url.searchParams.get('id_skupinska_aktivnost')

        fetch(`http://localhost:3000/koledar/ena_skupina/${id}`, {method: 'GET'})
        .then((odgovor) => {return odgovor.json();})
        .then((EnaSkupinskaAktivnost) => {
            let h1_naziv = document.getElementById("naziv");
            h1_naziv.innerHTML = EnaSkupinskaAktivnost.naziv;
            
            let span_kraj = document.getElementById("kraj");
            span_kraj.innerHTML = EnaSkupinskaAktivnost.kraj;
    
            let span_datum = document.getElementById("datum");
            span_datum.innerHTML = EnaSkupinskaAktivnost.datum;

            let span_maxKolicina = document.getElementById("maxKolicina");
            span_maxKolicina.innerHTML = EnaSkupinskaAktivnost.max_kolicina;
        });
        fetch(`http://localhost:3000/koledar/ena_skupina/${id}`, {method: 'GET'})
        .then((odgovor) => {return odgovor.json();})
        .then((EnaSkupinskaAktivnost1) => {

            let span_datum1 = document.getElementById("datum");
            span_datum1.innerHTML = EnaSkupinskaAktivnost1.datum;
                   console.log(EnaSkupinskaAktivnost1);
        });
      
    };
    
    naloziSkupinskaAktivnost();