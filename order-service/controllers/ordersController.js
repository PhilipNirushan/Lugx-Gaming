// This module exports functions to handle order-related operations.
// It interacts with the PostgreSQL database using a connection pool. 
// Each function corresponds to a specific route defined in the routes file.
// The functions return JSON responses to the client, indicating the result of the operation.
// The operations include creating a new order, fetching all orders, fetching an order by ID,
// updating an existing order, and deleting an order.

const pool = require('../db');

exports.createOrder = async (req, res) => {
  const { customer_name, email, items, total_price } = req.body;
  try {
    await pool.query(
      'INSERT INTO orders (customer_name, email, items, total_price) VALUES ($1, $2, $3, $4)',
      [customer_name, email, JSON.stringify(items), total_price]
    );
    res.status(201).json({ message: 'Order created' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.getAllOrders = async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM orders ORDER BY created_at DESC');
    res.json(result.rows);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.getOrderById = async (req, res) => {
  const { id } = req.params;
  try {
    const result = await pool.query('SELECT * FROM orders WHERE id = $1', [id]);
    if (result.rows.length === 0) return res.status(404).json({ error: 'Order not found' });
    res.json(result.rows[0]);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.updateOrder = async (req, res) => {
  const { id } = req.params;
  const { customer_name, email, items, total_price } = req.body;
  try {
    await pool.query(
      'UPDATE orders SET customer_name = $1, email = $2, items = $3, total_price = $4 WHERE id = $5',
      [customer_name, email, JSON.stringify(items), total_price, id]
    );
    res.json({ message: 'Order updated' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.deleteOrder = async (req, res) => {
  const { id } = req.params;
  try {
    await pool.query('DELETE FROM orders WHERE id = $1', [id]);
    res.json({ message: 'Order deleted' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};


