import { NextRequest } from 'next/server';

import { createSSEStream } from '@/shared/lib/sse/server';
import { getGameById } from '@/entities/game/server';
import { GameId } from '@/kernel/ids';
import { gameEvents } from '../services/game-events';

export async function getGameStream(
  req: NextRequest,
  { params }: { params: Promise<{ id: GameId }> },
) {
  const { id } = await params;

  const game = await getGameById(id);

  if (!game) {
    return new Response('Game not found', {
      status: 404,
    });
  }

  const { response, write, addDisconnectListener } = createSSEStream(req);

  write(game);

  const unsubscribeGame = await gameEvents.addGameListener(game.id, (event) => {
    write(event.data);
  });

  addDisconnectListener(unsubscribeGame);

  return response;
}
