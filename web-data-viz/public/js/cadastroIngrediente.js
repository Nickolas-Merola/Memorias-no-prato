let tipo = document.getElementById("tipo")
let botaoCadastrar = document.getElementById("botao_cadastrar")
let formIngrediente = document.getElementById("form_ingrediente")
let mensagem = document.getElementById("mensagem")

function mostrarMensagem(texto, tipo) {
    mensagem.textContent = texto
    mensagem.className = "mensagem " + tipo
}


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

formIngrediente.addEventListener("submit", function (evento) {
    evento.preventDefault()
    botaoCadastrar.disabled = true

    fetch("/ingredientes/cadastrar", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
            nomeServer: document.getElementById("nome").value.trim(),
            tipoServer: document.getElementById("tipo").value.trim(),
            idUsuarioServer: sessionStorage.ID_USUARIO,
        })
    })
        .then(function (resposta) {
            if (resposta.ok) {
                mostrarMensagem("Ingrediente cadastrado com sucesso!", "sucesso")
                setTimeout(function () {
                    window.location.reload()
                }, 1000)
            } else {
                resposta.text().then(function (texto) {
                    mostrarMensagem(texto, "falha")
                    botaoCadastrar.disabled = false
                })
            }
        })
        .catch(function (erro) {
            console.log("Erro:", erro)
            mostrarMensagem("Não foi possível conectar ao servidor.", "falha")
            botaoCadastrar.disabled = false
        })
})

carregarTipos()