import { GameDomain } from '@/entities/game';

export const GameStatus = ({ game }: { game: GameDomain.GameEntity }) => {
  switch (game.status) {
    case 'idle': {
      return <div className="text-lg mb-4">Статус: ожидание игрока...</div>;
    }

    case 'inProgress': {
      const currentSymbol = GameDomain.getGameCurrentSymbol(game);
      return <div className="text-lg mb-4">Ход: {currentSymbol}</div>;
    }

    case 'gameOver': {
      const currentSymbol = GameDomain.getPlayerSymbol(game.winner, game);
      return <div className="text-lg mb-4">Победитель: {currentSymbol}</div>;
    }

    case 'gameOverDraw': {
      return <div className="text-lg mb-4">Ничья</div>;
    }
  }
};
