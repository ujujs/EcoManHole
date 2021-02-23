import "./index.css";
import "./webcomponents/input/component";
import "./webcomponents/from/component";
import { HTMLXForm } from "./webcomponents/from/component";

const elMain = <HTMLElement>document.querySelector('#content');
const elBtNewForm = <HTMLButtonElement>document.querySelector('.new-form');

elBtNewForm.addEventListener('click', el => {
    const form = <HTMLXForm>document.createElement("x-form");
    // elMain.insertBefore(form, elBtNewForm.nextElementSibling);
    elMain.insertBefore(form, elMain.childNodes[0]);
});

async function listarBueiro() {
    // console.log("estou listando bueiro")
    const req = await fetch("http://localhost:3333/bueiro");
    const res = await req.json();
    // console.log(res)
    // console.log(JSON.stringify(res))
    res.forEach((bueiro: { nome: string, latitude: number, longitude: number, id_usuario: number}) => {
        // console.log("entrei no forEach");
        const el = <HTMLXForm>document.createElement("x-form");
        el.load(bueiro);
        elMain.appendChild(el);
    });
}

listarBueiro();