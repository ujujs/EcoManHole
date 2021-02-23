import template from "./component.html";
import { HTMLXInput } from "../input/component";

export class HTMLXForm extends HTMLElement {
    private _root = this.attachShadow({ mode: "closed" });
    private _id?: number;
    private _elNome: HTMLXInput;
    private _elLatitude: HTMLXInput;
    private _elLongitude: HTMLXInput;
    private _elIdusuario: HTMLXInput;
    private _elBtSave: HTMLButtonElement;
    private _elBtDelete: HTMLButtonElement;

    constructor() {
        super();
        //
        this._root.innerHTML = template;
        this._elNome = <HTMLXInput>this._root.querySelector("#nome");
        this._elLatitude = <HTMLXInput>this._root.querySelector("#latitude");
        this._elLongitude = <HTMLXInput>this._root.querySelector("#longitude");
        this._elIdusuario = <HTMLXInput>this._root.querySelector("#idusuario");
        this._elBtSave = <HTMLButtonElement>this._root.querySelector(".save");
        this._elBtDelete = <HTMLButtonElement>this._root.querySelector(".delete");
        //
        this._elBtSave.addEventListener("click", ev => this._action(ev));
        this._elBtDelete.addEventListener("click", ev => this._excluir(ev));
    }

    load(data: { id?: number, nome: string, latitude: number, longitude: number, id_usuario: number}) {
        if (data.id) {
            this._id = data.id;
            this._elBtSave.innerText = "Alterar";
            this._elBtDelete.classList.add("show");
        }
        this._elNome.value = data.nome;
        this._elLatitude.value = data.latitude.toString();
        this._elLongitude.value = data.longitude.toString();
        this._elIdusuario.value = data.id_usuario.toString();

    }

    private _action(ev: MouseEvent) {
        if (this._id) {
            this._alterar();
        } else {
            this._adicionar();
        }
    }

    private async _adicionar() {
        this._elBtSave.setAttribute('disabled', "true");

        const data = {
            nome: this._elNome.value,
            latitude: this._elLatitude.value,
            longitude: this._elLongitude.value,
            id_usuario: this._elIdusuario.value
        };

        const configReq = {
            method: "post",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(data)
        };

        const req = await fetch("http://localhost:3333/bueiro", configReq);
        const res = await req.json();

        if (req.status == 200) {
            this._id = res.lastID;
            this._elBtSave.innerText = "Alterar";
            this._elBtDelete.classList.add("show");
        } else {
            alert(res.error);
        }

        this._elBtSave.removeAttribute('disabled');
    }

    private async _alterar() {
        this._elBtSave.setAttribute('disabled', "true");

        const data = {
            nome: this._elNome.value,
            latitude: this._elLatitude.value,
            longitude: this._elLongitude.value,
            id_usuario: this._elIdusuario.value
        };

        const configReq = {
            method: "put",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(data)
        };

        const req = await fetch("http://localhost:3333/bueiro/" + this._id, configReq);
        const res = await req.json();

        if (req.status == 200) {
            this._id = res.lastID;
            this._elBtSave.innerText = "Alterar";
            this._elBtDelete.classList.add("show");
        } else {
            alert(res.error);
        }

        this._elBtSave.removeAttribute('disabled');
    }

    private async _excluir(ev: MouseEvent) {
        if (!this._id) {
            this.remove();
            return;
        }
        console.log("excluiu?")

        this._elBtSave.setAttribute('disabled', "true");

        const configReq = { method: "delete" };
        const req = await fetch("http://localhost:3333/bueiro/" + this._id, configReq);
        const res = await req.json();

        if (req.status == 200) {
            this.remove();
        } else {
            alert(res.error);
        }

        this._elBtSave.removeAttribute('disabled');
    }
}

customElements.define("x-form", HTMLXForm);