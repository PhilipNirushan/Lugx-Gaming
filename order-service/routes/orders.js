// This file defines the routes for the order service.
// It uses the Express router to handle requests for order-related operations.
// The routes include creating a new order, getting all orders, getting an order by ID,
// updating an order and deleting an order.

const express = require('express');
const router = express.Router();
const {
  createOrder,
  getAllOrders,
  getOrderById,
  updateOrder,
  deleteOrder
} = require('../controllers/ordersController');

router.post('/', createOrder);
router.get('/', getAllOrders);
router.get('/:id', getOrderById);
router.put('/:id', updateOrder);
router.delete('/:id', deleteOrder);

module.exports = router;
