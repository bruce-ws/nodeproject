const express = require('express');
const router = express.Router();

const bookController = require('../controller/book');

router.post('/addbook',bookController.addBook);

module.exports = router;

