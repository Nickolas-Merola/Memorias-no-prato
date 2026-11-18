let listaMemorias = document.getElementById("lista_memorias") 

fetch("/memorias/listar")
    .then(function (resposta) {
        if (resposta.ok) {
            resposta.json().then(function (memorias) {
               let html = ``
               if(memorias.length==0){
                    html = `Nenhuma memória cadastrada ainda!`
               } else{
                for (let i = 0; i < memorias.length; i++) {
                    html += `<article class="memoria">
                                <span class="memoria-ano">${memorias[i].ano}</span>
                                <h3>${memorias[i].titulo}</h3>
                                <p class="memoria-descricao">${memorias[i].descricao}</p>
                                <span class="chip">${memorias[i].prato}</span>
                            </article>`
                }
               }
               listaMemorias.innerHTML = html
            });
        } else {
            listaMemorias.innerHTML = "Não foi possível carregar as memorias."
        }
    })
    .catch(function (erro) {
        console.log(erro)
    });

