/*
  --------------------------------------------------------------------------------------
  Funções do serviço externo VIA CEP
  --------------------------------------------------------------------------------------
*/

function limpa_formulário_cep() {
            //Limpa valores do formulário de cep.
            document.getElementById('rua').value=("");
            document.getElementById('bairro').value=("");
            document.getElementById('cidade').value=("");
            document.getElementById('uf').value=("");

    }

function meu_callback(conteudo) {
    if (!("erro" in conteudo)) {
        //Atualiza os campos com os valores.
        document.getElementById('rua').value=(conteudo.logradouro);
        document.getElementById('bairro').value=(conteudo.bairro);
        document.getElementById('cidade').value=(conteudo.localidade);
        document.getElementById('uf').value=(conteudo.uf);
    } //end if.
    else {
        //CEP não Encontrado.
        limpa_formulário_cep();
        alert("CEP não encontrado.");
    }
}

/*
  --------------------------------------------------------------------------------------
  Funções para buscar o endereço no serviço externo VIA CEP
  --------------------------------------------------------------------------------------
*/

function pesquisacep(valor) {
    //Nova variável "cep" somente com dígitos
    var cep = valor.replace(/\D/g, '');

    //Verifica se campo cep possui valor informado.
    if (cep != "") {

        //Expressão regular para validar o CEP.
        var validacep = /^[0-9]{8}$/;

        //Valida o formato do CEP.
        if (validacep.test(cep)) {

            //Preenche os campos com "..." enquanto consulta webservice.
            document.getElementById('rua').value = "...";
            document.getElementById('bairro').value = "...";
            document.getElementById('cidade').value = "...";
            document.getElementById('uf').value = "...";

            //Cria um elemento javascript.
            var script = document.createElement('script');

            //Sincroniza com o callback.
            script.src = 'https://viacep.com.br/ws/' + cep + '/json/?callback=meu_callback';

            //Insere script no documento e carrega o conteúdo.
            document.body.appendChild(script);

        } //end if.
        else {
            //cep é inválido.
            limpa_formulário_cep();
            alert("Formato de CEP inválido.");
        }
    } //end if.
    else {
        //cep sem valor, limpa formulário.
        limpa_formulário_cep();
    }
}

function cadastrar() {
    let inputNome = document.getElementById("nome").value;
    let inputSenha = document.getElementById("senha").value;
    let inputCpf = document.getElementById("cpf").value;
    let inputEmail = document.getElementById("email").value;
    let inputTelefone = document.getElementById("telefone").value;
    let inputCep = document.getElementById("cep").value;
    let inputEndereco = document.getElementById("rua").value;
    let inputNumero = document.getElementById("numero").value;
    let inputBairro = document.getElementById("bairro").value;
    let inputCidade = document.getElementById("cidade").value;
    let inputUf = document.getElementById("uf").value;

    if (inputNome === '') {
        alert("Nome não preenchido");
    } else if (inputSenha === '') {
        alert("Senha não preenchida");
    } else if (inputCpf === '') {
        alert("CPF não preenchido!");
    } else if (inputEmail === '') {
        alert("Email não preenchido!");
    } else {
        postUsuario(inputNome, inputSenha, inputCpf, inputEmail, inputTelefone,
            inputCep, inputEndereco, inputNumero, inputBairro, inputCidade, inputUf)
    }
}
/*
  --------------------------------------------------------------------------------------
  Função para colocar um item na lista do servidor via requisição POST
  --------------------------------------------------------------------------------------
*/

const postUsuario = async (inputNome, inputSenha, inputCpf, inputEmail,
                           inputTelefone, inputCep, inputEndereco, inputNumero,
                           inputBairro, inputCidade, inputUf) => {
  const formData = new FormData();
  formData.append('nome', inputNome);
  formData.append('senha', inputSenha);
  formData.append('cpf', inputCpf);
  formData.append('email', inputEmail);
  formData.append('telefone', inputTelefone);
  formData.append('cep', inputCep);
  formData.append('endereco', inputEndereco);
  formData.append('numero', inputNumero);
  formData.append('bairro', inputBairro);
  formData.append('cidade', inputCidade);
  formData.append('uf', inputUf );

  let url = 'http://127.0.0.1:5001/cadastrar_usuario';
  fetch(url, {
    method: 'post',
    body: formData
  })
    .then((response) => response.json())
    .then(json => {
        console.log(json.nome)
        if (json.nome === inputNome) {
            let a = sucesso();
        } else {
            alert ("Erro ao cadastrar usuario")
        }
    })
    .catch(error => {
      alert("Erro ao cadastrar Usuario");
      console.error('Error:', error);
    })
}


function sucesso(){
    alert("usuario cadastrado com sucesso");
    window.location.href = `login.html`;
}