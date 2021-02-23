(async function() {
    const dadosBueiros = await fetch("http://localhost:3333/bueiro")
    const bueiros = await dadosBueiros.json()
    const elMain = document.querySelector('.bueiroLista')                                        
        bueiros[0].forEach(bueiro => {
            const criarBotao = document.createElement('p'); 
            criarBotao.id = bueiro.id
            criarBotao.onclick = function() { clicou(bueiro.id) }
            criarBotao.textContent = bueiro.nome
            elMain.appendChild(criarBotao)
        });
}());

async function clicou(codigo){
    const nomeBueiro = document.getElementById("nomeBueiro");
    const dadosBueiros = await fetch("http://localhost:3333/bueiro")
    const bueiros = await dadosBueiros.json()
   
    bueiros[0].forEach(bueiro => {
        var  id= bueiro.id == codigo
        if(id) {
            nomeBueiro.textContent = bueiro.nome
        }
    });
}