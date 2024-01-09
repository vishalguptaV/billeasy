const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');
const authMiddleware = require('../controllers/auth-controller');

router.post('/', authMiddleware.registerUser);
router.get('/', authMiddleware.authentication, userController.getAllUsersWithOrders);
router.get('/:userId', authMiddleware.authentication, userController.getUserByIdWithOrders);
router.put('/:userId', authMiddleware.authentication, userController.updateUserById);
router.delete('/:userId', authMiddleware.authentication, userController.deleteUserById);

module.exports = router;
