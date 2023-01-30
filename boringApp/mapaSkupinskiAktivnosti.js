
var mymap = L.map('mapid').setView([46.157,14.661], 8);
L.tileLayer('https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}', {
    attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
    maxZoom: 18,
    id: 'mapbox/streets-v11',
    tileSize: 512,
    zoomOffset: -1,
    accessToken: 'pk.eyJ1IjoiYmxhemhlIiwiYSI6ImNrcG10M2RzZDA1MmUzMXA0Y2g5ejQ2OGQifQ.qCnJ7059awMz147RrNme0Q'
}).addTo(mymap);
var a=false;

function dolociLokacijo(){   
    var url_string =window.location.href;
    var url = new URL(url_string);
    var id =url.searchParams.get('id_skupinska_aktivnost')
 
   
    console.log(a);
    if (a == false){
    a=true;
     console.log(a);

        fetch(`http://localhost:3000/koledar/ena_skupina/${id}`, {method: 'GET'})
        .then((odgovor) => {return odgovor.json();})
        .then((EnaSkupinskaAktivnost) => {
      
    
            let span_kraj = document.getElementById("kraj");
            span_kraj.innerHTML = EnaSkupinskaAktivnost.kraj;
            console.log(span_kraj)
            let span_datum = document.getElementById("datum");
            span_datum.innerHTML = EnaSkupinskaAktivnost.datum;
            console.log(EnaSkupinskaAktivnost.datum)

            fetch(`https://nominatim.openstreetmap.org/search?format=json&q=${EnaSkupinskaAktivnost.kraj}`, {method: 'GET'})
        .then((odgovor)=> { return odgovor.json(); })
        .then((lokacije1)=>{
         
            console.log(lokacije1[0]);
            let izbrana1 =lokacije1[0];
         L.marker([izbrana1.lat,izbrana1.lon]).addTo(mymap)
            mymap.setView([izbrana1.lat,izbrana1.lon],13)


        })
        });}


    
    let lokacija= document.getElementById('naslov').value
    console.log(lokacija)
        fetch(`https://nominatim.openstreetmap.org/search?format=json&q=${lokacija}`, {method: 'GET'})
        .then((odgovor)=> { return odgovor.json(); })
        .then((lokacije)=>{
            console.log(lokacije[0]);
            let izbrana =lokacije[0];
            mymap.setView([izbrana.lat,izbrana.lon],13)  
        })  
    };

    
      
    /**
     *   fetch(`http://localhost:3000/ena_skupina/${id}`, {method: 'GET'})
        .then((odgovor) => {return odgovor.json();})
        .then((mapa) => {
            let krajMapa = document.getElementById("kraj");
            krajMapa.innerHTML = mapa.kraj;

            console.log(krajMapa)
          
        });    
  

    let lokacija= document.getElementById('naslov').value
    console.log(lokacija)
     */