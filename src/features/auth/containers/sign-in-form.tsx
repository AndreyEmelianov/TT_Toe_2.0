'use client';
import { useActionState } from '@/shared/lib/react';
import { AuthFromLayout } from '../ui/auth-form-layout';
import { AuthFormFields } from '../ui/fields';
import { SubmitButton } from '../ui/submit-button';
import { BottomLink } from '../ui/bottom-link';
import { AuthError } from '../ui/auth-error';
import { signInAction, SignInFormState } from '../actions/sign-in';

export function SignInForm() {
  const [formState, action, isPending] = useActionState(signInAction, {} as SignInFormState);

  return (
    <AuthFromLayout
      title="Sign In"
      description="Welcome back! Please sign in to your account"
      actions={<SubmitButton isPending={isPending}>Sign In</SubmitButton>}
      fields={<AuthFormFields {...formState} />}
      link={<BottomLink text="Don't have an account?" linkText="Sing Up" url="/sign-up" />}
      error={<AuthError error={formState.errors?._errors} />}
      action={action}
    />
  );
}
