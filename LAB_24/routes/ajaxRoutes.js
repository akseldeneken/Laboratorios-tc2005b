const express = require('express');
const router = express.Router();
const ajaxController = require('../controllers/ajaxController');

router.get('/', ajaxController.getIndex);
router.post('/mensaje', ajaxController.postMensaje);

module.exports = router;
