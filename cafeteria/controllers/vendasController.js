import dbKnex from '../data/db_config.js'

//LISTAGEM -----------------------------------------------------------------------------------------
export const vendasListagem = async (req, res) => {
  try {
    // obtém da tabela de vendas registradas
    const vendas = await dbKnex.select("*").from("vendas")
    
    res.status(200).json(vendas)
  } catch (error) {
    res.status(400).json({ id: 0, msg: "Erro: " + error.message })
  }
}

//INCLUSÃO ------------------------------------------------------------------------------------------
export const vendasInclusao = async (req, res) => {
  // atribui via desestruturação
  const { cliente, numeroItens, data, valor } = req.body

  if (!cliente || !numeroItens || !data || !valor) {
    res.status(400).json({ id: 0, msg: "Erro... informe cliente, numeroItens, data e valor" })
    return
  }

  try {
    const novaVenda = await dbKnex('vendas')
    .insert({ cliente, numeroItens, data, valor })

    // novo[0] => retorna o id do registro inserido                     
    res.status(201).json({ id: novaVenda[0], msg: "Ok! Venda inserido com sucesso" })
  } catch (error) {
    res.status(400).json({ id: 0, msg: "Erro: " + error.message })
  }
}

//ALTERACAO -------------------------------------------------------------------
export const vendasAlteracao = async (req, res) => {
  //  const id = req.params.id;
  const { id } = req.params;

  // atribui via desestruturação
  const {  cliente, numeroItens, data, valor } = req.body

  if (!cliente || !numeroItens || !data || !valor) {
    res.status(400).json(
      {
        id: 0,
        msg: "Erro... informe cliente, numeroItens, data, valor da venda"
      })
    return
  }

  try {
    await dbKnex("vendas").where({ id })
      .update({ cliente, numeroItens, data, valor })

    res.status(200).json({ id, msg: "Ok! Venda alterada com sucesso" })
  } catch (error) {
    res.status(400).json({ id: 0, msg: "Erro: " + error.message })
  }
}

// DELETAR ---------------------------------------------------------------------------

export const vendasDelete = async (req, res) => {
  const { id } = req.params;

  try {
    await dbKnex("vendas").del().where({ id })
    res.status(200).json({ id, msg: "Ok! Venda excluído com sucesso" })
  } catch (error) {
    res.status(400).json({ id: 0, msg: "Erro: " + error.message })
  }
}

//PESQUISAR -----------------------------------------------------------------------
export const vendasPesquisa = async (req, res) => {
  const { cliente } = req.params

  try {
    // obtém da tabela de carros todos os registros da marca indicada
    const vendas = await dbKnex("vendas").whereLike('cliente', cliente)
    res.status(200).json(vendas)
  } catch (error) {
    res.status(400).json({ id: 0, msg: "Erro: " + error.message })
  }
}