const express = require('express');
const BookController = require('../controllers/BookController');

const router = express.Router();

router.post('/', BookController.create);
router.get('/', BookController.getAll);
router.get('/:id', BookController.getById);
router.put('/:id', BookController.update);
router.delete('/:id', BookController.delete);

module.exports = router;

