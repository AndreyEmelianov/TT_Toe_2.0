import { NextRequest } from 'next/server';

import { createSSEStream } from '@/shared/lib/sse/server';
import { gameEvents, getIdleGames } from '@/entities/game/server';
import { getCurrentUser } from '@/entities/user/server';

export async function getGamesStreamRoute(req: NextRequest) {
  const user = await getCurrentUser();

  if (!user) {
    return new Response('Game not found', {
      status: 404,
    });
  }

  const { response, write, addDisconnectListener } = createSSEStream(req);
  write(await getIdleGames());

  addDisconnectListener(
    await gameEvents.addGameCreatedListener(async () => {
      write(await getIdleGames());
    }),
  );

  return response;
}
