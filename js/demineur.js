//On crée l'objet case qui sera dans chaque cellule du tableau pour stocker les infos de la case
function Case(nbBombes, flag) {
    this.nbBombesVoisines = nbBombes;
    this.flag = flag;
}
//On récupère la difficulté et on génère une carte en fonction
var formElt = document.getElementById("difficulte");
formElt.addEventListener("click", function (e) {
    var difficulte = e.target.id;
    var tailleCarte;
    var nbBombes;
    if (difficulte === "facile") {
        tailleCarte = 100;
        nbBombes = 10;
    } else if (difficulte === "moyen") {
        tailleCarte = 255;
        nbBombes = 50;
    } else {
        tailleCarte = 400;
        nbBombes = 100;
    }

    console.log(tailleCarte, nbBombes);

    initCarte(tailleCarte, nbBombes);
});

//fonction pour obtenir un nombre aléatoire
function getRandomInt(max) {
    return Math.floor(Math.random() * Math.floor(max));
}

function compteNbBombes(carte, indice) {
    var nbBombes = 0;
    caseVoisines = //T'es ici connard
    
    for (var i = 0;i< 8;i++) {
        if (carte[i].nbBombesVoisines == -1) {
            nbBombes++;
        }
    }
    return nbBombes;
}


function initCarte(tailleCarte, nbBombes) {
    var carte = [];

    for (var iCase = 0; iCase < tailleCarte; iCase++) {
        var nouvelleCase = new Case(0, false);
        carte.push(nouvelleCase);
    }

    var iBombe = 0;
    while (iBombe < nbBombes) {
        var randInt = getRandomInt(tailleCarte);
        if (carte[randInt].nbBombesVoisines == 0) {
            carte[randInt].nbBombesVoisines = -1;
            iBombe++;
        }
        
    }
    for (var iCase = 0; iCase < tailleCarte; iCase++) {
        if (carte[iCase].nbBombesVoisines == 0) {
            var nbBombes = compteNbBombes(carte, iCase)
            carte[iCase].nbBombesVoisines = nbBombes;
        }
    }
    /* Afficher les valeurs des cases
    for (var i = 0; i< tailleCarte; i++) {
        console.log(i + "-->" + carte[i].nbBombesVoisines);
    }*/
}
