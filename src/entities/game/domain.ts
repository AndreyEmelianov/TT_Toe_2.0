import { GameId, UserId } from '@/kernel/ids';

export type GameEntity = GameIdleEntity | GameProgressEntity | GameOverEntity | GameOverDrawEntity;

export type GameIdleEntity = {
  id: GameId;
  creator: PlayerEntity;
  field: Field;
  status: 'idle';
};

export type GameProgressEntity = {
  id: GameId;
  players: PlayerEntity[];
  field: Field;
  status: 'inProgress';
};

export type GameOverEntity = {
  id: GameId;
  players: PlayerEntity[];
  field: Field;
  winner: PlayerEntity;
  status: 'gameOver';
};

export type GameOverDrawEntity = {
  id: GameId;
  players: PlayerEntity[];
  field: Field;
  status: 'gameOverDraw';
};

export type PlayerEntity = {
  id: UserId;
  login: string;
  rating: number;
};

export type Field = Cell[];
export type Cell = GameSymbol | null;
export type GameSymbol = string;

export const GameSymbols = {
  X: 'X',
  O: 'O',
};
export const getGameCurrentStep = (game: GameProgressEntity | GameOverEntity) => {
  const symbols = game.field.filter((symbol) => symbol !== null).length;

  return symbols % 2 === 0 ? GameSymbols.X : GameSymbols.O;
};

export const getGameNextSymbol = (gameSymbol: GameSymbol) => {
  if (gameSymbol === GameSymbols.X) {
    return GameSymbols.O;
  }
  return GameSymbols.X;
};
