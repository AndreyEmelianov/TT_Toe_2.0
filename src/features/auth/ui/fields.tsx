import { useId } from 'react';

import { Input } from '@/shared/ui/input';
import { Label } from '@/shared/ui/label';

export function AuthFormFields() {
  const idEmail = useId();
  const idPassword = useId();

  return (
    <>
      <div className="space-y-2">
        <Label htmlFor={idEmail}>Login</Label>
        <Input id={idEmail} type="email" name="login" placeholder="Enter you email" required />
      </div>
      <div className="space-y-2">
        <Label htmlFor={idPassword}>Password</Label>
        <Input
          id={idPassword}
          type="password"
          name="password"
          placeholder="Enter you password"
          required
        />
      </div>
    </>
  );
}
