const express = require('express');
const router = express.Router();
const userController = require('../controllers/user.controller');
const auth = require('../middleware/auth.middleware');

/**
 * @swagger
 * /users:
 *   post:
 *     summary: Crear usuario
 *     description: Crea un nuevo usuario
 *     operationId: createUser
 *     produces:
 *       - application/json
 *     parameters:
 *       - in: body
 *         name: user
 *         description: Información del usuario
 *         required: true
 *         schema:
 *           type: object
 *           properties:
 *             name:
 *               type: string
 *               example: John Doe
 *             email:
 *               type: string
 *               example: johndoe@example.com
 *     responses:
 *       201:
 *         description: Usuario creado correctamente
 *         schema:
 *           type: object
 *           properties:
 *             id:
 *               type: string
 *               example: 1
 *             name:
 *               type: string
 *               example: John Doe
 *             email:
 *               type: string
 *               example: johndoe@example.com
 *       400:
 *         description: Error en la petición
 */
router.post('/register', userController.create);

router.post('/login', userController.login);

// Retrieve all users
router.get('/', auth.authenticate, auth.authenticateAdmin, userController.findAll);

// Retrieve a single user with id
router.get('/:id', auth.checkAuth, userController.findOne);

// Update a user with id
router.put('/:id', auth.checkAuth, userController.update);

// Delete a user with id
router.delete('/:id', auth.checkAuth, userController.delete);

module.exports = router;
