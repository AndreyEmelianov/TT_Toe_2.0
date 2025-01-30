import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/shared/ui/card';

export function AuthFromLayout({
  title,
  description,
  link,
  fields,
  actions,
  error,
  action,
}: {
  title: string;
  description: string;
  link: React.ReactNode;
  fields: React.ReactNode;
  actions: React.ReactNode;
  error: React.ReactNode;
  action: (formData: FormData) => void;
}) {
  return (
    <Card className="w-full max-w-md">
      <CardHeader>
        <CardTitle className="text-2xl font-bold text-center">{title}</CardTitle>
        <CardDescription className="text-center">{description}</CardDescription>
      </CardHeader>
      <CardContent>
        <form action={action} className="space-y-4">
          {fields}
          {error}
          {actions}
        </form>
      </CardContent>
      <CardFooter className="flex justify-center">{link}</CardFooter>
    </Card>
  );
}
