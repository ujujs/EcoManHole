(async function() {
    const dadosBueiros = await fetch("http://localhost:3333/bueiro")
    const bueiros = await dadosBueiros.json()
    const elMain = document.querySelector('.bueiros')
    bueiros.forEach(bueiro => {
        const criarBotao = document.createElement('p');
        criarBotao.id = bueiro.id
        criarBotao.onclick = function() { clicou(bueiro.id) }
        criarBotao.textContent = bueiro.nome
        elMain.appendChild(criarBotao)
    });
}());

const botaoBuscar = document.getElementById("idBuscarSVG")

botaoBuscar.onclick = function() {
    const inputBuscar = document.getElementById("idBuscar")
    const divpai = document.querySelector('.bueiroLista');
    const divfilho = document.querySelector('.bueiros');
    if (inputBuscar.value != "") {
        if (divfilho.firstChild) {
            const div = document.createElement('div')
            divpai.removeChild(divfilho)
            div.className = "bueiros"
            divpai.appendChild(div);
            (async function() {
                const dadosBueiros = await fetch("http://localhost:3333/bueiro")
                const bueiros = await dadosBueiros.json()
                bueiros.forEach(bueiro => {
                    var teste = bueiro.nome
                    if (teste == inputBuscar.value) {
                        const criarBotao = document.createElement('p');
                        criarBotao.id = bueiro.id
                        criarBotao.onclick = function() { clicou(bueiro.id) }
                        criarBotao.textContent = bueiro.nome
                        div.appendChild(criarBotao)
                    }
                });
            }());
        } else {
            alert('Ops... Aconteceu algum erro, por favor recarregue a pagina!')
        }

    } else {
        if (!divfilho.firstChild) {
            load(divfilho)
        } else {
            if (divfilho.childNodes.length == 1) {
                const div = document.createElement('div')
                divpai.removeChild(divfilho)
                div.className = "bueiros"
                divpai.appendChild(div);
                load(div)
            }
        }
    }

    async function load(div) {
        const dadosBueiros = await fetch("http://localhost:3333/bueiro")
        const bueiros = await dadosBueiros.json()
        bueiros.forEach(bueiro => {
            const criarBotao = document.createElement('p');
            criarBotao.id = bueiro.id
            criarBotao.onclick = function() { clicou(bueiro.id) }
            criarBotao.textContent = bueiro.nome
            div.appendChild(criarBotao)
        });
    }

}

let parador = null

async function clicou(codigo) {
    clearInterval(parador)
    distSinais.textContent = ""
    const nomeBueiro = document.getElementById("nomeBueiro");
    const dadosBueiros = await fetch("http://localhost:3333/bueiro")
    const bueiros = await dadosBueiros.json()

    bueiros.forEach(bueiro => {
        var id = bueiro.id == codigo
        if (id) {
            nomeBueiro.textContent = bueiro.nome
        }
    });

    const callback = async() => {
        const distSinais = document.getElementById("distSinais");
        const dadosSinais = await fetch("http://localhost:3333/sinais/" + codigo)
        const sinais = await dadosSinais.json()
        if (!sinais[0]) return
        distSinais.textContent = sinais[0].sin_dist
    }
    callback()
    parador = setInterval(callback, 1000)
}