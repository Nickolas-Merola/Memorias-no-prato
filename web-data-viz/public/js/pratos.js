fetch("/pratos/listar")
    .then(function (resposta) {
        if (resposta.ok) {
            resposta.json().then(function (pratos) {
                
            });
        } else {
            
        }
    })
    .catch(function (erro) {
        console.log(erro);
    });