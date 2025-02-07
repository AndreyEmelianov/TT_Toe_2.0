'use server';
import { gameStep } from '@/entities/game/server';
import { getCurrentUser } from '@/entities/user/server';
import { GameId } from '@/kernel/ids';
import { left } from '@/shared/lib/either';

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

  return await gameStep(gameId, currentUser, cellIndex);
};
