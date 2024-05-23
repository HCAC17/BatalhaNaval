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
    var posY = numeroAleatorio(10);
    var posX = numeroAleatorio(10);
    //cont++
    //console.log(cont);
    if(mapaJogadas[posX][posY] == 0){
        mapaJogadas[posX][posY] = 1;
        if(mapaIA[posX][posY] != 0){
            divBox.children[posX].children[posY].style.backgroundColor = 'green';
            console.log("Acertou!!!");
            jogarEmVolta(posY,posX);
            clearInterval(interval);
        } else {
            divBox.children[posX].children[posY].style.backgroundColor = 'red';
            console.log("Errou!!!");
        }
    } else {
        jogar();
    }
}

var intervalJogarVolta = null;

function jogarEmVolta(posY, posX){
    let direc = direcao();
    let map = [];
    let i = 0;
    let backUp = [];
    let ajuste = 0;
    let mapBackup = 0;
    
    console.log(posX, posY);
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
        if(mapaJogadas[posX + map[j][1]][posY] == 0 && mapaJogadas[posX][posY + map[j][1]] == 0){
            backUp[ajuste] = map[j]
            ajuste++
        }
        //console.log(backUp + " backup", posX + map[j][1], posY, ' ', posX, posY + map[j][1], mapaJogadas);
    }

    map = backUp;
    console.log(map);
    intervalJogarVolta = setInterval(function(){
        var flagAchou = false;

        if(map[i][0] == 'y'){
            //console.log(posX + map[i][1], posX + map[i][1] , posX + map[i][1])

            if(posX + map[i][1] + mapBackup >= 0 && posX + map[i][1] + mapBackup <= 9 && mapaJogadas[posX + map[i][1] + mapBackup][posY] == 0){
                mapaJogadas[posX + map[i][1] + mapBackup][posY] = 1;
                jogadagas++;
                if(mapaIA[posX + map[i][1] + mapBackup][posY] != 0){
                    divBox.children[posX + map[i][1] + mapBackup].children[posY].style.backgroundColor = 'green';
                    console.log("Acertou!!! x ");
                    flagAchou = true;
                } else {
                    divBox.children[posX + map[i][1] + mapBackup].children[posY].style.backgroundColor = 'red';
                    console.log("Errou!!!");
                    if(flagAchou){
                        mapBackup = 0;
                        map[i][1] *= -1;
                    }
                }
            }
            console.log(posX, posY + map[i][1] + mapBackup, i, map[i], mapBackup, flagAchou);

        }else{
            if(posY + map[i][1] + mapBackup >= 0 && posY + map[i][1] + mapBackup <= 9 && mapaJogadas[posX][posY + map[i][1] + mapBackup] == 0){
                mapaJogadas[posX][posY + map[i][1] + mapBackup] = 1;
                jogadagas++;
                if(mapaIA[posX][posY + map[i][1] + mapBackup] != 0){
                    divBox.children[posX].children[posY + map[i][1] + mapBackup].style.backgroundColor = 'green';
                    console.log("Acertou!!! y ");
                    flagAchou = true;
                } else {
                    divBox.children[posX].children[posY + map[i][1] + mapBackup].style.backgroundColor = 'red';
                    console.log("Errou!!!");
                    if(flagAchou){
                        mapBackup = 0;
                        map[i][1] *= -1;
                    }
                }
            }
            console.log(posX + map[i][1] + mapBackup, posY, i, map[i], mapBackup, flagAchou);
        }
        
        if(flagAchou){
            mapBackup += map[i][1];
        } else {
            i++
        }

        if(i >= map.length) clearInterval(intervalJogarVolta);
        
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