const divProdutos = document.querySelector(".produtos")
const spanBadge = document.querySelector("span.position-absolute")

const myModal = new bootstrap.Modal(document.getElementById('carrinhoModal'))

const btCarrinho = document.querySelector("#btCarrinho")
const tabProdutos = document.querySelector('#tbProdutos')

const btFinalizar = document.querySelector('#btFinalizar')

let itemsComprados = []
let produtos

const carregaProdutos = async () => {

  // o servidor devolve um conjunto de informações da requisição
  const dados = await axios.get("http://localhost:3000/produtos")
//  console.log(dados)
//  console.log("Outra linha")

  // em .data estão os dados retornados pelo Web Service
  produtos = dados.data

  let resposta = ""

  for (const produto of produtos) {
    resposta += 
    `
    <div class="col-6 col-sm-4 col-md-3">
      <div class="card">
      <img src="${produto.foto}" class="card-img-top" alt="Produto" height="150px">
        <div class="card-body">
          <h5 class="card-title"> ${produto.produto}</h5>
          <p class="card-text">${produto.categoria}</p>
          <p class="card-text">${produto.quantidade}</p>
          <p class="card-text">R$: ${produto.valor.toLocaleString("pt-br", {minimumFractionDigits: 2})}</p>
          <button class="btn btn-secondary btAdicionar">Adicionar</button>
        </div>
      </div>    
    </div>  
    `
  }

  divProdutos.innerHTML = resposta

  itemsComprados = localStorage.getItem("produtos") ?
     localStorage.getItem("produtos").split(";") : []

  spanBadge.innerText = itemsComprados.length      
}

window.addEventListener("load", carregaProdutos)

divProdutos.addEventListener("click", e => {
  if (e.target.classList.contains("btAdicionar")) {
    // "captura" o elemento pai do botão que foi clicado
    const div = e.target.parentElement
    // console.log(div)
    const tagH5 = div.querySelector("h5")

    const idNome = tagH5.innerText
//    console.log(idNome)
    
    // separa a string em elementos de vetor pela ocorrência do "-"
    const partes = idNome.split("-") 

    const id = partes[0]

    itemsComprados.push(id)
    
    spanBadge.innerText = itemsComprados.length

    localStorage.setItem("produtos", itemsComprados.join(";"))
  }
})

btCarrinho.addEventListener("click", () => {
  myModal.show()

  // remove as linhas existentes na tabela (para evitar duplicação dos itens)
  for (let i = tabProdutos.rows.length - 1; i >= 1; i--) {
    tabProdutos.deleteRow(i)
  }

  let total = 0

  console.log(produtos)
  console.log(itemsComprados)

  for (const item of itemsComprados) {

    // filtra para obter apenas o produto inserido no carrinho
    const produto = produtos.filter(aux => aux.produto == item)[0]
    
    console.log(produto)

    // adiciona linhas na tabela 
    const linha = tabProdutos.insertRow(-1)
  
    // adiciona colunas a esta linha
    const col1 = linha.insertCell(0)
    const col2 = linha.insertCell(1)
    const col3 = linha.insertCell(2)
  
    // define o conteúdo de cada coluna
    col1.innerHTML = `<img src='${produto.foto}' alt='${produto.produto}' width='80'>`
    col2.innerText = produto.produto
    col3.innerText = produto.valor.toLocaleString('pt-br', {minimumFractionDigits: 2})
    col3.classList.add('text-end')
    total += produto?.valor
  }

  // adiciona linhas nna tabela 
  const linha = tabProdutos.insertRow(-1)
  
  // adiciona colunas a esta linha
  const col1 = linha.insertCell(0)
  const col2 = linha.insertCell(1)
  const col3 = linha.insertCell(2)

  // define o conteúdo de cada coluna
  col2.innerText = "Total R$: "
  col3.innerText = total.toLocaleString('pt-br', {minimumFractionDigits: 2})

  col2.classList.add('text-end')
  col3.classList.add('text-end')
})

btFinalizar.addEventListener('click', () => {
  // ocullta o modal
  myModal.hide()

  // remover de localStorage() a "chave" lanches
  localStorage.removeItem('produtos')

  // exibe mensagem
  alert('Obrigado! Seu pedido chegará em 45 min')

  // reccarrega os dados do web service e localStorage
  carregaProdutos()
})