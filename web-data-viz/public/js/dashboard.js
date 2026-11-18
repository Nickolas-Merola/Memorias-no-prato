let pratos = document.getElementById("kpi_pratos")
let nota = document.getElementById("kpi_nota")
let memorias = document.getElementById("kpi_memorias")
let pessoas = document.getElementById("kpi_pessoas")

fetch("/dashboard/kpis")
    .then(function (resposta) {
        if (resposta.ok) {
            resposta.json().then(function (kpis) {
                let totalPratos = kpis[0].totalPratos
                let notaMedia = String(kpis[0].notaMedia).replace(".", ",")
                let totalMemorias = kpis[0].totalMemorias
                let totalPessoas = kpis[0].totalPessoas

                pratos.textContent = totalPratos
                nota.textContent = notaMedia
                memorias.textContent = totalMemorias
                pessoas.textContent = totalPessoas
            })
        } else {
            console.log("Não foi possível carregar os KPIs.")
        }
    })
    .catch(function (erro) {
        console.log(erro)
    })

fetch("/dashboard/categorias")
    .then(function (resposta) {
        if (resposta.ok) {
            resposta.json().then(function (lista) {
                let nomes = []
                let totais = []
                for (let i = 0; i < lista.length; i++) {
                    nomes.push(lista[i].categoria)
                    totais.push(lista[i].total)
                }

                new Chart(document.getElementById("grafico_categorias"), {
                    type: "bar",
                    data: {
                        labels: nomes,
                        datasets: [{
                            data: totais,
                            backgroundColor: "#8C2F3F",
                            borderRadius: 4
                        }]
                    },
                    options: {
                        indexAxis: "y",
                        maintainAspectRatio: false,
                        plugins: {
                            legend: { display: false }
                        },
                        scales: {
                            x: {
                                beginAtZero: true,
                                ticks: { precision: 0 }
                            }
                        }
                    }
                })
            })
        } else {
            console.log("Não foi possível carregar o gráfico de categorias.")
        }
    })
    .catch(function (erro) {
        console.log(erro)
    })

fetch("/dashboard/ingredientes")
    .then(function (resposta) {
        if (resposta.ok) {
            resposta.json().then(function (lista) {
                let nomes = []
                let totais = []
                for (let i = 0; i < lista.length; i++) {
                    nomes.push(lista[i].ingrediente)
                    totais.push(lista[i].total)
                }

                new Chart(document.getElementById("grafico_ingredientes"), {
                    type: "bar",
                    data: {
                        labels: nomes,
                        datasets: [{
                            data: totais,
                            backgroundColor: "#8C2F3F",
                            borderRadius: 4
                        }]
                    },
                    options: {
                        indexAxis: "y",
                        maintainAspectRatio: false,
                        plugins: {
                            legend: { display: false }
                        },
                        scales: {
                            x: {
                                beginAtZero: true,
                                ticks: { precision: 0 }
                            }
                        }
                    }
                })
            })
        } else {
            console.log("Não foi possível carregar o gráfico de ingredientes.")
        }
    })
    .catch(function (erro) {
        console.log(erro)
    })

fetch("/dashboard/memoriasPessoas")
    .then(function (resposta) {
        if (resposta.ok) {
            resposta.json().then(function (lista) {
                let nomes = []
                let totais = []
                for (let i = 0; i < lista.length; i++) {
                    if (lista[i].pessoa == null) {
                        nomes.push("Sem pessoa")
                    } else {
                        nomes.push(lista[i].pessoa)
                    }
                    totais.push(lista[i].total)
                }

                new Chart(document.getElementById("grafico_memoriasPessoas"), {
                    type: "bar",
                    data: {
                        labels: nomes,
                        datasets: [{
                            data: totais,
                            backgroundColor: "#8C2F3F",
                            borderRadius: 4
                        }]
                    },
                    options: {
                        maintainAspectRatio: false,
                        plugins: {
                            legend: { display: false }
                        },
                        scales: {
                            y: {
                                beginAtZero: true,
                                ticks: { precision: 0 }
                            }
                        }
                    }
                })
            })
        } else {
            console.log("Não foi possível carregar o gráfico de pessoas.")
        }
    })
    .catch(function (erro) {
        console.log(erro)
    })

fetch("/dashboard/memorias")
    .then(function (resposta) {
        if (resposta.ok) {
            resposta.json().then(function (lista) {
                let anos = []
                let acumulado = []
                let soma = 0
                for (let i = 0; i < lista.length; i++) {
                    soma = soma + Number(lista[i].total)
                    anos.push(lista[i].ano)
                    acumulado.push(soma)
                }

                new Chart(document.getElementById("grafico_memorias"), {
                    type: "line",
                    data: {
                        labels: anos,
                        datasets: [{
                            data: acumulado,
                            borderColor: "#8C2F3F",
                            backgroundColor: "rgba(140, 47, 63, 0.1)",
                            fill: true,
                            stepped: true,
                            pointBackgroundColor: "#8C2F3F",
                            pointRadius: 4
                        }]
                    },
                    options: {
                        maintainAspectRatio: false,
                        plugins: {
                            legend: { display: false }
                        },
                        scales: {
                            y: {
                                beginAtZero: true,
                                ticks: { precision: 0 }
                            }
                        }
                    }
                })
            })
        } else {
            console.log("Não foi possível carregar o gráfico da trajetória.")
        }
    })
    .catch(function (erro) {
        console.log(erro)
    })