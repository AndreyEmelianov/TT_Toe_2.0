'use client';
import { useState } from 'react';

import { right } from '@/shared/lib/either';
import { AuthFromLayout } from '../ui/auth-form-layout';
import { AuthFormFields } from '../ui/fields';
import { SubmitButton } from '../ui/submit-button';
import { BottomLink } from '../ui/bottom-link';
import { AuthError } from '../ui/auth-error';

export function SignUpForm() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = () => {};

  return (
    <AuthFromLayout
      title="Sign Up"
      description="Create your account to get started"
      actions={<SubmitButton>Sign Up</SubmitButton>}
      fields={
        <AuthFormFields
          login={email}
          onChangeLogin={setEmail}
          password={password}
          onChangePassword={setPassword}
        />
      }
      link={<BottomLink text="Already have an account?" linkText="Sing In" url="/sign-in" />}
      error={<AuthError error={right(null)} />}
      onSubmit={handleSubmit}
    />
  );
}
