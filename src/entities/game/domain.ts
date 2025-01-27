export type GameEntity = GameIdleEntity | GameProgressEntity | GameOverEntity | GameOverDrawEntity;

export type GameIdleEntity = {
  id: string;
  creator: PlayerEntity;
  status: 'idle';
};

export type GameProgressEntity = {
  id: string;
  players: PlayerEntity[];
  field: Field;
  status: 'inProgress';
};

export type GameOverEntity = {
  id: string;
  players: PlayerEntity[];
  field: Field;
  winner: PlayerEntity;
  status: 'gameOver';
};

export type GameOverDrawEntity = {
  id: string;
  players: PlayerEntity[];
  field: Field;
  status: 'gameOverDraw';
};

export type PlayerEntity = {
  id: string;
  login: string;
  rating: number;
};

export type Field = Cell[];
export type Cell = GameSymbol | null;
export type GameSymbol = string;
