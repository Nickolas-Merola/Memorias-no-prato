function verificarAutorizacao() {
    if (sessionStorage.AUTORIZADO != "1") {
        window.location = "index.html";
    }
}

function verificarLogin() {
    if (sessionStorage.NOME_USUARIO==undefined) {
        window.location = "entrar.html";
    }
}

function trocarEntrar() {
    let botaoEntrar = document.getElementById("botao_entrar");

    if (botaoEntrar == null) {
        return;
    }

    if (sessionStorage.ID_USUARIO != undefined) {
        botaoEntrar.innerHTML = "Sair";
        botaoEntrar.href = "index.html";
        botaoEntrar.onclick = sair;
    }
}
function sair() {
    sessionStorage.clear();
    window.location = "index.html";
}

function logado() {
    let usuarioLogado = document.getElementById("usuarioLogado");
    let nome = sessionStorage.NOME_USUARIO;

    if (usuarioLogado == null) {
        return;
    }

    if (nome) {
        usuarioLogado.textContent  = "Olá, " + nome;
    }
}