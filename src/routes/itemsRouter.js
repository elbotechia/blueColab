import express from 'express';
import itemsController from '../controllers/itemsController.js';

const router = express.Router();

// Listar todos os produtos
router.get('/', itemsController.index);

// Detalhe de um produto
router.get('/:id', itemsController.detail);

// Formulário de criação de produto
router.get('/create', itemsController.create);

// Criar novo produto
router.post('/', itemsController.store);

// Formulário de edição de produto
router.get('/:id/edit', itemsController.edit);

// Atualizar produto
router.put('/:id', itemsController.update);

// Deletar produto
router.delete('/:id', itemsController.destroy);

export default router;
