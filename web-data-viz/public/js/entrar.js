let formulario = document.getElementById("form_entrar")
let mensagem = document.getElementById("mensagem")
let botaoEntrar = document.getElementById("botao_entrar")

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

function validarLogin(){
    let campos = [
        {id:"email",texto:"seu email"},
        {id:"senha",texto:"sua senha"}
    ]
    let valido = true;

    for (let i = 0; i<campos.length; i++) {
        let valor = document.getElementById(campos[i].id).value
        if(valor==""){
            mostrarErro(campos[i].id,"Preencha " + campos[i].texto + ".")
            valido=false
        }else{
            mostrarErro(campos[i].id,"")
        }
    }

    if (!valido) {
        return false;
    }
    
    let email = document.getElementById("email").value.trim();

    if(!email.includes("@")){
        mostrarErro("email", "O email precisa ter @!");
        valido = false;
    }
    return valido;
}

formulario.addEventListener("submit", function (evento) {
    evento.preventDefault() // cancela o envio padrão do formulário (que recarrega a página) para o JS validar e enviar com fetch
    if (!validarLogin()) {
        return;
    }
    botaoEntrar.disabled = true

        fetch("/usuarios/autenticar", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ 
                emailServer: document.getElementById("email").value.trim(),
                senhaServer: document.getElementById("senha").value
            })
        })
        .then(function (resposta) {
            if (resposta.ok) {
                resposta.json().then(function (usuario) {
                    sessionStorage.ID_USUARIO = usuario.id;
                    sessionStorage.NOME_USUARIO = usuario.nome;
                    sessionStorage.AUTORIZADO = usuario.autorizado;
                    mostrarMensagem("Olá "+usuario.nome+" o seu login foi um sucesso!","sucesso")
                    setTimeout(function(){
                        if (usuario.autorizado == 1) {
                            window.location = "indexlogin.html";
                        } else {
                            window.location = "dashboard.html";
                        }
                    }, 1000)
                });
            } else {
                resposta.text().then(function (texto) {
                    mostrarMensagem(texto, "falha");
                    botaoEntrar.disabled = false;
                });
            }
        })
        .catch(function (erro) {
            console.log("Erro:", erro);
            mostrarMensagem("Não foi possível conectar ao servidor.", "falha")
            botaoEntrar.disabled = false
        });
}); 