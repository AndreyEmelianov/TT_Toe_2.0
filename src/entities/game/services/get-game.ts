import { gameRepository } from '../repositories/game';
import { GameId } from '@/kernel/ids';

export function getGameById(gameId: GameId) {
  return gameRepository.getGame({ id: gameId });
}
