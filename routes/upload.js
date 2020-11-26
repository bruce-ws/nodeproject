const express = require('express');
const router = express.Router();

const uploadController = require('../controller/upload');

router.post('/image',uploadController.uploadImg);


module.exports = router;