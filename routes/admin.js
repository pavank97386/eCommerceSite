const express = require('express')
const router = express.Router()
const adminController = require('../controllers/adminController')

router.get('/',adminController.getAllUserDetails)
router.delete('/',adminController.deleteUserProfile)


module.exports = router;