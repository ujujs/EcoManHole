(async function() {
    const dadosBueiros = await fetch("http://localhost:3333/bueiro")
    const bueiros = await dadosBueiros.json()
    const elMain = document.querySelector('.bueiroLista')                                        
        bueiros.forEach(bueiro => {
            const criarBotao = document.createElement('p'); 
            criarBotao.id = bueiro.id
            criarBotao.onclick = function() { clicou(bueiro.id) }
            criarBotao.textContent = bueiro.nome
            elMain.appendChild(criarBotao)
        });
}());

let parador = null

async function clicou(codigo){
    clearInterval(parador)
    distSinais.textContent = ""
    const nomeBueiro = document.getElementById("nomeBueiro");
    const dadosBueiros = await fetch("http://localhost:3333/bueiro")
    const bueiros = await dadosBueiros.json()
    
    bueiros.forEach(bueiro => {
        var  id = bueiro.id == codigo
        if(id) {
            nomeBueiro.textContent = bueiro.nome
        }
    });

    const callback = async () => {
        const distSinais = document.getElementById("distSinais");
        const dadosSinais = await fetch("http://localhost:3333/sinais/" + codigo)
        const sinais = await dadosSinais.json()        
        if(!sinais[0]) return
        distSinais.textContent = sinais[0].sin_dist
    }
    callback()
    parador = setInterval(callback, 1000)
}