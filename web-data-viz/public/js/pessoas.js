let listaPessoas = document.getElementById("lista_pessoas")

fetch("/pessoas/listar")
    .then(function (resposta){
        if (resposta.ok){
            resposta.json().then(function (pessoas){
                let html = ``
                for (let i = 0; i < pessoas.length; i++) {
                    let inicial = pessoas[i].apelido[0]
                    html += `
                    <article class="pessoa">
                        <span class="pessoa-inicial">${inicial}</span>
                        <div>
                            <h3>${pessoas[i].apelido}</h3>
                            <p class="pessoa-relacao">${pessoas[i].relacao}</p>
                        </div>
                    </article>
                    `
                }
                listaPessoas.innerHTML = html
            })
        } else{
            listaPessoas.innerHTML = "Não foi possível carregar as pessoas!"
        }
    })
    .catch(function (erro) {
        console.log(erro)
    });