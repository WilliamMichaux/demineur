//On crée l'objet case qui sera dans chaque cellule du tableau pour stocker les infos de la case
function Case(nbBombes) {
    this.nbBombesVoisines = nbBombes;
}
//fonction pour obtenir un nombre aléatoire
function getRandomInt(max) {
    return Math.floor(Math.random() * Math.floor(max));
}
//fonction qui initalise la grille de démineur en y ajoutant les bombes et le nombre de bombes voisines à chacunes des cases
function initCarte(tailleCarte, nbBombes) {
    document.getElementById("grilleDem").textContent = "";
    var carte = [];
    //On initialise la carte en fn de la taille en y ajoutant un objet Case dans chaque cellule (nbCellules = taille*taille)
    for (var iCase = 0; iCase < tailleCarte * tailleCarte; iCase++) {
        var nouvelleCase = new Case(0);
        carte.push(nouvelleCase);
    }
    boutonSelec = $("#listDifficulte")
    switch (tailleCarte) {
        case 10:
            boutonSelec.text("Débutant");
            break;
        case 15:
            boutonSelec.text("Intermédiaire");
            break;
        case  20:
            boutonSelec.text("Expert");
            break;
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
            //Si la carte ne porte pas de bombe, on calcule le nombre de bombes parmi ses voisins
            nbBombesVois = compteNbBombes(carte, iCase, tailleCarte);
            carte[iCase].nbBombesVoisines = nbBombesVois;
        }
    }

    //On crée l'élement table qui va recueillir les infos de la grille et qui permet de l'afficher
    var tableElt = document.createElement("table");
    //On crée un attribut pour la carte en indiquant la taille de celle ci
    tableElt.dataset.taille = tailleCarte;
    //On crée un élément div qui contiendra le nombre de drapeau
    var divElt = document.createElement("div");
    divElt.id = "drapeau";
    //On crée l'élement span qui contiendra le nombre de drapeau
    var spanElt = document.createElement("span");
    spanElt.id = "flag_restants";
    spanElt.textContent = nbBombes;
    var flagElt = document.createElement("img");
    flagElt.src = "img/flag.jpg";
    //On ajoute les différents éléments au div
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
    $("#nbClics").text(0);
    document.getElementById("grilleDem").appendChild(pElt);
    document.getElementById("grilleDem").appendChild(divElt);
    document.getElementById("grilleDem").appendChild(tableElt);
    chronoReset();
    gestionClic();

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
//Fonction qui gère le clic qui vient d'être effectué
function gestionClic(e) {
    $("img").contextmenu(function (e) {
        e.preventDefault();
        var tailleCarte = document.querySelector("table").getAttribute("data-taille");
        tailleCarte = Number(tailleCarte);
        var srcElt = e.target.src;
        var regexInconnu = /.demineur_inconnu./;
        var regexFlag = /.flag./;

        if (document.getElementById("nbBombesRestantes").textContent > 0) { //Clic gauche + ctrl = ajout/suppression du drapeau
            if (regexInconnu.test(srcElt) && document.getElementById("flag_restants").textContent > 0) {
                e.target.src = "img/flag.jpg";
                document.getElementById("flag_restants").textContent--;
                if (e.target.alt == -1) {
                    document.getElementById("nbBombesRestantes").textContent--;
                }
                if (document.getElementById("nbBombesRestantes").textContent == 0) {
                    document.getElementById("text_confirm").textContent = "C'est gagné !!";
                    afficheTout(false, tailleCarte);
                }
            } else if (regexFlag.test(srcElt)) {
                e.target.src = "img/demineur_inconnu.jpg";
                document.getElementById("flag_restants").textContent++;
                if (e.target.alt == -1) {
                    document.getElementById("nbBombesRestantes").textContent++;
                }
            }
        }
    });
    $("img").click(function (e) {
        var clicElt = document.getElementById("nbClics");
        clicElt.textContent++;
        if (clicElt.textContent == 1) {
            chronoStart();
        }
        var tailleCarte = document.querySelector("table").getAttribute("data-taille");
        tailleCarte = Number(tailleCarte);
        var srcElt = e.target.src;
        var idElt = e.target.id;
        var regexFlag = /.flag./;
        var nbBombes = e.target.alt;

        if (!regexFlag.test(srcElt)) {
            if (nbBombes == -1) {
                document.getElementById("text_confirm").textContent = "Perdu !! Une autre partie ?";
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
    });
}
//Fonction de fin de partie qui affiche les bombes si la partie est perdue et les drapeau si la partie est gagnée
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
    chronoStop();

}
//Fonction qui affiche les voisins si ceux-ci ne présentent pas de bombes
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
function gestionClickBtn() {
    var difficulte = $("#listDifficulte").text();
    if (difficulte === "Intermédiaire") {
        initCarte(15,25);
    } else if(difficulte === "Débutant") {
        initCarte(10,10);
    } else {
        initCarte(20,75);
    }
}
//On lance une partie de base
initCarte(15,25);
$(window).ready(function () {
    $("#myModal").modal('show');
    $('[data-toggle="popover"]').popover();
});