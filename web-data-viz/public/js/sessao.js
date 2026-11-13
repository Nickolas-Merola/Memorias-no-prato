function verificarAutorizacao() {
    if (sessionStorage.AUTORIZADO != "1") {
        window.location = "index.html";
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
        usuarioLogado.textContent = "Olá, " + nome;
    }
}