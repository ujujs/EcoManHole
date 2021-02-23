const botaoBuscar = document.getElementById("idBuscarSVG")
const inputBuscar = document.getElementById("idBuscar")

var lat = -26.9624698
var log = -48.6499393

var mymap = L.map('mapid').setView([lat, log], 18);

async function buscarBueiro() {
    const dadosBueiros = await fetch("http://localhost:3333/bueiro")
    const bueiros = await dadosBueiros.json()
    bueiros[0].forEach(bueiro => {
        const novoBueiro = L.marker([bueiro.latitude, bueiro.longitude]).addTo(mymap)
        novoBueiro.bindPopup(`<b>${bueiro.nome}</b><br>ID ${bueiro.id}`).openPopup()
        console.log(bueiros)
        console.log("bueiro")
    });
};
buscarBueiro()

if(botaoBuscar){
    botaoBuscar.addEventListener("click", async () => {
        const nomeBueiro = inputBuscar.value
        if(!nomeBueiro){
            return
        }
        const dadosBueiros = await fetch(`http://localhost:3333/bueiro/${nomeBueiro}`)
        const bueiros = await dadosBueiros.json()
        if(!bueiros[0]){
            return
        }
        mymap.flyTo(new L.LatLng(bueiros[0].latitude, bueiros[0].longitude))
    })
}

L.tileLayer('https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token=pk.eyJ1IjoianVsaW9iMjAwMyIsImEiOiJja2t6c2J3Ymswam5xMnBwbHBsOHRyZGlyIn0.V4Wb2VEn4mMTdSSDpy__xQ', {
    attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
    maxZoom: 18,
    minZoom: 12,
    id: 'mapbox/streets-v11',
    tileSize: 512,
    zoomOffset: -1,
    accessToken: 'pk.eyJ1IjoianVsaW9iMjAwMyIsImEiOiJja2t6c2J3Ymswam5xMnBwbHBsOHRyZGlyIn0.V4Wb2VEn4mMTdSSDpy__xQ'
}).addTo(mymap);

function onMapClick(e) {
    alert("Voce clicou no mapa em " + e.latlng);
}

mymap.on('click', onMapClick);