const idPk = sessionStorage.getItem("idPk")
const nomeItem = sessionStorage.getItem("nomeItem")
const categoria = sessionStorage.getItem("categoria")
const valor = sessionStorage.getItem("valor")
const dataDesp = sessionStorage.getItem("dataDesp")
const comentario = sessionStorage.getItem("comentario")

console.log(idPk,nomeItem,categoria)


var ano = dataDesp.substr(6,4)
var mes = dataDesp.substr(3,2)
var dia = dataDesp.substr(0,2)
var anomesdia = ano + "-" + mes + "-" + dia

document.querySelector("[name='nomeItem']").value = nomeItem
document.querySelector("[name='categoria']").value = categoria
document.querySelector("[name='valor']").value = valor
document.querySelector("[name='dataDesp']").value = anomesdia
document.querySelector("[name='comentario']").value = comentario


function Alterar() {
  const idPk = sessionStorage.getItem("idPk")
  const nomeItem = document.getElementById("nomeItem").value
  const categoria = document.getElementById("categoria").value
  const valor = document.getElementById("valor").value
  const dataDesp = document.getElementById("dataDesp").value
  const comentario = document.getElementById("comentario").value

  var categoria_tab = ["Casa", "Pessoal", "Transporte", "Familia","Banco"]

  if (nomeItem === '') {
    alert("Escreva o nome da despesa!");
  } else if (categoria_tab.indexOf(categoria) === -1) {
    alert("Categoria inválida!");
  } else if (isNaN(valor)) {
    alert("Valor precisa ser númerico!");
  } else if (valor <= 0) {
    alert("Valor precisa ser maior do que zero!");
  } else if (dataDesp === '') {
    alert("A data precisa ser preenchida!");
  } else {
    alteraItem(idPk, nomeItem, categoria, valor, dataDesp, comentario)
    alert("Alterado!")
    window.location.href = "index.html"
  }
}

/*
  --------------------------------------------------------------------------------------
  Função para alterar um item da lista do servidor via requisição UPDATE
  --------------------------------------------------------------------------------------
*/
const alteraItem = async (id, nome, categoria, valor, data_despesa, comentario) => {

  const formData = new FormData();
  formData.append('id', id);
  formData.append('nome', nome);
  formData.append('categoria', categoria);
  formData.append('valor', valor);
  formData.append('data_despesa', data_despesa);
  formData.append('comentario', comentario);

  console.log('alterar chave:', id)

  let url = 'http://127.0.0.1:5000/alterar_despesa';
  fetch(url, {
    method: 'put',
    body: formData
  })
  .then((response)  => response.json())
  .catch((error) => {
      console.error('Error:', error);
    });
}

/*
  --------------------------------------------------------------------------------------
  Função para cancelar a alteração e voltar para a tela principal
  --------------------------------------------------------------------------------------
*/
function Cancelar() {
  window.location.href = "index.html"
}