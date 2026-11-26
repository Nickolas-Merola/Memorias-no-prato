let tipo = document.getElementById("tipo")

function carregarTipos(){
    fetch("/ingredientes/listarTipos")
        .then(function (resposta){
            if(resposta.ok){
                resposta.json().then(function (lista) {
                    let html = `<option value="" disabled selected>Selecione</option>`
                    for (let i = 0; i < lista.length; i++) {
                        html+= `<option>${lista[i].tipo}</option>`
                    }
                    tipo.innerHTML = html
                })
            } else {
                tipo.innerHTML = `<option value="">Não foi possível carregar</option>`
            }
        })
        .catch(function (erro){
            console.log(erro)
            tipo.innerHTML = `<option value="">Não foi possível carregar</option>`
        })
}
carregarTipos()