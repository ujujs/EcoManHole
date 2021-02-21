import "./index.css";
import "./webcomponents/input/component";
import "./webcomponents/from/component";
import { HTMLXForm } from "./webcomponents/from/component";

const elMain = <HTMLElement>document.querySelector('main');
const elBtNewForm = <HTMLButtonElement>document.querySelector('.new-form');

elBtNewForm.addEventListener('click', el => {
    const form = <HTMLXForm>document.createElement("x-form");
    elMain.insertBefore(form, elBtNewForm.nextElementSibling);
});

async function listarBueiro() {
    console.log("estou funcionando :)")
    const req = await fetch("http://localhost:3333/bueiro");
    const res = await req.json();
    console.log(res)
    res[0].forEach((bueiro: { nome: string, latitude: number, longitude: number }) => {
        const el = <HTMLXForm>document.createElement("x-form");
        el.load(bueiro);
        elMain.appendChild(el);
    });
}

listarBueiro();