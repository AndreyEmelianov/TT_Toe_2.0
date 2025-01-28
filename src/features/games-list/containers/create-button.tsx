'use client';
import { startTransition } from 'react';

import { Button } from '@/shared/ui/button';
import { createGameAction } from '../actions/create-game';
import { useActionState } from '@/shared/lib/react';
import { mapLeft, right } from '@/shared/lib/either';

export function CreateButton() {
  const [state, dispatch, isPending] = useActionState(createGameAction, right(undefined));

  return (
    <Button
      disabled={isPending}
      error={mapLeft(
        state,
        (e) =>
          ({
            ['can not create more than one game']: 'Вы можете создать не более чем одну игру',
            ['user not found']: 'Пользователь не найден',
          }[e]),
      )}
      onClick={() => startTransition(dispatch)}>
      Создать игру
    </Button>
  );
}
