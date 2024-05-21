var divBox = document.getElementById('box');

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
            divBox.children[posY].children[posX].style.backgroundColor = 'green';
            console.log("Acertou!!!");
            jogarEmVolta(posX,posY);
            clearInterval(interval);
        } else {
            divBox.children[posY].children[posX].style.backgroundColor = 'red';
            console.log("Errou!!!");
        }
    } else {
        jogar();
    }
}

var intervalJogarVolta = null;

function jogarEmVolta(posX, posY){
    let direc = direcao();
    let map = [];
    let i = 0;
    let backUp = [];
    let ajuste = 0;
    //console.log(direc);
    if(direc[0] == 'y'){
        if(direc[1] == 1){
            map = [['y',1],['x',-1],['y',-1],['x',1]];
            //console.log('1', map);
        }else{
            map = [['y',-1],['x',1],['y',1],['x',-1]];
            //console.log('2', map);
        }
    }else{
        if(direc[1] == 1){
            map = [['x',1],['y',-1],['x',-1],['y',1]];
            //console.log('3', map);
        }else{
            map = [['x',-1],['y',1],['x',1],['y',-1]];
            //console.log('4', map);
        }
    }

    for(var j = 0; j < map.length; j++){
        if(mapaJogadas[posY + map[j][1]][posX] == 0 && mapaJogadas[posY][posX + map[j][1]] == 0){
            backUp[ajuste] = map[j]
            ajuste++
        }
        //console.log(backUp + " backup", posY + map[j][1], posX, ' ', posY, posX + map[j][1], mapaJogadas);
    }

    intervalJogarVolta = setInterval(function(){
        var falgAchou = false;

        if(map[i][0] == 'y'){
            //console.log(posY + map[i][1], posY + map[i][1] , posY + map[i][1])

            if(posY + map[i][1] >= 0 && posY + map[i][1] <= 9 && mapaJogadas[posY + map[i][1]][posX] == 0){
                mapaJogadas[posY][posX] = 1;
                jogadagas++
                if(mapaIA[posY + map[i][1]][posX] != 0){
                    divBox.children[posY + map[i][1]].children[posX].style.backgroundColor = 'green';
                    console.log("Acertou!!! y ");
                    falgAchou = true;
                } else {
                    divBox.children[posY + map[i][1]].children[posX].style.backgroundColor = 'red';
                    console.log("Errou!!!");
                }
            }
        }else{
            if(posX + map[i][1] >= 0 && posX + map[i][1] <= 9 && mapaJogadas[posY][posX + map[i][1]] == 0){
                mapaJogadas[posY][posX] = 1;
                jogadagas++
                if(mapaIA[posY][posX + map[i][1]] != 0){
                    divBox.children[posY].children[posX + map[i][1]].style.backgroundColor = 'green';
                    console.log("Acertou!!! x ");
                    falgAchou = true;
                } else {
                    divBox.children[posY].children[posX + map[i][1]].style.backgroundColor = 'red';
                    console.log("Errou!!!");
                }
            }
        }
            
        i++
        if(i >= 4) clearInterval(intervalJogarVolta);
        
    }, 1000)

  
        
    
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
    }, 1000)
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