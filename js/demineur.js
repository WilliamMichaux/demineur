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

