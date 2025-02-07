import { GameId } from '@/kernel/ids';
import { makeStep, PlayerEntity } from '../domain';
import { gameRepository } from '../repositories/game';
import { left, right } from '@/shared/lib/either';

export async function gameStep(gameId: GameId, player: PlayerEntity, cellIndex: number) {
  const game = await gameRepository.getGame({ id: gameId });

  if (!game) {
    return left('game not found' as const);
  }

  if (game.status !== 'inProgress') {
    return left('game is not in progress' as const);
  }

  if (!game.players.some((player) => player.id === player.id)) {
    return left('player is not in game' as const);
  }

  const stepResult = makeStep(game, cellIndex, player);

  if (stepResult.type === 'left') {
    return stepResult;
  }

  return right(await gameRepository.saveGame(stepResult.value));
}
