'use client';
import { useState } from 'react';

import { right } from '@/shared/lib/either';
import { AuthFromLayout } from '../ui/auth-form-layout';
import { AuthFormFields } from '../ui/fields';
import { SubmitButton } from '../ui/submit-button';
import { BottomLink } from '../ui/bottom-link';
import { AuthError } from '../ui/auth-error';

export function SignInForm() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = () => {};

  return (
    <AuthFromLayout
      title="Sign In"
      description="Welcome back! Please sign in to your account"
      actions={<SubmitButton>Sign In</SubmitButton>}
      fields={
        <AuthFormFields
          login={email}
          onChangeLogin={setEmail}
          password={password}
          onChangePassword={setPassword}
        />
      }
      link={<BottomLink text="Don't have an account?" linkText="Sing Up" url="/sign-up" />}
      error={<AuthError error={right(null)} />}
      onSubmit={handleSubmit}
    />
  );
}
