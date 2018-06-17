<!doctype html>

<?php
session_start();
    $compteur = fopen("compteurVue.txt", 'r+');
    $compte = fgets($compteur);

    if(!isset($_SESSION['visite']))
    {
        $_SESSION['visite'] = 'estVisite';
        $compte++;
        fseek($compteur,0);
        fputs($compteur, $compte);
    }
    fclose($compteur);
?>

<html>
<head>
    <title>Démineur</title>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <link rel="icon" type="image/png" href="img/icone.png" />
    <link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/4.1.0/css/bootstrap.min.css" integrity="sha384-9gVQ4dYFwwWSjIDZnLEWnxCjeSWFphJiwGPXr1jddIhOegiu1FwO5qRGvFXOdJZ4" crossorigin="anonymous">
    <script src="https://code.jquery.com/jquery-3.3.1.slim.min.js" integrity="sha384-q8i/X+965DzO0rT7abK41JStQIAqVgRVzpbzo5smXKp4YfRvH+8abtTE1Pi6jizo" crossorigin="anonymous"></script>
    <script src="https://cdnjs.cloudflare.com/ajax/libs/popper.js/1.14.0/umd/popper.min.js" integrity="sha384-cs/chFZiN24E4KMATLdqdvsezGxaGsi4hLGOzlXwp5UZB1LY//20VyM2taTB4QvJ" crossorigin="anonymous"></script>
    <script src="https://stackpath.bootstrapcdn.com/bootstrap/4.1.0/js/bootstrap.min.js" integrity="sha384-uefMccjFJAIv6A+rW+L4AHf99KvxDjWSu1z9VI8SKNVmz4sk7buKt/6v9KI65qnm" crossorigin="anonymous"></script>
    <link rel="stylesheet" type="text/css" href="css/style.css">
    <link href="https://fonts.googleapis.com/css?family=Rubik" rel="stylesheet">
</head>

<body>
<!-- Barre de navigation puis titre -->
<nav class="navbar navbar-expand-sm">
    <ul class="navbar-nav">
        <li class="nav-item">
            <a class="nav-link active" href="http://www.william-michaux.be">Démineur</a>
        </li>
        <li class="nav-item">
            <a class="nav-link" href="http://www.william-michaux.be/regles">Règles</a>
        </li>
        <li class="nav-item">
            <a class="nav-link disabled" href="#" data-toggle="popover" data-trigger="hover" data-content="Ça arrive bientôt !">Contact</a>
        </li>
    </ul>
</nav>

<h1>Démineur <span class="badge badge-secondary">V2</span></h1>


<span id="nbBombesRestantes" hidden></span>
<span id="nbClics" hidden="">0</span>
<div id="jeu">
    <div id="infoGrille">
        <!-- Bouton de difficulté -->
        <div class="container">
            <div class="btn-group">
                <button type="button" id="listDifficulte" class="btn btn-primary" onclick="gestionClickBtn()">Difficulté</button>
                <button type="button" class="btn btn-primary dropdown-toggle dropdown-toggle-split" data-toggle="dropdown">
                    <span class="caret"></span>
                </button>
                <div class="dropdown-menu">
                    <a class="dropdown-item" href="#" onclick="initCarte(10,10)">Débutant</a>
                    <a class="dropdown-item" href="#" onclick="initCarte(15,25)">Intermédiaire</a>
                    <a class="dropdown-item" href="#" onclick="initCarte(20,75)">Expert</a>
                </div>
            </div>
        </div>
        <!-- Chronomètre -->
        <div id="chrono">
            <span>00:00</span>
        </div>
    </div>
    <!-- Grille du démineur -->
    <div id="grilleDem"></div>
</div>

<!-- Modal qui s'ouvre au chargement de la page -->
<div class="modal fade" id="myModal">
    <div class="modal-dialog modal-lg">
        <div class="modal-content">
            <!-- Modal Header -->
            <div class="modal-header">
                <h4 class="modal-title">Comment jouer ?</h4>
                <button type="button" class="close" data-dismiss="modal">&times;</button>
            </div>
            <!-- Modal body -->
            <div class="modal-body">
                Pour commencer, il suffit de faire un <em>clic gauche</em> sur une case de la grille.<br/>Pour placer un drapeau faites un <em>clic droit</em> sur une case.
                <br/>Consultez les règles <a href="regles.html">ici</a>.
            </div>
        </div>
    </div>
</div>


</body>
<script src="js/chrono.js"></script>
<script src="js/demineur.js"></script>

</html>