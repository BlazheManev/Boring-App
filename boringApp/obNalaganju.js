function nalozi() {
    let prijavljen = JSON.parse(sessionStorage.getItem('prijavljen'));
    if (sessionStorage.getItem('prijavljen') != null) {
        var x = document.getElementById("login");
        if (x != null) {
            x.style.display = "none";
        }
        if (prijavljen.je_admin == "1") {
            document.getElementById('ulnav').innerHTML = ' <li class="nav-item"><a class="nav-link" href="aktivnosti.html">Aktivnosti</a></li>' +
            '<li class="nav-item"><a class="nav-link"  href="vprasalnik.html">Vprašalnik aktivnosti</a></li><li class="nav-item"><a class="nav-link"  href="mojeAktivnosti.html">Moje aktivnosti</a></li><li class="nav-item"><a class="nav-link"  href="priljubljene.html">Priljubljene aktivnosti</a></li>' + 
            '<li class="nav-item"><a class="nav-link"  href="skupinskih_aktivnosti.html">Skupinske aktivnosti</a></li>'+
            '<li class="nav-item"><a class="nav-link"  href="dodajanjeAktivnosti.html">Dodaj aktivnost</a></li><li class="nav-item"><a class="nav-link"  href="dodajanjeSkupinskihAktivnosti.html">Dodaj skupinsko aktivnost</a></li>' + 
            ' <li class="nav-item"><a class="nav-link"  href="koledar.html">Koledar</a></li><li class="nav-item"><a class="nav-link"  href="kategorije.html">Kategorije</a></li>				  <li><a class="nav-link" href="koledar.html">Koledar</a></li>';
        document.getElementById('nav').innerHTML += '<div><button id="odjava" class="btn float-right" onclick="odjavi()">Odjavi</button></div>';
        }else {
            document.getElementById('ulnav').innerHTML = ' <li class="nav-item"><a class="nav-link" href="aktivnosti.html">Aktivnosti</a></li>' +
            '<li class="nav-item"><a class="nav-link"  href="vprasalnik.html">Vprašalnik aktivnosti</a></li><li class="nav-item"><a class="nav-link"  href="mojeAktivnosti.html">Moje aktivnosti</a></li><li class="nav-item"><a class="nav-link"  href="priljubljene.html">Priljubljene aktivnosti</a></li>' + 
            '<li class="nav-item"><a class="nav-link"  href="skupinskih_aktivnosti.html">Skupinske aktivnosti</a></li>'+
            '<li class="nav-item"><a class="nav-link"  href="dodajanjeAktivnosti.html">Dodaj aktivnost</a></li><li class="nav-item"><a class="nav-link"  href="dodajanjeSkupinskihAktivnosti.html">Dodaj skupinsko aktivnost</a></li><li><a class="nav-link" href="koledar.html">Koledar</a></li>';
        document.getElementById('nav').innerHTML += '<div><button id="odjava" class="btn float-right" onclick="odjavi()">Odjavi</button></div>';
        }
    } else {
        document.getElementById('ulnav').innerHTML = ' <li class="nav-item"><a class="nav-link"  href="skupinskih_aktivnosti.html">Skupinski Aktivnosti</a></li>' +
            '<li class="nav-item"><a class="nav-link"  href="vprasalnik.html">Vprašalnik aktivnosti</a></li><li class="nav-item"><a class="nav-link"  href="login.html">Prijava</a></li><li class="nav-item"><a class="nav-link"  href="register.html">Registracija</a></li>';

    }
}

function odjavi() {
    sessionStorage.removeItem('prijavljen');
    window.location.href = 'index.html';
}

async function kontaktiraj(email) {
    window.open('mailto:' + email);
}