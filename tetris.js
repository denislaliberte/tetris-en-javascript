/* ********** ********** ********** ********** ********** ********** ********** 
			imitation du jeu tetris en javascript
/* ********** ********** ********** ********** ********** ********** ********** */

/*
todo :
- faire un gros div game over
-position de départ
-tester la fonction qui fait les bloques arrêtes 
-tester la fonction qui retire les blocs lorsqu'il y a une ligne
-faire des forme complexe (l t o)
-valider les colonnes
-faire descendres les bloc s'il n'y en as plus en dessous
-ajuster les paramêtres
-clean up commentaire et console.log
*/

//constantes
var TOUCHE_GAUCHE = 37;
var TOUCHE_DROITE = 39;
var TOUCHE_HAUT = 38;
var TOUCHE_BAS = 40; 
var GAUCHE = -1;
var DROITE = 1;
var NOMBRE_LIGNE_MAX = 14;
var PLANCHER = 580;

var NOMBRE_COLONNE = 10;
var DIMENSION_BLOC = 40;
var LIMITTE_GAUCHE =0;
var LIMITTE_DROITE =LIMITTE_GAUCHE + (10 * DIMENSION_BLOC);
var NOMBRE_BLOC_LIGNE = 3;


//variables
var gameOver = false ;
var tableauBloc = new Array(10,10);

//je ne suis pas sur s'il faut initialiser un array.... !!!!!!!!!!!!!!?!?!?!?!
//mais ça bugais avant que je le fasse
for (var i = 0;i<NOMBRE_LIGNE_MAX+1;i++){
	tableauBloc[i]=new Array();
	for (var j = 0;j<NOMBRE_COLONNE;j++){
		tableauBloc[i][j]=0;
	}
}

var tableauPlancher = new Array();
var compteur=0;
var direction=0;
var rotation = false;
var idBloc = 0;
var blocActif = 0 ;
var acceleration = false;

window.onload = initialisation;
function initialisation(){
//initialisation du jeu et de ses variables
	LIMITTE_GAUCHE =  document.getElementById("jeu").offsetLeft;	
	console.log("Limitte gauche"+LIMITTE_GAUCHE);
	LIMITTE_DROITE =LIMITTE_GAUCHE + (10 * DIMENSION_BLOC);
 	for (var i=0;i<NOMBRE_COLONNE;i++){
		tableauPlancher[i]=0;
	}

	//initialisation du premier bloc
	blocActif = new Bloc(idBloc);
	idBloc++;

	//debut du jeu :
	tic();
}

/* ********** ********** ********** ********** ********** ********** ********** */
			//boucle qui gere le timming du jeu 
/* ********** ********** ********** ********** ********** ********** ********** */
function tic(){
//tic boucle evnementielle

	compteur++;
	if(!blocActif.actif && !gameOver){
	/*lorsqu'un bloc as fini de descendre on l'ajoute au tableau
	 de bloc, on verifie s'il y a des lignes qui se sont complete
	et on ajoute un nouveau bloc 
	*/
		//ajouter le bloc au tableau
		var colonne = blocActif.colonne;
		var ligne = tableauPlancher[colonne];
		console.log("tic() ligne");
		tableauBloc[ligne][colonne] = blocActif;


		// vérifier s'il y a des lignes qui se sont complété
		for(var i=0;i<10;i++){
			for(var j;j<10;j++){
				var retour = validerLigne(i,j,0);			
				//faire la même choses pour les colonnes
			}
		}
		blocActif = new Bloc(idBloc);
		idBloc++;
	}
	if(!gameOver){
	blocActif.tic();
	//rappel de la fonction a toutes les 30 milisecondes :
	setTimeout(tic,30);
	}
	else{
		console.log("gameover !!!!!")
	
		//faire une fonction qui affiche un div gameover pendand 
		//15 secondes puis qui rapelle initialisation
	}
}

function validerLigne(ligne,Colonne,compteur){
/*valide pour un bloc si les suivants sur la lignes sont de la même couleur
s'il y en as plus de 3 en ligne ils sont tous retiré. la fonction retourne le
nombre de bloc à retirer*/
	var id = tableauBloc[ligne][colonne].idCSS;
	var suivante = colone+1;
	if(tableauBloc[ligne][colonne].couleur == tableauBloc[ligne][suivante].couleur) {
	//si le bloc suivant est de la même couleur on avance et on compte
		compteur++;
		var nombreARetirer = validerLigne(ligne,suivante,compteur);
	}
	else if(compteur < NOMBRE_BLOC_LIGNE ){
	//si le bloc suivant n'est pas de la même couleur et qu'on en as compté
	//moins de 3 on retourne 0 bloc à retirer 
		return 0;
	}
	else{
	//si on as compté plus de trois bloc de même couleur on incrémente le compteur	
	//et on l'assigne aux blos à retirer
		nombreARetirer = compteur++;
	}
	if(nombreARetirer > 0){
		//on retire le div du html et l'objet du tableau
		$("#"+id).remove();
		tableauBloc[ligne].splice(colonne,1);
		nombreARetirer--;
		return nombreARetirer;
	}
	else{
	 return 0;
	}
}


/* ********** ********** ********** ********** ********** ********** ********** */
				//gestion des evenements
/* ********** ********** ********** ********** ********** ********** ********** */
window.onkeyup = relache;
window.onkeydown = touche;
function touche(evenement){
//	console.log("touche");	
	this.code = evenement.which;
	if(this.code == TOUCHE_GAUCHE) direction = GAUCHE ;
	else if(this.code == TOUCHE_DROITE) direction = DROITE;
	else if(this.code == TOUCHE_HAUT) rotation = true;
	else if(this.code == TOUCHE_BAS) acceleration = true;
}
function relache(){
	direction=0;
	if(acceleration)acceleration=false;
}
