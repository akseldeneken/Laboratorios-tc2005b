const { game, resetGame } = require('../models/game');

// GET /game/create
const createGame = (req, res) => {
  resetGame();
  res.status(200).json({ message: 'Juego creado', state: game.state });
};

// GET /game/status
const getGameStatus = (req, res) => {
  res.status(200).json({
    state: game.state,
    turn: game.turn,
    players: {
      1: {
        ships: game.players[1].ships.length,
        hits: game.players[1].hits.length,
        misses: game.players[1].misses.length,
      },
      2: {
        ships: game.players[2].ships.length,
        hits: game.players[2].hits.length,
        misses: game.players[2].misses.length,
      },
    },
  });
};

// GET /dice
const rollDice = (req, res) => {
  if (game.state !== 'SETEANDO') {
    return res.status(400).json({ error: 'No puedes lanzar el dado en este estado' });
  }

  const turn = Math.random() < 0.5 ? 1 : 2;
  game.turn = turn;
  res.status(200).json({ message: 'Jugador inicial', player: turn });
};


// POST /game/create/:player
const placeShips = (req, res) => {
  const player = parseInt(req.params.player);
  const ships = req.body.ships;

  if (game.state !== 'SETEANDO') {
    return res.status(400).json({ error: 'No puedes colocar barcos en este estado' });
  }

  if (![1, 2].includes(player)) {
    return res.status(400).json({ error: 'Número de jugador inválido' });
  }

  if (!Array.isArray(ships) || ships.length !== 10) {
    return res.status(400).json({ error: 'Se deben enviar exactamente 10 barcos' });
  }

  game.players[player].ships = ships;

  if (game.players[1].ships.length === 10 && game.players[2].ships.length === 10) {
  game.state = 'JUGANDO';
  game.turn = Math.random() < 0.5 ? 1 : 2; // ← ¡aquí forzamos el turno!
}


  res.status(200).json({ message: 'Barcos colocados exitosamente' });
};

// POST /game/turn
const handleTurn = (req, res) => {
  const { player, attack } = req.body;

  if (game.state !== 'JUGANDO') {
    return res.status(400).json({ error: 'No se puede atacar en este estado' });
  }

  if (player !== game.turn) {
    return res.status(400).json({ error: 'No es tu turno' });
  }

  const enemy = player === 1 ? 2 : 1;
  const hit = game.players[enemy].ships.some(ship =>
    ship.positions.some(pos => pos[0] === attack.x && pos[1] === attack.y)
  );

  game.players[player].attacks.push([attack.x, attack.y]);

  if (hit) {
    game.players[player].hits.push([attack.x, attack.y]);
  } else {
    game.turn = enemy; // pasa turno
  }

  const allHits = game.players[player].hits.length;
  const totalShipCells = game.players[enemy].ships.reduce((acc, ship) => acc + ship.positions.length, 0);

  if (allHits >= totalShipCells) {
    game.state = 'FINALIZADO';
  }

  res.status(200).json({
    hit,
    nextTurn: game.turn,
    gameState: game.state
  });
};

// GET /player/:playerNumber
const getPlayerInfo = (req, res) => {
  const player = parseInt(req.params.playerNumber);

  if (![1, 2].includes(player)) {
    return res.status(400).json({ error: 'Número de jugador inválido' });
  }

  const data = game.players[player];

  if (!data.ships.length) {
    return res.status(400).json({ error: 'El jugador aún no ha colocado sus barcos' });
  }

  res.status(200).json({
    shipsRemaining: data.ships.length,
    attacksMade: data.attacks.length,
    hitsMade: data.hits.length
  });
};


module.exports = {
  createGame,
  getGameStatus,
  rollDice,
  placeShips,
  handleTurn,
  getPlayerInfo,
};
