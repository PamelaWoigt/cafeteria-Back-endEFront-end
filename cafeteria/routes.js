import { Router , json } from "express"
import cors from "cors"
import {produtoListagem, produtoInclusao, produtoAlteracao, produtoDelete, produtoPesquisa  } from './controllers/produtosController.js'
import { vendasListagem, vendasInclusao, vendasAlteracao, vendasDelete, vendasPesquisa } from './controllers/vendasController.js'
const router = Router()

router.use(json())

router.use(cors())

//define as rotas da tabela de PRODUTOS
router.get('/produtos', produtoListagem)
      .post('/produtos', produtoInclusao)
      .put('/produtos/:id', produtoAlteracao)
      .get('/produtos/pesq/:categoria', produtoPesquisa)
      .delete('/produtos/:id', produtoDelete)

//define as rotas da tabela de VENDAS
router.get('/vendas', vendasListagem)
      .post('/vendas', vendasInclusao)
      .put('/vendas/:id', vendasAlteracao)
      .get('/vendas/pesq/:cliente', vendasPesquisa)
      .delete('/vendas/:id', vendasDelete)
export default router