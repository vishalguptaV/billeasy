const express = require('express');
const router = express.Router();
const orderController = require('../controllers/orderController');
const authMiddleware = require('../controllers/auth-controller');

router.post('/', authMiddleware.authentication, orderController.createOrder);
router.get('/getTotalRevenue', authMiddleware.authentication, orderController.getTotalRevenue);

router.get('/:userId', authMiddleware.authentication, orderController.getAllOrdersForUser);
router.get('/:orderId', authMiddleware.authentication, orderController.getOrderById);
router.put('/:orderId', authMiddleware.authentication, orderController.updateOrderById);
router.delete('/:orderId', authMiddleware.authentication, orderController.deleteOrderById);



module.exports = router;
