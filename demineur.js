//TODO :    Méthode dans Case pour afficher le contenu de la case
//          Empêcher la suppression de case quand on est sur un flag et qu'on clique un peu en dessous
//          Cacher le jeu quand on fait pause

window.onload = init;
let table;
let caseVisitées = [];
let nbBombesRestantes;
let nbFlagRestants;
let classe = ["un", "deux", "trois", "quatre", "cinq", "six"];
let eltDrapeaux;
let eltModalFin;
let close;
let tableElt;
let slider;
let output;
let taille;
let tailleDeux;
let btnJouer;
let btnDebutant;
let btnIntermediaire;
let btnExpert;
let btnRejouer;
let nbClicks;
let dernierTaille;
let dernierBombe;
let minutesElt;
let secondesElt;
let playPause;
let intervalMin;
let intervalSec;
let minutes;
let secondes;

document.oncontextmenu = function(){return false};

function init(){
        eltDrapeaux = document.getElementById("nbFlag");
        eltModalFin = document.getElementById("modalFin");
        tableElt = document.getElementById("jeu");
        close = document.getElementsByClassName("close")[0];
        slider = document.getElementById("range");
        output = document.getElementById("nbBombes");
        taille = document.getElementById("taille");
        tailleDeux = document.getElementById("taille2");
        btnJouer = document.getElementById("jouer");
        btnDebutant = document.getElementById("deb");
        btnIntermediaire = document.getElementById("inter");
        btnExpert = document.getElementById("expert");
        btnRejouer = document.getElementById("btnRejouer");
        dernierTaille = 10;
        dernierBombe = 10;
        minutesElt = document.getElementById("minutes");
        secondesElt = document.getElementById("secondes");
        playPause = document.getElementById("pause");
        initTab(10,10,10);
        close.onclick = function() {
            eltModalFin.style.display = "none";
            removeConfetti();
        }
        output.innerHTML = slider.value;
        slider.oninput = function() {
            output.innerHTML = this.value;
        } 
        taille.oninput = function() {
            tailleDeux.value = this.value;
            slider.max = this.value*this.value;
            slider.value = Math.floor((this.value*this.value)/2);
            output.innerHTML = Math.floor((this.value*this.value)/2);
        }
        btnJouer.onclick = function(e){
            //e.preventDefault;
            dernierBombe = Number(slider.value);
            dernierTaille = Number(taille.value);
            if(taille.value > 50){
                initTab(50,50,200);
            } else {
                initTab(Number(taille.value), Number(taille.value), Number(slider.value));            
            }            
        }
        btnDebutant.onclick = function(){
            initTab(10,10,10);
            dernierBombe = 10;
            dernierTaille = 10;
        }
        btnIntermediaire.onclick = function(){
            initTab(15,15,20);
            dernierBombe = 20;
            dernierTaille = 15;
        }
        btnExpert.onclick = function(){
            initTab(20,20,60);
            dernierBombe = 60;
            dernierTaille = 20;
        }
        btnRejouer.onclick = function() {
            initTab(dernierTaille,dernierTaille,dernierBombe);
            removeConfetti();
            eltModalFin.style.display = "none";
        }
        
}

function initTab(nbLi, nbCol, nbBombes){
    table = [];
    playPause.className = "fa fa-pause";
    chronoStop();
    nbBombesRestantes = nbBombes;
    minutes = 0;
    secondes = 0;
    minutesElt.innerHTML = "00";
    secondesElt.innerHTML = "00";
    nbClicks = 0;
    nbFlagRestants = nbBombes;
    eltDrapeaux.innerHTML = nbFlagRestants;    
    tableElt.innerHTML = "";
    document.getElementById("jeu").addEventListener("mouseup", gestionClic);
    
    for(let i = 0;i<nbLi;i++){
        let ligneElt = document.createElement("tr");
        table[i] = [];
        for(let j = 0;j<nbCol;j++){
            let colElt = document.createElement("td");
            let newCase = new Case(j,i);            
            colElt.dataset.posY = i;
            colElt.dataset.posX = j;
            table[i][j] = newCase;
            ligneElt.appendChild(colElt);
        }
        tableElt.appendChild(ligneElt);
    }
    placeBombes(nbBombes);
    for(let ligne of table){
        for(let colonne of ligne){
            colonne.compteVoisins();
        }
    }    
}

class Case {
    constructor(posX,posY){
        this.posX = posX;
        this.posY = posY;
        this.estMinee = false;
        this.estFlag = false;
        this.estInconnue = false;
        this.nbVoisinsMine = 0;
        this.estDivulguee = false;
    }
    
    compteVoisins() {
        let colonne = this.posX;
        let ligne = this.posY;

        for(let i = ligne - 1;i<=ligne+1;i++){
            for(let j = colonne - 1;j<=colonne+1;j++){
                if((i != ligne || j != colonne) && valideDonnee(i,j)){
                    if(table[i][j].estMinee){
                        this.nbVoisinsMine++;
                    }
                }
            }
        }
    }
}

function placeBombes(nbBombes){
    while(nbBombes > 0){
        let posX = Math.floor(Math.random()*table.length);
        let posY = Math.floor(Math.random()*table.length);
        if(!table[posY][posX].estMinee){
            table[posY][posX].estMinee = true;
            nbBombes--;
        }
    }
}

let gestionClic = function(event){
    let target;
    
    if(event.target.parentNode.nodeName == "TR"){
        target = table[event.target.dataset.posY][event.target.dataset.posX];       
    } else {
        target = table[event.target.parentNode.dataset.posY][event.target.parentNode.dataset.posX];  
    }
    if(target.estFlag || !target.estDivulguee){
        switch (event.button){
        case 0 :
            if(!target.estFlag){
                if(target.estMinee){
                    document.getElementById("jeu").removeEventListener("mouseup", gestionClic);
                    afficheBombesErreurs(event);
                    document.getElementById("texte").textContent = "C'est perdu !!!";
                    document.getElementById("texte").style.color = "#ea4335";
                    chronoStop();
                    eltModalFin.style.display = "block";
                } else if(!target.estFlag && !target.estInconnue){
                    nbClicks++;
                    if(nbClicks == 1){
                        chronoStart();
                    }
                    afficheCase(target);
                }
            }
            break;
        case 1 :
            if(!target.estFlag){
                if(target.estInconnue){
                    event.target.parentNode.classList.toggle("interro");
                    event.target.textContent = "";
                    target.estInconnue = false;
                    target.estFlag = false;
                } else {                    
                    event.target.textContent = "?";
                    target.estInconnue = true;
                    target.estFlag = false;
                    event.target.classList.toggle("interro");
                }                
            }
            break;
        case 2 :
            if(target.estFlag){
                event.target.parentNode.classList.toggle("flag");
                event.target.parentNode.innerHTML = "";
                nbFlagRestants++;
                target.estFlag = false;
                if(target.estMinee){
                    nbBombesRestantes++;
                }                
            } else if (nbFlagRestants > 0) {
                event.target.innerHTML = "<i class='far fa-flag'></i>";
                target.estFlag = true;
                nbFlagRestants--;
                event.target.classList.toggle("flag");
                if(target.estMinee){
                    nbBombesRestantes--;
                }
            }  
            eltDrapeaux.innerHTML = nbFlagRestants;                      
            break;
        }
        if(nbBombesRestantes == 0){
            document.getElementById("jeu").removeEventListener("mouseup", gestionClic);
            afficheBombesErreurs(event);
            chronoStop();
            document.getElementById("texte").textContent = "C'est gagné !!!";
            document.getElementById("texte").style.color = "#84bd00";
            eltModalFin.style.display = "block";
            startConfetti();
        }
    }
}

function afficheCase(target){    
    let caseVisee = document.querySelector(`[data-pos-y='${target.posY}'][data-pos-x='${target.posX}']`);
    target.estDivulguee = true;
    if(target.nbVoisinsMine == 0){
        caseVisee.style.backgroundColor = "white";
        caseVisitées.push(target);
        checkVoisin(target);
    } else {
        caseVisee.innerHTML = target.nbVoisinsMine;
        caseVisee.className = classe[target.nbVoisinsMine-1];
    }
}

function afficheBombesErreurs(event){
    
    let cases = document.querySelectorAll("td");
    for(let caseVisee of cases){
        let caseTab = table[caseVisee.dataset.posY][caseVisee.dataset.posX];
        
        if(caseTab.estFlag && !caseTab.estMinee){
            caseVisee.style.backgroundColor = "red";
            caseVisee.style.color = "white";
        } else if (caseTab.nbVoisinsMine == 0 && !caseTab.estMinee){
            caseVisee.style.backgroundColor = "white";
        } else if (caseTab.estMinee){
            caseVisee.innerHTML = "<i class='fas fa-bomb'></i>";
            caseVisee.style.backgroundColor = "white";
        } else {            
            caseVisee.innerHTML = caseTab.nbVoisinsMine;
            caseVisee.backgroundColor = 'white';
            caseVisee.className = classe[caseTab.nbVoisinsMine-1];
        }
        if(nbBombesRestantes != 0){
            event.target.innerHTML = "<i class='fas fa-bomb'></i>";
            event.target.style.backgroundColor = "red";
        }
    }
}

function checkVoisin(target){
    let colonne = target.posX;
    let ligne = target.posY;
    for(let i = ligne - 1;i<=ligne+1;i++){
        for(let j = colonne - 1;j<=colonne+1;j++){
            if((i != ligne || j != colonne) && this.valideDonnee(i,j)){
                if(!caseVisitées.includes(table[i][j])){
                    afficheCase(table[i][j]);
                }
            }
        }
    }
}

function valideDonnee(ligne, colonne){
    return (ligne >= 0 && ligne < table.length) && (colonne >= 0 && colonne < table[0].length);
}

window.onclick = function(event) {
    if (event.target == eltModalFin) {
      eltModalFin.style.display = "none";
      removeConfetti();
    }
} 

function chronoStart() {
    playPause.addEventListener("click",function() {
        if(playPause.className == "fa fa-play"){
            playPause.className = "fa fa-pause";                                
            chronoStart();
        } else {
            playPause.className = "fa fa-play";
            chronoStop();
            
        }
    })
    document.getElementById("jeu").addEventListener("mouseup", gestionClic);
    intervalMin = setInterval(function(){
        minutes++;
        if(minutes < 10){
            minutesElt.innerHTML = "0" + minutes;
        } else {
            minutesElt.innerHTML = minutes;
        }
    },60000);
    intervalSec = setInterval(function(){
        secondes++;
        if(secondes == 60){
            secondes = 0;
        }
        if(secondes<10){
            secondesElt.innerHTML = "0" + secondes;
        } else {
            secondesElt.innerHTML = secondes;
        }
    },1000)    
}

function chronoStop() {
    document.getElementById("jeu").removeEventListener("mouseup", gestionClic);
    clearInterval(intervalMin);
    clearInterval(intervalSec);
}