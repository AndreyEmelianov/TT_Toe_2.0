import { GameDomain } from '@/entities/game';

export const GameField = ({
  game,
  onCellClick,
}: {
  game: GameDomain.GameEntity;
  onCellClick: (index: number) => void;
}) => {
  return (
    <div className="grid grid-cols-3 grid-rows-3">
      {game.field.map((symbol, index) => (
        <button
          key={index}
          onClick={() => onCellClick(index)}
          className="border border-primary w-14 h-14 flex justify-center items-center">
          {symbol ?? ''}
        </button>
      ))}
    </div>
  );
};
