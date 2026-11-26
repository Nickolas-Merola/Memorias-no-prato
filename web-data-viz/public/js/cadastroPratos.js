let formulario = document.getElementById("form_prato")
let mensagem = document.getElementById("mensagem")
let botaoCadastrar = document.getElementById("botao_cadastrar")
let todosIngredientes = []

carregarSelect("categoria", "/pratos/categorias", "nome", "Selecione")
carregarSelect("origem", "/pratos/origens", "nome", "Selecione")
carregarSelect("pessoa", "/pessoas/listar", "apelido", "Nenhuma pessoa")

function carregarSelect(idSelect, url, campoTexto, primeiraOpcao) {
    let select = document.getElementById(idSelect)

    fetch(url)
        .then(function (resposta) {
            if (resposta.ok) {
                resposta.json().then(function (lista) {
                    let html = `<option value="">${primeiraOpcao}</option>`
                    for (let i = 0; i < lista.length; i++) {
                        html += `<option value="${lista[i].id}">${lista[i][campoTexto]}</option>`
                    }
                    select.innerHTML = html
                })
            } else {
                select.innerHTML = `<option value="">Não foi possível carregar</option>`
            }
        })
        .catch(function (erro) {
            console.log(erro)
            select.innerHTML = `<option value="">Não foi possível carregar</option>`
        })
}

carregarIngredientes()

function carregarIngredientes() {
    let listaIngredientes = document.getElementById("lista_ingredientes")

    fetch("/pratos/todosIngredientes")
        .then(function (resposta) {
            if (resposta.ok) {
                resposta.json().then(function (lista) {
                    todosIngredientes = lista
                    let html = ``
                    for (let i = 0; i < lista.length; i++) {
                        html += `<label>
                                    <input type="checkbox" id="ingrediente_${lista[i].id}" value="${lista[i].id}">
                                    ${lista[i].nome}
                                 </label>`
                    }
                    listaIngredientes.innerHTML = html
                })
            } else {
                listaIngredientes.innerHTML = "Não foi possível carregar os ingredientes."
            }
        })
        .catch(function (erro) {
            console.log(erro)
            listaIngredientes.innerHTML = "Não foi possível carregar os ingredientes."
        })
}

function mostrarErro(idCampo, texto) {
    let spanErro = document.getElementById("erro_" + idCampo)
    spanErro.textContent = texto

    let input = document.getElementById(idCampo)
    if (texto == "") {
        input.classList.remove("invalido")
    } else {
        input.classList.add("invalido")
    }
}

function mostrarMensagem(texto, tipo) {
    mensagem.textContent = texto
    mensagem.className = "mensagem " + tipo
}

// Devolve um vetor com os ids dos ingredientes marcados. Ex.: [3, 7]
function ingredientesMarcados() {
    let marcados = []
    for (let i = 0; i < todosIngredientes.length; i++) {
        let checkbox = document.getElementById("ingrediente_" + todosIngredientes[i].id)
        if (checkbox.checked) {
            marcados.push(todosIngredientes[i].id)
        }
    }
    return marcados
}

function validarCadastroPrato() {
    let campos = [
        { id: "nome", texto: "Preencha o nome do prato." },
        { id: "categoria", texto: "Escolha uma categoria." },
        { id: "origem", texto: "Escolha uma origem." },
        { id: "dificuldade", texto: "Escolha a dificuldade." },
        { id: "nota", texto: "Escolha a nota." },
        { id: "tempo", texto: "Preencha o tempo de preparo." }
    ]
    let valido = true

    for (let i = 0; i < campos.length; i++) {
        let valor = document.getElementById(campos[i].id).value.trim()
        if (valor == "") {
            mostrarErro(campos[i].id, campos[i].texto)
            valido = false
        } else {
            mostrarErro(campos[i].id, "")
        }
    }

    let tempo = document.getElementById("tempo").value
    if (tempo != "" && Number(tempo) < 1) {
        mostrarErro("tempo", "O tempo precisa ser maior que zero.")
        valido = false
    }

    return valido
}

formulario.addEventListener("submit", function (evento) {
    evento.preventDefault()
    if (!validarCadastroPrato()) {
        return
    }
    botaoCadastrar.disabled = true

    fetch("/pratos/cadastrar", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
            nomeServer: document.getElementById("nome").value.trim(),
            categoriaServer: document.getElementById("categoria").value,
            origemServer: document.getElementById("origem").value,
            pessoaServer: document.getElementById("pessoa").value,
            dificuldadeServer: document.getElementById("dificuldade").value,
            tempoServer: document.getElementById("tempo").value,
            notaServer: document.getElementById("nota").value,
            idUsuarioServer: sessionStorage.ID_USUARIO,
            ingredientesServer: ingredientesMarcados()
        })
    })
        .then(function (resposta) {
            if (resposta.ok) {
                mostrarMensagem("Prato cadastrado com sucesso!", "sucesso")
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