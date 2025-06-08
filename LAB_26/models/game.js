let game = {
  state: 'SETEANDO',
  turn: null,
  players: {
    1: {
      ships: [],
      hits: [],
      misses: [],
      attacks: [] // <- agrega esta línea
    },
    2: {
      ships: [],
      hits: [],
      misses: [],
      attacks: [] // <- y esta también
    }
  }
};

const resetGame = () => {
  game = {
    state: 'SETEANDO',
    turn: null,
    players: {
      1: { ships: [], hits: [], misses: [], attacks: [] },
      2: { ships: [], hits: [], misses: [], attacks: [] }
    }
  };
};

module.exports = { game, resetGame };
