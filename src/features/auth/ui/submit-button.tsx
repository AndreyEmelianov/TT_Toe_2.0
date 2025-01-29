import { Button } from '@/shared/ui/button';

export function SubmitButton({ children }: { children: React.ReactNode }) {
  return (
    <Button type="submit" className="w-full">
      {children}
    </Button>
  );
}
