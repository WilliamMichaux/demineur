// A créer : 
// ---------
// carte n* : case 

// Case : nbBombesVoisines (-1 si une bombe est sur la case)
//      : flag (bool)
// n = tailleCarte²
 
// La carte est un simple tableau mais utlisé comme un double [EX 5x5] : 
// 00 01 02 03 04  
// 05 06 07 08 09  
// 10 11 12 13 14 
// 15 16 17 18 19 
// 20 21 22 23 24

// "document" est un élement du DOM qui affiche la case

---* afficheZero
module(afficheZero;caseVisée, caseVisitees;)
// caseVisée est l'indice de la case visée, c'est aussi l'id de la case
// caseVisitees arrive par défault avec la première case visée (ex = caseVisitees = [8])

Obtenir tailleCarte
module(obtenirVoisins;tailleCarte, caseVisée, false;cardinaux)
iCard = 0
do while (iCard < cardinaux.lenght)
obtenir nbBombesCardinal
if (nbBombesCardinal = 0)
if (cardinaux[iCard] not in caseVisitées)
paragraphe(afficheVoisins)
caseVisitées[n+1] = cardinaux[iCard]
module(afficheZero;cardinaux[iCard], caseVisitees;)
endif
endif
iCard++
enddo
------