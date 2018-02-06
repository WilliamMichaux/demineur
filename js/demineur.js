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

    document.getElementById("bloc_page").textContent = "";
    console.log(tailleCarte, nbBombes);

    initCarte(tailleCarte, nbBombes);
});
//fonction pour obtenir un nombre aléatoire
function getRandomInt(max) {
    return Math.floor(Math.random() * Math.floor(max));
}
//fonction qui initalise la grille de démineur en y ajoutant les bombes et le nombre de bombes voisines à chacunes des cases
function initCarte(tailleCarte, nbBombes) {
    var carte = [];
    //On initialise la carte en fn de la taille en y ajoutant un objet Case dans chaque cellule (nbCellules = taille*taille)
    for (var iCase = 0; iCase < tailleCarte * tailleCarte; iCase++) {
        var nouvelleCase = new Case(0, false);
        carte.push(nouvelleCase);
    }
    //On ajoute le nombre de bombes nécessaires aléatoirement dans la carte
    var iBombe = 0;
    while (iBombe < nbBombes) {
        var randInt = getRandomInt(tailleCarte * tailleCarte);
        if (carte[randInt].nbBombesVoisines === 0) {
            carte[randInt].nbBombesVoisines = -1;
            iBombe++;
        }
    }
    //On calcule le nombre de bombes voisine à chaque case sauf celles qui comportent une bombe
    var nbBombes;
    for (var iCase = 0; iCase < tailleCarte * tailleCarte; iCase++) {
        if (carte[iCase].nbBombesVoisines === 0) {
            nbBombes = compteNbBombes(carte, iCase, tailleCarte);
            carte[iCase].nbBombesVoisines = nbBombes;
        }
    }
    //Afficher les valeurs des cases A SUPPRIMER
    for (var i = 0; i < tailleCarte * tailleCarte; i++) {
        console.log(i + "-->" + carte[i].nbBombesVoisines);
    }
    var tableElt = document.createElement("table");
    tableElt.id = "grille";
    var cpt = 0;
    while (cpt < tailleCarte * tailleCarte) {
        var ligneElt = document.createElement("tr");
        for (var ord = 0; ord < tailleCarte; ord++) {
            var cellEtl = document.createElement("td");
            cellEtl.id = cpt;
            cellEtl.style.height = "25px";
            cellEtl.style.backgroundColor = "black";
            var imgElt = document.createElement("img");
            imgElt.src = "img/demineur_inconnu.jpg";
            imgElt.alt = "case";
            cellEtl.appendChild(imgElt);
            ligneElt.appendChild(cellEtl);
            cpt++;
        }
        tableElt.appendChild(ligneElt);
    }
    document.getElementById("bloc_page").appendChild(tableElt);
    listener();
}
//fonction qui compte le nombre de bombes voisines à une certaines case
function compteNbBombes(carte, indice, tailleCarte) {
    var nbBombes = 0;
    var caseVoisines = [];
    caseVoisines = getVoisins(carte, indice, tailleCarte);
    for (var iVois = 0; iVois < caseVoisines.length; iVois++) {
        var indice = caseVoisines[iVois];
        if (carte[indice].nbBombesVoisines === -1) {
            nbBombes++;
        }
    }
    return nbBombes;

}
//On obtient l'indice des voisins de la case
function getVoisins(carte, indice, tailleCarte) {
    var caseVoisines = [];
    //console.log(indice + "%" + tailleCarte +"=" + indice%tailleCarte )
    if (indice % tailleCarte === 0) { //Coté gauche
        if (indice == 0) { //Coin sup gauche
            caseVoisines = [indice + 1, indice + tailleCarte, indice + tailleCarte + 1];
        } else if (indice === tailleCarte * (tailleCarte - 1)) { //Coin inf gauche
            caseVoisines = [indice + 1, indice - tailleCarte, indice - tailleCarte + 1];
        } else { //reste gauche
            caseVoisines = [indice + 1, indice - tailleCarte, indice - tailleCarte + 1, indice + tailleCarte, indice + tailleCarte + 1];
        }
    } else if (indice % tailleCarte === (tailleCarte - 1)) { //Coté droit
        if (indice === tailleCarte - 1) { //Coin sup droit
            caseVoisines = [indice - 1, indice + tailleCarte, indice + tailleCarte - 1];
        } else if (indice === tailleCarte * tailleCarte - 1) { //Coté inf droit
            caseVoisines = [indice - 1, indice - tailleCarte - 1, indice - tailleCarte];
        } else {
            caseVoisines = [indice - 1, indice + tailleCarte, indice + tailleCarte - 1, indice - tailleCarte - 1, indice - tailleCarte];
        }
    } else if (indice < tailleCarte) { //Ligne sup
        caseVoisines = [indice - 1, indice + 1, indice + tailleCarte, indice + tailleCarte + 1, indice + tailleCarte - 1];
    } else if (indice > tailleCarte * tailleCarte - tailleCarte) { //ligne inf
        caseVoisines = [indice - 1, indice + 1, indice - tailleCarte, indice - tailleCarte - 1, indice - tailleCarte + 1];
    } else {
        caseVoisines = [indice - 1, indice + 1, indice - tailleCarte, indice - tailleCarte - 1, indice - tailleCarte + 1, indice + tailleCarte, indice + tailleCarte + 1, indice + tailleCarte - 1];
    }

    return caseVoisines;
}

function listener(){
    var tableElt = document.getElementById("grille");
    tableElt.addEventListener("click", gestionClic)
    tableElt.addEventListener("contextmenu", gestionClic);
}
function gestionClic(e) {
    e.preventDefault();
    var bouton = e.buttons;
    var cellElt = document.getElementById(e.target);
    console.log(cellElt);
    console.log(bouton);
}