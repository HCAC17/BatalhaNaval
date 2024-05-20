var divBox = document.getElementById('box');

var linhasEcolunas = 10;

for(var i = 0; i < linhasEcolunas; i++){
    var coluna = document.createElement('div');
    coluna.setAttribute('class', 'colunas');
    divBox.appendChild(coluna);

    for(var j = 0; j < linhasEcolunas; j++){
        var linhas = document.createElement('div');

        linhas.setAttribute('class', 'linhas');
        coluna.appendChild(linhas);
        //console.log("porraaaaaaaaaa");
    }


}
