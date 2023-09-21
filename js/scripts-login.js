/*
  --------------------------------------------------------------------------------------
  Fazer o Login
  --------------------------------------------------------------------------------------
*/

function logar(message) {
    let userEmail = document.getElementById("email").value;
    let userSenha = document.getElementById("senha").value;
    console.log(userEmail, userSenha)
    postLogin(userEmail, userSenha)

}

/*
  --------------------------------------------------------------------------------------
  Função para colocar um item na lista do servidor via requisição POST
  --------------------------------------------------------------------------------------
*/

const postLogin = async (inputEmail, inputSenha) => {

  console.log(inputEmail, inputSenha)
  let url = "http://127.0.0.1:5001/login?email=" + inputEmail + "&senha=" + inputSenha;
  fetch(url, {
    method: 'get'
  })
    .then((response) => response.json())
    .then(json => {
        console.log(json.senha)
        console.log(json.senha_dig)
        console.log(json.mesage)
        if (json.mesage == 'Usuário encontrado') {
            if (json.senha === json.senha_dig) {
                sessionStorage.setItem("nomeLogin", json.nome)
                let a = sucesso();
            } else {
                alert("Senha inválida - login não efetuado - tente novamente")
            }
        }
        else {
            alert ("Login não efetuado - tente novamente")
            }
    })
    
    .catch(error => {
      console.error('Error:', error);
    });
}

function sucesso(){
    alert("Login efetuado com sucesso");
    window.location.href = `index.html`;
}

