

let embarcacao = [
    [4,1,'p'],
    [3,3,'s'],
    [2,3,'d'],
    [1,2,'b'],  
]

function matrizMap(){
    let montarMatriz = [];
    for(let x = 0; x < 10; x++){
        montarMatriz[x] = [];
        for(let y = 0; y < 10; y++){
            montarMatriz[x][y] = 0;
        }
    }
    return montarMatriz;
}


function numeroAleatorio(max){
    let random = Math.floor(Math.random() * max)
    return random;
}
//console.log(numeroAleatorio(4));

function direcao(){
    let numeroDirecao = [];
    let direcao = numeroAleatorio(4);

    if(direcao === 0 || direcao === 2)
        numeroDirecao[1] = -1;
    else if(direcao === 1 || direcao === 3)
        numeroDirecao[1] = 1
    if(direcao === 0 || direcao === 3)
        numeroDirecao[0] = 'x';
    else if(direcao === 1 || direcao === 2)
        numeroDirecao[0] = 'y';

    return numeroDirecao;
}
//console.log(direcao());

function posicionarEmbarcacoes(embarcacao){
    var criou = false;
    var cont = 0 
    while(!criou){
        cont++
        console.log(cont);
        criou = true
        matriz = matrizMap();
        for(let i = 0; i < embarcacao.length; i++){
            for(let j = 0; j < embarcacao[i][1]; j++){
                var direcao1 = direcao()
                var x = numeroAleatorio(10);
                var y = numeroAleatorio(10);
        
                for(let k = 0; k < embarcacao[i][0]; k++ ){
                
                    if(direcao1[0] === 'x'){
                        x += direcao1[1]
                        if(x >= 0 && x <= 9 && matriz[x][y] === 0){
                            matriz[x][y] = embarcacao[i][2];
                        }else
                            criou = false
                    }else {
                        y += direcao1[1]
                        if(y >= 0 && x <= 9 && matriz[x][y] === 0){
                            matriz[x][y] = embarcacao[i][2];
                        }else
                            criou = false;
                    }
                }
            }
        }
        //console.log("bim bim bim");
    };
    return retorno = matriz;
}

var mapaIA = posicionarEmbarcacoes(embarcacao);
var mapaJogadas = matrizMap();
//var cont = 0;
function jogar(){
    var posX = numeroAleatorio(10);
    var posY = numeroAleatorio(10);
    //cont++
    //console.log(cont);
    if(mapaJogadas[posY][posX] == 0){
        mapaJogadas[posY][posX] = 1;
        if(mapaIA[posY][posX] != 0){
            console.log("Acertou!!!");
        } else {
            console.log("Errou!!!");
        }
    } else {
        jogar();
    }
}

function jogarEmVolta(posX, posY){
    var direcao = direcao()

    if(direcao[0] == 'y'){
        if(direcao[1] == 1){
            direcao = [['y',1],['x',-1],['y',-1],['x',1]]
        }else{
            direcao = [['y',-1],['x',1],['y',1],['x',-1]]
        }
    }else{
        if(direcao[1] == 1){
            direcao = [['x',1],['y',-1],['x',-1],['y',1]]
        }else{
            direcao = [['x',-1],['y',1],['x',1],['y',-1]]
        }
    }

    for(var i = 0; i < 4; i++){
        if(direcao[i][0] = 'y'){
            if(posY + direcao[i][1] >= 0 || posY + direcao[i][1] <= 9 && mapaJogadas[posY + direcao[i][1]][posX] == 0){
                
            }else{
                
            }
        }else{
            if(posX + direcao[i][1] >= 0 || posX + direcao[i][1] <= 9 && mapaJogadas[posY][posX + direcao[i][1]] == 0){
                
            }else{

            }
        }
    }

}

var interval = null;
var jogadagas = 0;

var starGame = function(){
    interval = setInterval(function(){
        //console.log("jogou")
        jogadagas++
       
        if(jogadagas === 100) {
            
            console.log(mapaJogadas)
            clearInterval(interval)
        }
        
        jogar();
    }, 100)
}

setTimeout(function(){
    console.log("star")
    starGame()
}, 1000);














/*
var cont = 0 ;
//posicionarEmbarcacoes(embarcacao);
var result = posicionarEmbarcacoes(embarcacao);
while(true){
    //cont++
    //console.log(cont)
    if(!result[1])
        result = posicionarEmbarcacoes(embarcacao);
    else{
        console.log(result[0])
        break;
    }
}
*/

