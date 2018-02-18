//On crée l'objet case qui sera dans chaque cellule du tableau pour stocker les infos de la case
function Case(nbBombes) {
    this.nbBombesVoisines = nbBombes;
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
        nbBombes = 25;
    } else {
        tailleCarte = 20;
        nbBombes = 75;
    }

    document.getElementById("grilleDem").textContent = "";
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
        var nouvelleCase = new Case(0);
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
    var nbBombesVois;
    for (var iCase = 0; iCase < tailleCarte * tailleCarte; iCase++) {
        if (carte[iCase].nbBombesVoisines === 0) {
            nbBombesVois = compteNbBombes(carte, iCase, tailleCarte);
            carte[iCase].nbBombesVoisines = nbBombesVois;
        }
    }
    
    var tableElt = document.createElement("table");
    tableElt.dataset.taille = tailleCarte;
    
    var divElt = document.createElement("div");
    divElt.id = "flagsElt";
    var spanElt = document.createElement("span");
    spanElt.id = "flag_restants";
    spanElt.textContent = nbBombes;
    var flagElt = document.createElement("img");
    flagElt.src = "img/flag.jpg";
    divElt.appendChild(spanElt);
    divElt.appendChild(flagElt);
    
    var cpt = 0;
    while (cpt < tailleCarte * tailleCarte) {
        var ligneElt = document.createElement("tr");
        for (var ord = 0; ord < tailleCarte; ord++) {
            var cellEtl = document.createElement("td");
            var imgElt = document.createElement("img");
            imgElt.src = "img/demineur_inconnu.jpg";
            imgElt.alt = carte[cpt].nbBombesVoisines;
            imgElt.id = cpt;
            cellEtl.appendChild(imgElt);
            ligneElt.appendChild(cellEtl);
            cpt++;
        }
        tableElt.appendChild(ligneElt);
    }
    document.getElementById("nbBombesRestantes").textContent = nbBombes;
    var pElt = document.createElement("p");
    pElt.id = "text_confirm";
    document.getElementById("grilleDem").appendChild(pElt);
    document.getElementById("grilleDem").appendChild(divElt);
    document.getElementById("grilleDem").appendChild(tableElt);
    listener();
}
//fonction qui compte le nombre de bombes voisines à une certaines case
function compteNbBombes(carte, indice, tailleCarte) {
    var nbBombes = 0;
    var caseVoisines = [];
    caseVoisines = getVoisins(indice, tailleCarte, true);
    for (var iVois = 0; iVois < caseVoisines.length; iVois++) {
        var indice = caseVoisines[iVois];
        if (carte[indice].nbBombesVoisines === -1) {
            nbBombes++;
        }
    }
    return nbBombes;

}
//On obtient l'indice des voisins de la case
function getVoisins(indice, tailleCarte, estTotal) {
    if (!estTotal) {
        indice = Number(indice);
    }
    var caseVoisines = [];
    //console.log(indice + "%" + tailleCarte +"=" + indice%tailleCarte )
    if (indice % tailleCarte === 0) { //Coté gauche
        if (indice == 0) { //Coin sup gauche
            if (estTotal) {
                caseVoisines = [indice + 1, indice + tailleCarte, indice + tailleCarte + 1];
            } else {
                caseVoisines = [indice + 1, indice + tailleCarte];
            }
        } else if (indice === tailleCarte * (tailleCarte - 1)) { //Coin inf gauche
            if (estTotal) {
                caseVoisines = [indice + 1, indice - tailleCarte, indice - tailleCarte + 1];
            } else {
                caseVoisines = [indice + 1, indice - tailleCarte];
            }
        } else { //reste gauche
            if (estTotal) {
                caseVoisines = [indice + 1, indice - tailleCarte, indice - tailleCarte + 1, indice + tailleCarte, indice + tailleCarte + 1];
            } else {
                caseVoisines = [indice + 1, indice - tailleCarte, indice + tailleCarte];
            }
        }
    } else if (indice % tailleCarte === (tailleCarte - 1)) { //Coté droit
        if (indice === tailleCarte - 1) { //Coin sup droit
            if (estTotal) {
                caseVoisines = [indice - 1, indice + tailleCarte, indice + tailleCarte - 1];
            } else {
                caseVoisines = [indice - 1, indice + tailleCarte];
            }
        } else if (indice === tailleCarte * tailleCarte - 1) { //Coté inf droit
            if (estTotal) {
                caseVoisines = [indice - 1, indice - tailleCarte - 1, indice - tailleCarte];
            } else {
                caseVoisines = [indice - 1, indice - tailleCarte];
            }
        } else { //Reste droit
            if (estTotal) {
                caseVoisines = [indice - 1, indice + tailleCarte, indice + tailleCarte - 1, indice - tailleCarte - 1, indice - tailleCarte];
            } else {
                caseVoisines = [indice - 1, indice - tailleCarte, indice + tailleCarte];
            }
        }
    } else if (indice < tailleCarte) { //Ligne sup
        if (estTotal) {
            caseVoisines = [indice - 1, indice + 1, indice + tailleCarte, indice + tailleCarte + 1, indice + tailleCarte - 1];
        } else {
            caseVoisines = [indice + 1, indice - 1, indice + tailleCarte];
        }
    } else if (indice > tailleCarte * tailleCarte - tailleCarte) { //ligne inf
        if (estTotal) {
            caseVoisines = [indice - 1, indice + 1, indice - tailleCarte, indice - tailleCarte - 1, indice - tailleCarte + 1];
        } else {
            caseVoisines = [indice - 1, indice + 1, indice - tailleCarte];
        }
    } else {
        if (estTotal) {
            caseVoisines = [indice - 1, indice + 1, indice - tailleCarte, indice - tailleCarte - 1, indice - tailleCarte + 1, indice + tailleCarte, indice + tailleCarte + 1, indice + tailleCarte - 1];
        } else {
            caseVoisines = [indice - 1, indice + 1, indice + tailleCarte, indice - tailleCarte];
        }

    }

    return caseVoisines;
}

function listener() {
    var tableElt = document.querySelector("table");
    //Clic gauche
    tableElt.addEventListener("click", gestionClic);    

    
}

function gestionClic(e) {
    e.preventDefault();
    var tailleCarte = document.querySelector("table").getAttribute("data-taille");
    tailleCarte = Number(tailleCarte);
    var bouton = e.buttons;
    var srcElt = e.target.src;
    var idElt = e.target.id;
    var regexInconnu = /.demineur_inconnu./;
    var regexFlag = /.flag./;
    if (e.ctrlKey && document.getElementById("nbBombesRestantes").textContent > 0) { //Clic gauche + ctrl = ajout/suppression du drapeau       
        if (regexInconnu.test(srcElt) && document.getElementById("flag_restants").textContent > 0) {
            e.target.src = "img/flag.jpg";
            document.getElementById("flag_restants").textContent--;
            if (e.target.alt == -1) {
                document.getElementById("nbBombesRestantes").textContent--;
            }
            if (document.getElementById("nbBombesRestantes").textContent == 0) {
                document.getElementById("text_confirm").textContent = "GG c'est gagné !!";
                afficheTout(false, tailleCarte);
            }
        } else if (regexFlag.test(srcElt)) {
            e.target.src = "img/demineur_inconnu.jpg";
            document.getElementById("flag_restants").textContent++;
            if (e.target.alt == -1) {
                document.getElementById("nbBombesRestantes").textContent++;
            }
        }
    } else {
        var nbBombes = e.target.alt;
        if (!regexFlag.test(srcElt)) {
            if (nbBombes == -1) {
                document.getElementById("text_confirm").textContent = "Perdu !!";
                afficheTout(true, tailleCarte);
            } else if (nbBombes == 0) {
                e.target.src = "img/demineur_rien.jpg";
                var caseVisitees = [];
                caseVisitees.push(Number(idElt));
                afficheVoisins(tailleCarte, Number(idElt), caseVisitees);
            } else {
                e.target.src = "img/demineur_" + nbBombes + ".jpg";
            }
        }
    }
}

function afficheTout(estPerdu, tailleCarte) {
    for (var i = 0; i < tailleCarte * tailleCarte; i++) {
        var cellElt = document.getElementById(i);
        var nbBombes = cellElt.alt;
        if (nbBombes == -1) {
            if (estPerdu) {
                cellElt.src = "img/demineur_bomb.jpg";   
            } else {
                cellElt.src = "img/flag.jpg";
            }
        } else if (nbBombes == 0) {
            cellElt.src = "img/demineur_rien.jpg";
        } else {
            cellElt.src = "img/demineur_" + nbBombes + ".jpg";
        }
    }
}

function afficheVoisins(tailleCarte, indice, caseVisitees) {
    var voisins = getVoisins(indice, tailleCarte, true);
    for (var i = 0; i < voisins.length; i++) {
        var index = caseVisitees.indexOf(voisins[i]);
        if (index == -1) {
            var caseElt = document.getElementById(voisins[i]);
            var nbBombes = caseElt.alt;
            if (nbBombes == 0) {
                caseElt.src = "img/demineur_rien.jpg";
                caseVisitees.push(voisins[i]);
                afficheVoisins(tailleCarte, voisins[i], caseVisitees);
            } else {
                caseElt.src = "img/demineur_" + nbBombes + ".jpg";
            }
        }


    }
}