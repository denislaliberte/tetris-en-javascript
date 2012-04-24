/* ********** ********** ********** ********** ********** ********** ********** */  
                        //objet structure
/* ********** ********** ********** ********** ********** ********** ********** */

function Structure1(jeu){
    
    this.direction=0;
    this.actif=true;
    this.acceleration = false;
    this.rotation=false;
    this.jeu = jeu;
    this.blocs = new Array(4);
    this.x=0;
    this.y=0;
    this.tableauCoordoneX= [0,0,1,1];
    this.tableauCoordonneY=[0,1,0,1];
    this.indiceStyle =0;
    this.couleur =  Math.round((Math.random() * 3) );
    for(i=0;i<4;i++){
        this.blocs[i] = this.jeu.nouveauBloc(this);
        console.log(this.blocs[i].id)
    }
    
    this.tic = function(){
        if(this.rotation){
            this.rotationStructure();
        }
        for (bloc in this.blocs){
            this.blocs[bloc].tic();
        } 
    }
    
    this.positionnement=function(indice){
        this.x=this.blocs[0].div.offsetLeft;
        this.y=this.blocs[0].div.offsetTop;
        for(i=0;i<4;i++){ 
            this.blocs[i].style.left =this.x+(this.tableauCoordoneX[i] * DIMENSION_BLOC);  
            this.blocs[i].style.left =this.x+(this.tableauCoordoneX[i] * DIMENSION_BLOC);
        }
    }
    this.rotationStructure = function(){
        console.log("rotation");
        this.positionnement(0);
    }
}

function Structure2(jeu){
    Structure1.call(this,jeu);
    
}