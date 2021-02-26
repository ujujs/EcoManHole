const host = "http://localhost:3333";
        const form = document.querySelector("form")

        form.addEventListener("submit", async function (ev) {
            ev.preventDefault()
            const login = document.querySelector('[name="login"]').value
            const senha = document.querySelector('[name="senha"]').value
            const resposta = await buscarUsuariosLogados({
                login,
                senha
            })

            if (resposta.erro) {
                alert(resposta.erro)
            }
            else {
                alert("Logado com sucesso")
                window.location = "../bueiro/bueiro.html"
            }
        })
        async function buscarUsuariosLogados(dadosUsuario) {
            const configReq = { 
            method: "get",
            headers: { "Content-Type": "application/json" },
            

            // body: JSON.stringify(dadosUsuario)

        };
        console.log((dadosUsuario));

            const req = await fetch(host + "/login/" + dadosUsuario.login + "/" + dadosUsuario.senha)
            const res = await req.json();
            return res;
        }