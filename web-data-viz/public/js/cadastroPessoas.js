let formulario = document.getElementById("form_pessoa")
let mensagem = document.getElementById("mensagem")
let botaoCadastrar = document.getElementById("botao_cadastrar")

function mostrarErro(idCampo, texto){
    let spanErro = document.getElementById("erro_"+idCampo)
    spanErro.textContent = texto

    let input = document.getElementById(idCampo)
    if(texto==""){
        input.classList.remove("invalido");
    }else{
        input.classList.add("invalido");
    }
}

function mostrarMensagem(texto, tipo) {
    mensagem.textContent = texto;
    mensagem.className = "mensagem " + tipo;
}

function validarCadastroPessoa(){
    let campos = [
        {id:"apelido",texto:"seu apelido"},
        {id:"relacao",texto:"sua relação"}
    ]
    let valido = true;

    for (let i = 0; i < campos.length; i++) {
        let valor = document.getElementById(campos[i].id).value.trim()
        //O campos[i].id é só o texto "apelido", e um texto não tem .value. O resultado é undefined, que nunca é igual a "", então a validação nunca acusa um campo vazio.
        if(valor==""){
            mostrarErro(campos[i].id,`Preencha ${campos[i].texto}.`)
            valido = false
        }else{
            mostrarErro(campos[i].id,"")
        }
    }
    return valido
}

formulario.addEventListener("submit",function (evento){
    evento.preventDefault()
    if(!validarCadastroPessoa()){
        return;
    }
    botaoCadastrar.disabled = true

        fetch("/pessoas/cadastrar", {
            method: "POST",
            headers: {"Content-Type": "application/json"},
            body: JSON.stringify({
                apelidoServer:document.getElementById("apelido").value.trim(),
                relacaoServer: document.getElementById("relacao").value.trim(),
                idUsuarioServer: sessionStorage.ID_USUARIO
            })
        })
        .then(function (resposta){
            if (resposta.ok){
                mostrarMensagem("Pessoa cadastrada com sucesso!","sucesso")
                setTimeout(function(){
                    window.location.reload()
                }, 1000)
            }else{
                resposta.text().then(function (texto) {
                    mostrarMensagem(texto,"falha")
                    botaoCadastrar.disabled = false
                })
            }
        })
        .catch(function (erro){
            console.log("Erro:",erro);
            mostrarMensagem("Não foi possível conectar ao servidor.", "falha")
            botaoCadastrar.disabled = false
        })
})