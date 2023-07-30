const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');
const middlewares = require('../middlewares/authMiddleware')

router.post('/login', userController.login);
router.get('/', middlewares.authenticateToken, userController.getUser);
router.post('/', userController.createUser)
router.put('/',middlewares.authenticateToken, userController.updateUser)
router.get('/genOtp/:emailId',userController.genOtp)
router.put('/updatePassword',userController.updatePassword)
router.get('/fetchAllOtp',middlewares.authenticateToken,userController.getAllOtp)

module.exports = router;