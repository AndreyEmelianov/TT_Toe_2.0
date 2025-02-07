import cuid from 'cuid';

import { PlayerEntity } from '../domain';
import { gameRepository } from '../repositories/game';
import { left, right } from '@/shared/lib/either';
import { gameEvents } from './game-events';

export async function createGame(player: PlayerEntity) {
  const playerGames = await gameRepository.gamesList({
    players: { some: { id: player.id } },
    status: 'idle',
  });

  const isGameInIdleStatus = playerGames.some(
    (game) => game.status === 'idle' && game.creator.id === player.id,
  );
  if (isGameInIdleStatus) {
    return left('can not create more than one game' as const);
  }

  const newGame = await gameRepository.createGame({
    id: cuid(),
    creator: player,
    status: 'idle',
    field: Array(9).fill(null),
  });

  await gameEvents.emit({
    type: 'game-created',
  });

  return right(newGame);
}
