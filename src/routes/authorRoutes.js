const express = require('express');
const AuthorController = require('../controllers/AuthorController');

const router = express.Router();

router.post('/', AuthorController.create);
router.get('/', AuthorController.getAll);
router.get('/:id', AuthorController.getById);
router.put('/:id', AuthorController.update);
router.delete('/:id', AuthorController.delete);

module.exports = router;

