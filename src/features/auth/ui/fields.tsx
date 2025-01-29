import { useId } from 'react';

import { Input } from '@/shared/ui/input';
import { Label } from '@/shared/ui/label';

export function AuthFormFields({
  login,
  password,
  onChangeLogin,
  onChangePassword,
}: {
  login: string;
  password: string;
  onChangeLogin: (login: string) => void;
  onChangePassword: (password: string) => void;
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
          placeholder="Enter you email"
          value={login}
          onChange={(e) => onChangeLogin(e.target.value)}
          required
        />
      </div>
      <div className="space-y-2">
        <Label htmlFor={idPassword}>Password</Label>
        <Input
          id={idPassword}
          type="password"
          placeholder="Enter you password"
          value={password}
          onChange={(e) => onChangePassword(e.target.value)}
          required
        />
      </div>
    </>
  );
}
