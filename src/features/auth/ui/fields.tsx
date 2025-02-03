import { useId } from 'react';

import { Input } from '@/shared/ui/input';
import { Label } from '@/shared/ui/label';

export function AuthFormFields({
  formData,
  errors,
}: {
  formData?: FormData;
  errors?: { login?: string; password?: string };
}) {
  const idEmail = useId();
  const idPassword = useId();

  return (
    <>
      <div className="space-y-2">
        <Label htmlFor={idEmail}>Login</Label>
        <Input
          id={idEmail}
          type="email"
          name="login"
          placeholder="Enter you email"
          required
          defaultValue={formData?.get('login')?.toString()}
        />
        {errors?.login && <div>{errors.login}</div>}
      </div>
      <div className="space-y-2">
        <Label htmlFor={idPassword}>Password</Label>
        <Input
          id={idPassword}
          type="password"
          name="password"
          placeholder="Enter you password"
          required
          defaultValue={formData?.get('password')?.toString()}
        />
        {errors?.password && <div>{errors.password}</div>}
      </div>
    </>
  );
}
