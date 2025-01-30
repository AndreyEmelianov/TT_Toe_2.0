'use client';
import { right } from '@/shared/lib/either';
import { AuthFromLayout } from '../ui/auth-form-layout';
import { AuthFormFields } from '../ui/fields';
import { SubmitButton } from '../ui/submit-button';
import { BottomLink } from '../ui/bottom-link';
import { AuthError } from '../ui/auth-error';
import { signUpAction } from '../actions/sign-up';
import { useActionState } from '@/shared/lib/react';

export function SignUpForm() {
  const [formState, action, isPending] = useActionState(signUpAction, right(undefined));

  return (
    <AuthFromLayout
      title="Sign Up"
      description="Create your account to get started"
      actions={<SubmitButton isPending={isPending}>Sign Up</SubmitButton>}
      fields={<AuthFormFields />}
      link={<BottomLink text="Already have an account?" linkText="Sing In" url="/sign-in" />}
      error={<AuthError error={formState} />}
      action={action}
    />
  );
}
