const express = require('express');
const router = express.Router();
const urlController = require('../controllers/url.controller');
const auth = require('../middleware/auth.middleware');
const urlMiddleware = require('../middleware/url.middleware');


router.post('/', auth.authenticateUser, urlMiddleware.validateUrlExistence, urlController.create);
router.get('/:id', urlController.get);
router.put('/:id', auth.authenticateUser, urlController.update);
router.delete('/:id', auth.checkAuth, urlController.delete);

module.exports = router;