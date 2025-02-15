import { redirect } from 'next/navigation';

import { GameId } from '@/kernel/ids';
import { GameClient } from './game-client';
import { getCurrentUser } from '@/entities/user/server';
import { getGameById, startGame } from '@/entities/game/server';

export async function Game({ gameId }: { gameId: GameId }) {
  const user = await getCurrentUser();

  let game = await getGameById(gameId);

  if (!game || !user) {
    redirect('/');
  }

  if (user) {
    const startGameResult = await startGame(gameId, user);
    if (startGameResult?.type === 'right') {
      game = startGameResult.value;
    }
  }

  return <GameClient gameDefault={game} player={user} />;
}
