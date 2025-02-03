import { redirect } from 'next/navigation';

import { sessionService } from '@/entities/user/server';
import { Button } from '@/shared/ui/button';

export default async function PrivateLayout({ children }: { children: React.ReactNode }) {
  const { session } = await sessionService.verifySession();

  return (
    <div>
      <header className="px-10 py-4 flex flex-row gap-4 justify-between items-center border-b border-b-primary/50">
        <div className="text-xl">TT-Toe Online</div>
        <div className="flex items-center gap-4">
          <div className="text-lg">{session.login}</div>
          <form
            action={async () => {
              'use server';

              sessionService.deleteSession();
              redirect('/sign-in');
            }}>
            <Button>Sign out</Button>
          </form>
        </div>
      </header>
      {children}
    </div>
  );
}
