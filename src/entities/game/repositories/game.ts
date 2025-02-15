import { z } from 'zod';
import { Game, GamePlayer, Prisma, User } from '@prisma/client';

import {
  GameEntity,
  GameIdleEntity,
  GameOverDrawEntity,
  GameOverEntity,
  GameProgressEntity,
  PlayerEntity,
} from '../domain';
import { prisma } from '@/shared/lib/db';
import { GameId } from '@/kernel/ids';

const gameInclude = {
  winner: { include: { user: true } },
  players: { include: { user: true } },
};

async function gamesList(where?: Prisma.GameWhereInput): Promise<GameEntity[]> {
  const games = await prisma.game.findMany({
    where,
    include: gameInclude,
  });

  return games.map(dbGameToGameEntity);
}

async function createGame(game: GameIdleEntity): Promise<GameEntity> {
  const createdGame = await prisma.game.create({
    data: {
      id: game.id,
      status: game.status,
      field: game.field,
      players: {
        create: {
          index: 0,
          userId: game.creator.id,
        },
      },
    },
    include: gameInclude,
  });

  return dbGameToGameEntity(createdGame);
}

async function getGame(where?: Prisma.GameWhereInput) {
  const game = await prisma.game.findFirst({
    where,
    include: gameInclude,
  });

  if (game) {
    return dbGameToGameEntity(game);
  }

  return undefined;
}

async function startGame(gameId: GameId, player: PlayerEntity) {
  return dbGameToGameEntity(
    await prisma.game.update({
      where: {
        id: gameId,
      },
      data: {
        players: {
          create: {
            index: 1,
            userId: player.id,
          },
        },
        status: 'inProgress',
      },
      include: gameInclude,
    }),
  );
}

async function saveGame(game: GameProgressEntity | GameOverEntity | GameOverDrawEntity) {
  const winnerId =
    game.status === 'gameOver'
      ? await prisma.gamePlayer
          .findFirstOrThrow({ where: { userId: game.winner.id } })
          .then((p) => p.id)
      : undefined;

  return dbGameToGameEntity(
    await prisma.game.update({
      where: {
        id: game.id,
      },
      data: {
        status: game.status,
        field: game.field,
        winnerId: winnerId,
      },
      include: gameInclude,
    }),
  );
}

const fieldSchema = z.array(z.union([z.string(), z.null()]));

function dbGameToGameEntity(
  game: Game & {
    players: Array<GamePlayer & { user: User }>;
    winner?: (GamePlayer & { user: User }) | null;
  },
): GameEntity {
  const players = game.players.sort((a, b) => a.index - b.index).map(dbPlayerToPlayer);
  switch (game.status) {
    case 'idle': {
      const [creator] = players;
      if (!creator) {
        throw new Error('creator should be in game idle');
      }
      return {
        id: game.id,
        creator: creator,
        status: game.status,
        field: fieldSchema.parse(game.field),
      } satisfies GameIdleEntity;
    }

    case 'inProgress':
    case 'gameOverDraw': {
      return {
        id: game.id,
        players: players,
        status: game.status,
        field: fieldSchema.parse(game.field),
      };
    }

    case 'gameOver': {
      if (!game.winner) {
        throw new Error('winner should be in game over');
      }
      return {
        id: game.id,
        players: players,
        status: game.status,
        field: fieldSchema.parse(game.field),
        winner: dbPlayerToPlayer(game.winner),
      } satisfies GameOverEntity;
    }
  }
}

export const dbPlayerToPlayer = (db: GamePlayer & { user: User }): PlayerEntity => {
  return {
    id: db.user.id,
    login: db.user.login,
    rating: db.user.rating,
  };
};

export const gameRepository = { gamesList, createGame, getGame, startGame, saveGame };
