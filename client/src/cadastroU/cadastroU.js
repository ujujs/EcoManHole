const host = "http://localhost:3333";
        const form = document.querySelector("form")

        
        form.addEventListener("submit", async function (ev) {
            ev.preventDefault()
            const login = document.querySelector('[name="login"]').value
            const senha = document.querySelector('[name="senha"]').value
            const resposta = await adicionarUsuario({
                login,
                senha
            })

            if (resposta.erro) {
                alert(resposta.erro)
            }
            else {
                alert("Cadastrado com sucesso")
                // window.location = "../bueiro/bueiro.html"
            }
        })
        async function buscarUsuariosLogados() {
            const configReq = { method: "get" };
            const req = await fetch(host + "/usuario")
            const res = await req.json();
            return res;
        }

        async function adicionarUsuario(dadosUsuario) {
            const configReq = {
                method: "post",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(dadosUsuario)
            };
            console.log((dadosUsuario));
            
            const req = await fetch(host + "/usuario", configReq);
            const res = await req.json();
            return res;
        }

        async function buscarUsuario(id) {
            const configReq = { method: "get" };
            const req = await fetch(host + "/usuario/" + id)
            const res = await req.json();
            return res;
        }