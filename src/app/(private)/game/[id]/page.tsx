import { Game } from '@/features/game/server';

export default async function Page({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;

  return (
    <main className="flex flex-col grow pt-28 w-full max-w-[500px] mx-auto">
      <Game gameId={id} />
    </main>
  );
}
