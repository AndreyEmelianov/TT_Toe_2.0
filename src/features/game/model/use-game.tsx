import { useOptimistic, useTransition } from 'react';

import { GameDomain } from '@/entities/game';
import { GameId } from '@/kernel/ids';
import { routes } from '@/kernel/routes';
import { useEventsSource } from '@/shared/lib/sse/client';
import { makeStepAction } from '../actions/make-step-action';

export function useGame(gameId: GameId, player: GameDomain.PlayerEntity) {
  const { dataStream, isPending } = useEventsSource<GameDomain.GameEntity>(
    routes.gameStream(gameId),
  );

  const [isPendingTransition, startTransition] = useTransition();

  const [optimisticGame, dispatchOptimistic] = useOptimistic(
    dataStream,
    (game, cellIndex: number) => {
      if (!game || game.status !== 'inProgress') {
        return game;
      }

      const result = GameDomain.makeStep(game, cellIndex, player);

      if (result.type === 'right') {
        return result.value;
      }

      return game;
    },
  );

  const gameStep = (cellIndex: number) => {
    startTransition(async () => {
      dispatchOptimistic(cellIndex);
      await makeStepAction({ gameId, cellIndex });
    });
  };

  return {
    game: optimisticGame,
    gameStep,
    isPending: isPending,
    isStepPending: isPendingTransition,
  };
}
