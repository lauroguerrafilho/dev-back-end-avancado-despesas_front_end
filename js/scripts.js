/*
  --------------------------------------------------------------------------------------
  Função para obter a lista existente do servidor via requisição GET
  --------------------------------------------------------------------------------------
*/
const getList = async () => {
  let url = 'http://127.0.0.1:5000/buscar_despesa';
  fetch(url, {
    method: 'get',
  })
    .then((response) => response.json())
    .then((data) => {
      data.despesas.forEach(item => insertList(item.id, item.nome, item.categoria, item.valor, item.data_despesa,item.comentario))
    })
    .catch(error => {
      console.error('Error:', error);
    })
}


/*
  --------------------------------------------------------------------------------------
  Chamada da função para carregamento inicial dos dados
  --------------------------------------------------------------------------------------
*/

console.log('1')

var nome = sessionStorage.getItem('nomeLogin');

if (nome) {
  console.log('2', nome);
  document.getElementById('login-mostrar').innerHTML = 'Usuario: ' + nome
  /*document.querySelector('login-mostrar').textContent = nome
  const elemento = document.getElementsByName('login-mstrar').textContent = 'Usuario: ' + nome;
  */
  getList();
} else {
  console.log('3')
}

/*
  --------------------------------------------------------------------------------------
  Fazer o Login
  --------------------------------------------------------------------------------------
*/

function login() {
  sessionStorage.setItem("nomeLogin", " ")
  window.location = "login.html";
}




/*
  --------------------------------------------------------------------------------------
  Função para remover um item da lista de acordo com o click no botão close
  --------------------------------------------------------------------------------------
*/
const removeElement = () => {
  let close = document.getElementsByClassName("close");
  // var table = document.getElementById('myTable');
  let i;
  for (i = 0; i < close.length; i++) {
    close[i].onclick = function () {
      let div = this.parentElement.parentElement;
      const idPk = div.getElementsByTagName('td')[0].innerHTML
      const nomeItem = div.getElementsByTagName('td')[1].innerHTML
      const Categoria = div.getElementsByTagName('td')[2].innerHTML
      const Valor = div.getElementsByTagName('td')[3].innerHTML
      const Data_despesa = div.getElementsByTagName('td')[4].innerHTML
      console.log(idPk)
      if (confirm("Tem certeza que quer deletar a despesa ?")) {
        div.remove()
        deleteItem(idPk,nomeItem, Categoria, Valor, Data_despesa)
        alert("Removido!")
      }
    }
  }
}

/*
  --------------------------------------------------------------------------------------
  Função para deletar um item da lista do servidor via requisição DELETE
  --------------------------------------------------------------------------------------
*/
const deleteItem = (idPk, nomeItem, Categoria, Valor, Data_despesa) => {
  console.log(idPk,Categoria, Valor, Data_despesa)
  let url = "http://127.0.0.1:5000/deletar_despesa?id=" + idPk + "&nome=" + nomeItem + "&categoria=" + Categoria + "&valor=" + Valor + "&data_despesa=" + Data_despesa;
  fetch(url, {
    method: 'delete'
  })
    .then((response) => response.json())
    .catch(error => {
      console.error('Error:', error);
    })
}

/*
  --------------------------------------------------------------------------------------
  Função para alterar um item da lista de acordo com o click no botão alterar
  --------------------------------------------------------------------------------------
*/
const alteraElement = () => {
  let altera = document.getElementsByClassName("altera");
  // var table = document.getElementById('myTable');
  let i;
  for (i = 0; i < altera.length; i++) {
    altera[i].onclick = function () {
      let div = this.parentElement.parentElement;
      const idPk = div.getElementsByTagName('td')[0].innerHTML
      const nomeItem = div.getElementsByTagName('td')[1].innerHTML
      const categoria = div.getElementsByTagName('td')[2].innerHTML
      const valor = div.getElementsByTagName('td')[3].innerHTML
      const dataDesp = div.getElementsByTagName('td')[4].innerHTML
      const comentario = div.getElementsByTagName('td')[5].innerHTML
      if (confirm("Tem certeza que quer alterar a despesa ?")) {
        sessionStorage.setItem("idPk", idPk)
        sessionStorage.setItem("nomeItem", nomeItem)
        sessionStorage.setItem("categoria", categoria)
        sessionStorage.setItem("valor", valor)
        sessionStorage.setItem("dataDesp", dataDesp)
        sessionStorage.setItem("comentario", comentario)
        alterar()


      }
    }
  }
}

/*
  --------------------------------------------------------------------------------------
  Alterar uma despesa
  --------------------------------------------------------------------------------------
*/
function alterar() {
  window.location.href = "alterar.html";
}


/*
  -----------__---------------------------------------------------------------------------
  Função adiciona um novo item com nome, categoria, valor, data e comentário
  ----------__----------------------------------------------------------------------------
*/

const newItemLog = () => {
  var nome = sessionStorage.getItem('nomeLogin');

  if (nome) {
    a = newItem()
  } else {
    alert("Você não está logado no sistema")
  }
}



const newItem = () => {
  let inputNome = document.getElementById("newNome").value;
  let inputCategoria = document.getElementById("newCategoria").value;
  let inputValor = document.getElementById("newValor").value;
  let inputDataDesp = document.getElementById("newDataDesp").value;
  let inputComentario = document.getElementById("newComentario").value;

  var categoria = ["Casa", "Pessoal", "Transporte", "Familia","Banco"]

  if (inputNome === '') {
    alert("Escreva o nome da despesa!");
  } else if (categoria.indexOf(inputCategoria) === -1) {
     alert("Categoria inválida!");
  } else if (isNaN(inputValor)) {
    alert("Valor precisa ser númerico!");
  } else if (inputValor <= 0){
    alert("Valor precisa ser maior do que zero!");
  } else if (inputDataDesp ==='') {
      alert("A data precisa ser preenchida!");
  } else {
    insertList(" ", inputNome, inputCategoria, inputValor, inputDataDesp, inputComentario)
    postItem(inputNome, inputCategoria, inputValor, inputDataDesp, inputComentario)
    alert("Item adicionado!")
  }
}

/*
  --------------------------------------------------------------------------------------
  Função para inserir items na lista apresentada
  --------------------------------------------------------------------------------------
*/
const insertList = (Id, Nome, Categoria, Valor, DataDesp, Comentario ) => {
  var ano = DataDesp.substr(0,4)
  var mes = DataDesp.substr(5,2)
  var dia = DataDesp.substr(8,2)
  var diamesano = dia + "/" + mes + "/" + ano
  var item = [Id, Nome, Categoria, Valor, diamesano, Comentario]
  var table = document.getElementById('myTable');
  var row = table.insertRow();

  for (var i = 0; i < item.length; i++) {
    var cel = row.insertCell(i);
    cel.textContent = item[i];
  }

  insertButtondel(row.insertCell(-1))
  insertButtonalt(row.insertCell(-1))
  document.getElementById("newNome").value = "";
  document.getElementById("newCategoria").value = "";
  document.getElementById("newValor").value = "";
  document.getElementById("newDataDesp").value = "";
  document.getElementById("newComentario").value = "";

  removeElement()
  alteraElement()
}

/*
  --------------------------------------------------------------------------------------
  Função para criar um botão close para cada item da lista
  --------------------------------------------------------------------------------------
*/
const insertButtondel = (parent) => {
  let span = document.createElement("span");
  let txt = document.createTextNode("\u00D7");
  span.className = "close";
  span.appendChild(txt);
  parent.appendChild(span);
}

/*
  --------------------------------------------------------------------------------------
  Função para criar um botão de alteração para cada item da lista
  --------------------------------------------------------------------------------------
*/
const insertButtonalt = (parent) => {
  let span = document.createElement("span");
  let txt = document.createTextNode("\u00AA");
  span.className = "altera";
  span.appendChild(txt);
  parent.appendChild(span);
}

/*
  --------------------------------------------------------------------------------------
  Função para colocar um item na lista do servidor via requisição POST
  --------------------------------------------------------------------------------------
*/
const postItem = async (inputNome, inputCategoria, inputValor, inputDataDesp, inputComentario) => {
  const formData = new FormData();
  formData.append('nome', inputNome);
  formData.append('categoria', inputCategoria);
  formData.append('valor', inputValor);
  formData.append('data_despesa', inputDataDesp);
  formData.append('comentario', inputComentario);

  let url = 'http://127.0.0.1:5000/incluir_despesa';
  fetch(url, {
    method: 'post',
    body: formData
  })
    .then((response) => response.json())
    .catch(error => {
      console.error('Error:', error);
    })
}
