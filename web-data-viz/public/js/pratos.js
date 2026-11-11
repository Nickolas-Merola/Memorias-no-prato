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

let listaPratos = document.getElementById("lista_pratos") 

fetch("/pratos/listar")
    .then(function (resposta) {
        if (resposta.ok) {
            resposta.json().then(function (pratos) {
               let html = ``
               if(pratos.length==0){
                    html = `Nenhum prato cadastrado ainda`
               } else{
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
                                </div>
                            </article>`
                }
               }
               listaPratos.innerHTML = html
            });
        } else {
            listaPratos.innerHTML = "Não foi possível carregar os pratos."
        }
    })
    .catch(function (erro) {
        console.log(erro);
    });

