const inputs = document.getElementsByTagName('input');
const form = document.getElementById('form');

const response = await fetch(
    `http://localhost:1234/usuarios?login=${inputs[0].value}&senha=${inputs[1].value}`
  );
  const usuario = await response.json();

  if (usuario.mensagem) {
    return alert(usuario.mensagem);
  }

  const responsesenha = await fetch(`http://localhost:1234/senhas/usuario?id_usuario=${usuario.id}`);
  const senha = await responsesenha.json();

  localStorage.setItem('usuarioEco', JSON.stringify(usuario));

  if (!senha.mensagem) {
    localStorage.setItem('unidadeComSenhaSeago', senha.id_unidade);
  };

  window.location.href = 'http://127.0.0.1:5500/EcoManHole/Cadastro-Pessoa/client/src/bueiro/bueiro.html';

const usuario = JSON.parse(localStorage.getItem('usuarioEco'));

if (usuario) {
  window.location.href = 'http://127.0.0.1:5500/EcoManHole/Cadastro-Pessoa/client/src/bueiro/bueiro.html';
}