/*

    Présentation du projet :

        Concepteurs du projet :

            -	Dubois Alexis âgé de 17 ans, élève en 5e année scolaire à l’I.P.E.T Nivelles dans l’option Informatique, à plus d’affinité dans la programmation et dans la conception logique du projet.

            -	Dessilly Nathan âgé de 18 ans, élève en 5e année scolaire à l’I.P.E.T Nivelles dans l’option Informatique, à plus d’affinité dans la conception logique du projet et dans la création du diagramme.

        Contexte :

            Nous devons réaliser un mini-jeu qui est basé sur un jeu de cartes traditionnel, le jeu se nomme le memory, nous allons créer le jeu pour notre TFA d’informatique en 5e années à l’IPET Nivelles.
            Pour cela nous allons concevoir un diagramme UML ou y sera toute notre analyse logique et créer le jeu sous le langage javascript.

        Principe du jeu :

            Le principe du jeu est assez simple, il faut mélanger les cartes et les déposer face cachée sur une table. Le but est de retourner deux cartes si celle-ci sont paires (qui ont le même dessin ou symbole), alors on peut les prendre, les mettre de côté et ça nous fait un point.
            Mais dans le cas contraire, si nous retournons deux cartes et que celle-ci ne sont pas paires alors faut les retournées et le jeu continue. Le jeu prend fin une fois toutes les paires retrouvées.
             

        Méthodologie de travail :

            On va se répartir de manière équitable le nombre de fonctions à faire, dans cette répartition chacun devra rendre la fonction en javascript et le diagramme UML qui va avec.
            Pour éviter que l’on travaille à deux sur la même fonction, on va se mettre d’accord sur les fonctions qui faudra créer et leur but derrière. Pour développer ensemble nous utiliserons un plugin sur “visual studio code” qui se nomme “Code Together” celui-ci nous permettra d’éviter toutes pertes de code s'il y a une sauvegarde de la part de l’autre concepteur sur le drive.
            Pour communiquer à distance on va utiliser discord, discord est un réseau social où l’on peut partager notre écran et faire des appels sur plusieurs heures.

        Agenda :

            Au début pour notre agenda, on comptait utiliser Google Agenda mais celui-ci nous cause trop de problèmes donc nous allons repartir sur un tableau où y sera noté toutes les taches avec la date de remise,
            nous mettrons aussi une colonne de statuts pour savoir si le travail est en cours ou pas.

*/

// Initialisation des variables
const titre = "MEMOSNEAK"
const logoValide = `<svg fill="#fff" xmlns="http://www.w3.org/2000/svg"  viewBox="0 0 24 24" width="120px" height="120px"><path d="M 20.292969 5.2929688 L 9 16.585938 L 4.7070312 12.292969 L 3.2929688 13.707031 L 9 19.414062 L 21.707031 6.7070312 L 20.292969 5.2929688 z"/></svg>`

let isGame = false;
let txt = ""
let taillegrille = 0
let nbrClique = 0
let premierCarte = [0, 0]
let deuxiemeCarte = [0, 0]
let tab_cartesRetourner = []
let tab_cartesValeur = []
let varIntPaireRetourner = 0
let nbVie = 200
let nbPaire = 0

/**
 * Créé le menu du jeu
 */
function f_creerMenu() {
    txt = ""
    txt += `<h1 class="titre">${titre}</h1><h3 class="texte">BIENVENUE DANS ${titre}</h3>`
    txt += `<div class="bouton"><button class="bouton-menu" onclick="f_difficulty()">JOUER</button><button class="bouton-menu" onclick="f_regleDuJeu()">REGLES</button></div>`
    document.title = `${titre} - MENU`
    document.getElementById("container").innerHTML = txt;
}

function f_difficulty() {
    document.title = `${titre} - DIFFICULTE`
    txt = ""
    txt += `<h2 class="sous-titre">CHOISIR UNE DIFFICULTE</h2>`
    txt += `<div class="bouton"><button class="bouton-menu" onclick="f_demarrer(16)">FACILE</button><button class="bouton-menu" onclick="f_demarrer(8)">MOYEN</button><button class="bouton-menu" onclick="f_demarrer(4)">DIFFICILE</button></div>`

    document.getElementById("container").innerHTML = txt;
} 

function f_regleDuJeu(){
    txt = ""
    txt += `<h2 class="sous-titre">REGLES DU JEU</h2>`
    txt += `<div class="regle"><p class="pRegle"><span>- Toutes les cartes sont étalées faces cachées sur la table de jeu.</span><span>- Le joueur retourne deux cartes. Si c'est la même image qui apparaît sur les deux cartes alors le joueur gagne les cartes et en retourne à nouveau deux.</span><span>- Si le joueur ne retourne pas deux même carte celui-ci perd une vie.</span><span>- La partie se termine une fois toutes les paires retrouvés ou si le joueurs à perdu toutes ses vies.</span></p></div>`
    txt += `<div class="bouton"><button class="bouton-menu" onclick="f_creerMenu()">RETOUR</button></div>`
    document.getElementById("container").innerHTML = txt;
}

function f_valeurImage(i, j) {
    image = ""
    switch (tab_cartesValeur[i][j]) {
        case 1:
            image = "chicago.jpg";
            break;
        case 2:
            image = "college-navy.jpg";
            break;
        case 3:
            image = "dark-mocha.jpg";
            break;
        case 4:
            image = "heritage.jpg";
            break;
        case 5:
            image = "mocha-reverse.jpg";
            break;
        case 6:
            image = "neutral-gray.jpg";
            break;
        case 7:
            image = "smoke-gray.jpg";
            break;
        case 8:
            image = "university.jpg";
            break;
    }
    return image
}

function f_affichage() {
    txt = ""
    if (nbVie > 0) {
        if (nbPaire != 0) {
            txt += `<div class="score"><span>${nbPaire} PAIRES A TROUVE</span><span>${nbVie} COUPS RESTANT</span></div>`
            for (let i = 0; i < taillegrille; i++) {
                txt += "<div class=\"" + "row\">"
                for (let j = 0; j < taillegrille; j++) {
                    if (tab_cartesRetourner[i][j] == 0) {
                        txt += "<div class=\"box\"> <button class=\"btn\" onclick=\"f_retournerCarte(" + i + ", " + j + ")\"><h2>?</h2></button> </div>";
                    }
                    else if (tab_cartesRetourner[i][j] == 1) {
                        image = f_valeurImage(i, j)
                        txt += "<div class=\"boite\"><div class=\"boiteImage\"><img src=\"./assets/images/" + image + "\" alt=\"" + image + "\"></div></div>";
                    }
                    else if (tab_cartesRetourner[i][j] == 2) {
                        txt += `<div class="boitevide">${logoValide}</div>` 
                    }
                    
                }
                txt += "</div>";
            }
            document.getElementById("container").innerHTML = txt;
        } else if (nbPaire <= 0) {
            f_finGame()
        }
    } else if (nbVie <= 0) {
        f_finGame()
    }
}

function f_finGame() {
    document.title = `${titre} - FIN DE PARTIE`
    txt = ""
    txt += `<h2 class="sous-titre">FIN DE PARTIE</h2>`

    if (nbVie === 0) {
        txt += `<div class="fin"><p class="texte">Vous avez perdu toutes vos vies</p><span class="texte">Nombre de pair restant : ${nbPaire}</span></div>`
    } else {
        txt += `<div class="fin"><p class="texte">Vous avez gagné</p><span class="texte">Nombre de vie restant : ${nbVie}</span></div>`
    }

    txt += `<div class="bouton"><button class="bouton-menu" onclick="f_creerMenu()">MENU</button></div>`
    document.getElementById("container").innerHTML = txt;
}


function f_demarrer(vie) {
    nbPaire = 8
    nbVie = vie
    taillegrille = 4;
    txt = "";
    if (taillegrille == 4) {

        tab_cartesRetourner = [[0, 0, 0, 0], [0, 0, 0, 0], [0, 0, 0, 0], [0, 0, 0, 0]]

    }
    if (taillegrille == 5) {

        tab_cartesRetourner = [[0, 0, 0, 0, 0], [0, 0, 0, 0, 0], [0, 0, 0, 0, 0], [0, 0, 0, 0, 0], [0, 0, 0, 0, 0]]
    }

    document.title = `${titre} - JEU`
    tab_cartesValeur = f_MelangeCartes();
    f_affichage();
}



function f_verifier() {
    if (tab_cartesValeur[premierCarte[0]][premierCarte[1]] == tab_cartesValeur[deuxiemeCarte[0]][deuxiemeCarte[1]]) {
        tab_cartesRetourner[premierCarte[0]][premierCarte[1]] = 2
        tab_cartesRetourner[deuxiemeCarte[0]][deuxiemeCarte[1]] = 2
        varIntPaireRetourner += 1
        nbPaire -= 1
    }
    else {
        tab_cartesRetourner[premierCarte[0]][premierCarte[1]] = 0
        tab_cartesRetourner[deuxiemeCarte[0]][deuxiemeCarte[1]] = 0
        nbVie -= 1
    }
    f_affichage();
    nbrClique = 0
}

function f_retournerCarte(i, j) {
    if (nbrClique == 0) {
        nbrClique += 1
        premierCarte[0] = i;
        premierCarte[1] = j;
        tab_cartesRetourner[i][j] = 1
        f_affichage()
        return
    }
    if (nbrClique == 1) {
        nbrClique += 1
        deuxiemeCarte[0] = i;
        deuxiemeCarte[1] = j;
        tab_cartesRetourner[i][j] = 1
        f_affichage()
        setTimeout(f_verifier, 1000);
    }
}


//Mélanges des cartes et nous les plaçons sur une grille 4x4 face cachées
function f_MelangeCartes() {
    if (taillegrille == 4) {
        tab_cartesValeur = [[1, 1, 2, 2], [3, 3, 4, 4], [5, 5, 6, 6], [7, 7, 8, 8]]
    }
    if (taillegrille == 5) {
        tab_cartesValeur = [[1, 1, 2, 2, 3], [3, 4, 4, 5, 5], [6, 6, 7, 7, 8], [8, 9, 9, 10, 10], [0, 0, 0, 0, 0]]
    }
    for (let i = 0; i < taillegrille; i++) {
        for (let j = 0; j < taillegrille; j++) {
            iAleatoir = Math.floor(Math.random() * 4)
            jAleatoir = Math.floor(Math.random() * 4)
            carteAttente = tab_cartesValeur[iAleatoir][jAleatoir]
            tab_cartesValeur[iAleatoir][jAleatoir] = tab_cartesValeur[i][j]
            tab_cartesValeur[i][j] = carteAttente
        }
    }
    return tab_cartesValeur
}

f_creerMenu()