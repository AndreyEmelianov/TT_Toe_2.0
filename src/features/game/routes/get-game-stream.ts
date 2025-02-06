import { NextRequest } from 'next/server';

import { createSSEStream } from '@/shared/lib/sse/server';
import { getGameById, surrenderGame } from '@/entities/game/server';
import { GameId } from '@/kernel/ids';
import { gameEvents } from '../services/game-events';
import { getCurrentUser } from '@/entities/user/server';

export async function getGameStream(
  req: NextRequest,
  { params }: { params: Promise<{ id: GameId }> },
) {
  const { id } = await params;
  const user = await getCurrentUser();

  const game = await getGameById(id);

  if (!game || !user) {
    return new Response('Game not found', {
      status: 404,
    });
  }

  const { response, write, addDisconnectListener } = createSSEStream(req);

  write(game);

  const unwatch = await gameEvents.addGameListener(game.id, (event) => {
    write(event.data);
  });

  addDisconnectListener(async () => {
    const result = await surrenderGame(id, user);

    if (result.type === 'right') {
      gameEvents.emit(result.value);
    }
    unwatch();
  });

  return response;
}
