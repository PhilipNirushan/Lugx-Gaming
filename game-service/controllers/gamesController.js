// This module handles the game-related operations such as fetching, creating, updating, and deleting games.
// It uses the PostgreSQL connection pool to interact with the database.
// Each function corresponds to a specific route defined in the routes file.
// The functions return JSON responses to the client, indicating the result of the operation.

const pool = require('../db');

exports.getAllGames = async (req, res) => {
  const result = await pool.query('SELECT * FROM games');
  res.json(result.rows);
};

exports.getGameById = async (req, res) => {
  const { id } = req.params;
  const result = await pool.query('SELECT * FROM games WHERE id = $1', [id]);
  res.json(result.rows[0]);
};

exports.createGame = async (req, res) => {
  const { name, category, release_date, price } = req.body;
  await pool.query(
    'INSERT INTO games (name, category, release_date, price) VALUES ($1, $2, $3, $4)',
    [name, category, release_date, price]
  );
  res.status(201).json({ message: 'Game created' });
};

exports.updateGame = async (req, res) => {
  const { id } = req.params;
  const { name, category, release_date, price } = req.body;
  await pool.query(
    'UPDATE games SET name=$1, category=$2, release_date=$3, price=$4 WHERE id=$5',
    [name, category, release_date, price, id]
  );
  res.json({ message: 'Game updated' });
};

exports.deleteGame = async (req, res) => {
  const { id } = req.params;
  await pool.query('DELETE FROM games WHERE id=$1', [id]);
  res.json({ message: 'Game deleted' });
};
   