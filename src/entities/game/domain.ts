import { GameId, UserId } from '@/kernel/ids';
import { left, right } from '@/shared/lib/either';

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
export const getGameCurrentSymbol = (
  game: GameProgressEntity | GameOverEntity | GameOverDrawEntity,
) => {
  const symbols = game.field.filter((symbol) => symbol !== null).length;

  return symbols % 2 === 0 ? GameSymbols.X : GameSymbols.O;
};

export const getGameNextSymbol = (gameSymbol: GameSymbol) => {
  if (gameSymbol === GameSymbols.X) {
    return GameSymbols.O;
  }
  return GameSymbols.X;
};

export const getPlayerSymbol = (
  player: PlayerEntity,
  game: GameProgressEntity | GameOverEntity,
) => {
  const index = game.players.findIndex((p) => p.id === player.id);

  return { 0: GameSymbols.X, 1: GameSymbols.O }[index];
};

export const makeStep = (game: GameProgressEntity, cellIndex: number, player: PlayerEntity) => {
  const currentSymbol = getGameCurrentSymbol(game);

  if (currentSymbol !== getPlayerSymbol(player, game)) {
    return left('not player symbol' as const);
  }

  if (game.field[cellIndex]) {
    return left('game cell already has symbol' as const);
  }

  const newField = game.field.map((cell, index) => (index === cellIndex ? currentSymbol : cell));

  const winner = calculateWinner(newField);

  if (winner) {
    return right({
      ...game,
      field: newField,
      winner: player,
      status: 'gameOver',
    } satisfies GameOverEntity);
  }

  if (isDraw(newField)) {
    return right({
      ...game,
      field: newField,
      status: 'gameOverDraw',
    } satisfies GameOverDrawEntity);
  }

  return right({
    ...game,
    field: newField,
  } satisfies GameProgressEntity);
};

function isDraw(squares: Field) {
  const winner = calculateWinner(squares);

  if (!winner) {
    return squares.every((s) => s !== null);
  }

  return false;
}

function calculateWinner(squares: Field) {
  const lines = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ];

  for (let i = 0; i < lines.length; i++) {
    const [a, b, c] = lines[i];
    if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
      return squares[a];
    }
  }
  return null;
}
