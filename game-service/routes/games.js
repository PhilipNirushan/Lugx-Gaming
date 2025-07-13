// This file defines the routes for the game service.
// It uses the Express router to handle requests for game-related operations.
// The routes include getting all games, getting a game by ID, creating a new game,
// updating an existing game, and deleting a game.

const express = require('express');
const router = express.Router();
const {
  getAllGames,
  getGameById,
  createGame,
  updateGame,
  deleteGame,
} = require('../controllers/gamesController');

router.get('/', getAllGames);
router.get('/:id', getGameById);
router.post('/', createGame);
router.put('/:id', updateGame);
router.delete('/:id', deleteGame);

module.exports = router;
