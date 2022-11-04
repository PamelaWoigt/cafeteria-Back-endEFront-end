import dbKnex from '../data/db_config.js'

//LISTAGEM -----------------------------------------------------------------------------------------
export const produtoListagem = async (req, res) => {
  try {
    // obtém da tabela de carros todos os registros
    const produtos = await dbKnex.select("*").from("produtos")
    
    res.status(200).json(produtos)
  } catch (error) {
    res.status(400).json({ id: 0, msg: "Erro: " + error.message })
  }
}

//INCLUSÃO ------------------------------------------------------------------------------------------
export const produtoInclusao = async (req, res) => {
  // atribui via desestruturação
  const { produto, categoria, quantidade, valor, foto } = req.body

  if (!produto || !categoria || !quantidade || !valor || !foto) {
    res.status(400).json({ id: 0, msg: "Erro... informe produto, categoria, quantidade e valor" })
    return
  }

  try {
    const novo = await dbKnex('produtos')
    .insert({ produto, categoria, quantidade, valor, foto })

    // novo[0] => retorna o id do registro inserido                     
    res.status(201).json({ id: novo[0], msg: "Ok! Produto inserido com sucesso" })
  } catch (error) {
    res.status(400).json({ id: 0, msg: "Erro: " + error.message })
  }
}

//ALTERACAO -------------------------------------------------------------------
export const produtoAlteracao = async (req, res) => {
  //  const id = req.params.id;
  const { id } = req.params;

  // atribui via desestruturação
  const {  produto, categoria, quantidade, valor, foto } = req.body

  if (!produto || !categoria || !quantidade || !valor || !foto) {
    res.status(400).json(
      {
        id: 0,
        msg: "Erro... informe produto, categoria, quantidade, valor e foto do propduto"
      })
    return
  }

  try {
    await dbKnex("produtos").where({ id })
      .update({ produto, categoria, quantidade, valor, foto })

    res.status(200).json({ id, msg: "Ok! Alterado com sucesso" })
  } catch (error) {
    res.status(400).json({ id: 0, msg: "Erro: " + error.message })
  }
}

// DELETAR ---------------------------------------------------------------------------

export const produtoDelete = async (req, res) => {
  const { id } = req.params;

  try {
    await dbKnex("produtos").del().where({ id })
    res.status(200).json({ id, msg: "Ok! Excluído com sucesso" })
  } catch (error) {
    res.status(400).json({ id: 0, msg: "Erro: " + error.message })
  }
}

//PESQUISAR -----------------------------------------------------------------------
export const produtoPesquisa = async (req, res) => {

  const { categoria } = req.params

  try {
    // obtém da tabela de carros todos os registros da marca indicada
    const produtos = await dbKnex("produtos").whereLike('categoria', categoria)
    res.status(200).json(produtos)
  } catch (error) {
    res.status(400).json({ id: 0, msg: "Erro: " + error.message })
  }
}