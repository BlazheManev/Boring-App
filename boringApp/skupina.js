function naloziSkupinah(){
   // nalozi();
    
    fetch('http://localhost:3000/koledar/skupinska_aktivnost', {method:'GET'})
    
    .then((odgovor)=>{return odgovor.json();})
    .then((skupina)=> {
        let tabele=document.getElementById("tabelaSkupinah")
        tabele.innerHTML =`
        <tr>
        <th>naziv</th>
        <th id="as">kraj</th>
        <th>data</th>
        <th>max kolicina</th>
    </tr>`;

     for(let i=0;i<skupina.length;i++){
        let vrstica = tabele.insertRow();
        for (const skupinah in skupina[i]){
            if(skupinah === 'naziv'){ 
                let polje = vrstica.insertCell();
                polje.innerHTML = `<a href="ena_aktivnost.html?id_skupinska_aktivnost=${skupina[i].id}">${skupina[i].naziv}</a>`;

                //polje.innerHTML = '<a href=""ena_aktivnost.html?id_skupinskaAktivnost=$()
                //skupina[i][skupinah];
            }
           else if(skupinah !== 'TK_id_kategorija'){
             if(skupinah !==  'id'){
             {
                let polje = vrstica.insertCell();
                polje.innerHTML = skupina[i][skupinah];
            }}}
        }
     }
    });

};
