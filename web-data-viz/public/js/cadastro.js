let formulario = document.getElementById("form_cadastro")
let mensagem = document.getElementById("mensagem")
let botaoCadastro = document.getElementById("botao_cadastrar")

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

function validarCadastro() {
    let campos = [
    {id:"nome",texto: "seu nome"},
    {id:"email",texto: "seu email"},
    {id:"senha",texto: "sua senha"},
    {id:"confirmacao",texto: "confirme a sua senha"}
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
    let nome = document.getElementById("nome").value.trim();
    let email = document.getElementById("email").value.trim();
    let senha = document.getElementById("senha").value;
    let confirmacao = document.getElementById("confirmacao").value;

    let temNumero = false
    let numeros = ["0","1","2","3","4","5","6","7","8","9"]
    let temEspecial = false
    let especial = ["@", "#", "$", "%", "&", "*", "!", "?", "-", "_", "+", "=", ".", ",", ";", ":"];

    for (let i = 0; i < numeros.length; i++) {
        if(senha.includes(numeros[i])){
            temNumero = true
        }
    }
    for (let i = 0; i < especial.length; i++) {
        if(senha.includes(especial[i])){
            temEspecial = true
        }
    }

    if (nome.length < 2) {
        mostrarErro("nome", "O nome precisa ter pelo menos 2 letras!");
        valido = false;
    }
    if(!email.includes("@")){
        mostrarErro("email", "O email precisa ter @!");
        valido = false;
    }

    let faltando = []

    if(senha.length<8){
        faltando.push("8 caracteres")
    }
    if(senha.toLowerCase()==senha){
        faltando.push("letra maiuscula")
    }
    if(senha.toUpperCase()==senha){
        faltando.push("letra minuscula")
    }
    if(temNumero==false){
        faltando.push("pelo menos 1 número")
    }
    if(temEspecial==false){
        faltando.push("pelo menos um caractere especial")
    }

    if (faltando.length > 0) {
    mostrarErro("senha", "A senha precisa ter: " + faltando.join(", ") + "."); //.join transforma tudo no array em uma string e separa eles pelo ("tal coisa")
    valido = false;
    }   

    if(confirmacao!=senha){
        mostrarErro("confirmacao", "A confirmação precisa ser igual a sua senha!");
        valido = false;
    }
    return valido;
}

// quando o usuario clicar em "criar conta" addEventListener
formulario.addEventListener("submit", function (evento) {
    evento.preventDefault() // cancela o envio padrão do formulário (que recarrega a página) para o JS validar e enviar com fetch
    if (!validarCadastro()) {
    return;
    }
}); 

