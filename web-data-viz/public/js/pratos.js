function gerarEstrela(nota){
    let estrelas = ``
    for (let i = 0; i < 5; i++) {
        if(i<nota){
            estrelas += `★`
        }else{
            estrelas += `☆`
        }
    }
    return estrelas
}

function textoIngredientes(idPrato, ingredientes){
    let nomes = []
    for (let j = 0; j < ingredientes.length; j++) {
        if (ingredientes[j].idPrato == idPrato) {
            nomes.push(ingredientes[j].ingrediente)
        }
    }

    if (nomes.length == 0) {
        return `Ingredientes não informados`
    }
    return `Ingredientes: ` + nomes.join(`, `)
}

let listaPratos = document.getElementById("lista_pratos")

fetch("/pratos/listar")
    .then(function (resposta) {
        if (resposta.ok) {
            resposta.json().then(function (pratos) {
                if (pratos.length == 0) {
                    listaPratos.innerHTML = `Nenhum prato cadastrado ainda`
                    return
                }
                fetch("/pratos/ingredientes")
                    .then(function (resposta2) {
                        if (resposta2.ok) {
                            resposta2.json().then(function (ingredientes) {
                                let html = ``
                                for (let i = 0; i < pratos.length; i++) {
                                    html += `<article class="prato">
                                                <div class="prato-foto"></div>
                                                <div class="prato-info">
                                                    <div class="prato-topo">
                                                        <span class="chip">${pratos[i].categoria}</span>
                                                        <span class="estrelas">${gerarEstrela(pratos[i].nota)}</span>
                                                    </div>
                                                    <h3>${pratos[i].nome}</h3>
                                                    <p>Origem: ${pratos[i].origem}</p>
                                                    <div class="prato-dados">
                                                        <span>Dificuldade ${pratos[i].dificuldade}/5</span>
                                                        <span>${pratos[i].tempo} min</span>
                                                    </div>
                                                    <p class="prato-ingredientes">${textoIngredientes(pratos[i].id, ingredientes)}</p>
                                                </div>
                                            </article>`
                                }
                                listaPratos.innerHTML = html
                            })
                        } else {
                            listaPratos.innerHTML = `Não foi possível carregar os ingredientes dos pratos.`
                        }
                    })
                    .catch(function (erro) {
                        console.log(erro)
                    })
            })
        } else {
            listaPratos.innerHTML = `Não foi possível carregar os pratos.`
        }
    })
    .catch(function (erro) {
        console.log(erro)
    })