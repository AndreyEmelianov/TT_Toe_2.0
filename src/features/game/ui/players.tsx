import { GameDomain } from '@/entities/game';

export const GamePlayers = ({ game }: { game: GameDomain.GameEntity }) => {
  const firstPlayer = game.status === 'idle' ? game.creator : game.players[0];
  const secondPlayer = game.status === 'idle' ? undefined : game.players[0];

  return (
    <div className="flex flex-row gap-4 justify-between">
      <div className="text-lg">
        X - {firstPlayer.login} | Рейтинг: {firstPlayer.rating}
      </div>
      <div className="text-lg">
        O - {secondPlayer?.login ?? '...'}
        {secondPlayer?.rating ?? '...'}
      </div>
    </div>
  );
};
