const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');
const middlewares = require('../middlewares/authMiddleware')

router.post('/login', userController.login);
router.get('/', middlewares.authenticateToken, userController.getUser);
router.post('/', userController.createUser)
router.put('/',middlewares.authenticateToken, userController.updateUser)

module.exports = router;