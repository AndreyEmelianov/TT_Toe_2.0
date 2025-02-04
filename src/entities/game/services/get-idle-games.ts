import { GameIdleEntity } from '../domain';
import { gameRepository } from '../repositories/game';

export async function getIdleGames(): Promise<GameIdleEntity[]> {
  const games = await gameRepository.gamesList({
    status: 'idle',
  });

  console.log(games);

  return games as GameIdleEntity[];
}
