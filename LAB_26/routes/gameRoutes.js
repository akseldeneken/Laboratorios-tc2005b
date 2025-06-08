const express = require('express');
const router = express.Router();
const gameController = require('../controllers/gameController');

router.get('/game/create', gameController.createGame);
router.get('/game/status', gameController.getGameStatus);
router.get('/dice', gameController.rollDice);
router.post('/game/create/:player', gameController.placeShips); // este estaba mal
router.post('/game/turn', gameController.handleTurn); // este también
router.get('/player/:playerNumber', gameController.getPlayerInfo);

module.exports = router;
