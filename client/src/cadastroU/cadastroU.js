// const inputs = document.getElementsByTagName('input');
// const form = document.getElementById('form');

// console.log(inputs[6]);

// form.addEventListener('submit', async e => {
//     e.preventDefault();

//     const dadosFormulario = new FormData(form);


//     await fetch('http://localhost:3333/usuarios', {
//         method: 'post',
//         body: dadosFormulario,
//     }).then(async response => {
//         e.preventDefault();
//         return await response.text();
//     }).then(conteudo => {
//         e.preventDefault();

//         if (JSON.parse(conteudo).mensagem) {
//             return alert(JSON.parse(conteudo).mensagem);
//         }

//         window.location.href = 'http://127.0.0.1:5500/EcoManHole/Cadastro-Pessoa/client/src/login/login.html'
//     });

// });

// const usuario = JSON.parse(localStorage.getItem('usuarioEco'));

// if (usuario) {
//     window.location.href = 'http://127.0.0.1:5500/EcoManHole/Cadastro-Pessoa/client/src/bueiro/bueiro.html';
// }