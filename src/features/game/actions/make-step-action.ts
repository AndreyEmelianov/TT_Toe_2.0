'use server';

import { gameStep } from '@/entities/game/server';
import { getCurrentUser } from '@/entities/user/server';
import { GameId } from '@/kernel/ids';
import { left } from '@/shared/lib/either';
import { gameEvents } from '../services/game-events';

export const makeStepAction = async ({
  gameId,
  cellIndex,
}: {
  gameId: GameId;
  cellIndex: number;
}) => {
  const currentUser = await getCurrentUser();

  if (!currentUser) {
    return left('not found' as const);
  }

  const result = await gameStep(gameId, currentUser, cellIndex);

  if (result.type === 'right') {
    gameEvents.emit(result.value);

    return result;
  }

  return result;
};
