'use client';
import { GameLayout } from '../ui/layout';
import { GamePlayers } from '../ui/players';
import { GameStatus } from '../ui/status';
import { GameField } from '../ui/field';
import { useGame } from '../model/use-game';
import { GameDomain } from '@/entities/game';

export function GameClient({ gameDefault }: { gameDefault: GameDomain.GameEntity }) {
  const { game = gameDefault } = useGame(gameDefault.id);

  const onCellClick = () => {};

  return (
    <GameLayout
      players={<GamePlayers game={game} />}
      status={<GameStatus game={game} />}
      field={<GameField game={game} onCellClick={onCellClick} />}
    />
  );
}
