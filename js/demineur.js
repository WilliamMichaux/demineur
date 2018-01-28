//On crée l'objet case qui sera dans chaque cellule du tableau pour stocker les infos de la case
var Case = {
    element: "",
    nbBombes: 0,
    display: false,
}
//On récupère la difficulté et on génère une carte en fonction
var formElt = document.getElementById("difficulte");
formElt.addEventListener("click", function (e) {
    var difficulte = e.target.id;
    var tailleCarte;
    var nbBombes;
    if (difficulte === "facile") {
        tailleCarte = 10;
        nbBombes = 10;
    } else if (difficulte === "moyen") {
        tailleCarte = 15;
        nbBombes = 50;
    } else {
        tailleCarte = 20;
        nbBombes = 100;
    }

    console.log(tailleCarte, nbBombes);

    initTab(tailleCarte, nbBombes);
});

//fonction pour obtenir un nombre aléatoire
function getRandomInt(max) {
    return Math.floor(Math.random() * Math.floor(max));
}

//On génère la carte
function initTab(tailleCarte, nbBombes) {
    //On créé un tableau a deux dimensions de taille n
    var grille = [][];    
    //ICI JE SUIS BLOQUE A LA CREATION DU TABLEAU BI-DIMENSION /!\/!\/!\/!\    
    for (var iAbs; iAbs < tailleCarte; iAbs++) {
        for (var iOrd; iOrd < tailleCarte; iOrd++) {
            var nouvCase = Object.create(Case);
            grille[iAbs][iOrd] = nouvCase;
        }
    }
    
    var iBombes = nbBombes;
    while (iBombes > 0) {
        var randAbs = getRandomInt(tailleCarte -1);
        var randOrd = getRandomInt(tailleCarte -1);
        
        console.log(randAbs);
    
        if (grille[randAbs][randOrd].nbBombes != -1){ 
            grille[randAbs][randOrd].element ="rien";
            grille[randAbs][randOrd].nbBombes = -1;
            iBombes--;
        }
    }
    
    for (var iAbs; iAbs < tailleCarte; iAbs++) {
        for (var iOrd; iOrd < tailleCarte; iOrd++) {
            console.log(grille[iAbs][iOrd].nbBombes);
        }
    }

};


