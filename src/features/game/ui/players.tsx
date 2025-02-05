import { GameDomain } from '@/entities/game';

export const GamePlayers = ({ game }: { game: GameDomain.GameEntity }) => {
  const firstPlayer = game.status === 'idle' ? game.creator : game.players[0];
  const secondPlayer = game.status === 'idle' ? undefined : game.players[1];

  return (
    <div className="flex flex-row gap-4 justify-between">
      <div className="text-lg">
        X - {firstPlayer.login} | Рейтинг: {firstPlayer.rating}
      </div>
      <span>VS</span>
      <div className="text-lg">
        O - {secondPlayer?.login ?? '...'} | Рейтинг:
        {secondPlayer?.rating ?? '...'}
      </div>
    </div>
  );
};
