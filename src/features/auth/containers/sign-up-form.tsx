'use client';
import { AuthFromLayout } from '../ui/auth-form-layout';
import { AuthFormFields } from '../ui/fields';
import { SubmitButton } from '../ui/submit-button';
import { BottomLink } from '../ui/bottom-link';
import { AuthError } from '../ui/auth-error';
import { signUpAction, SignUpFormState } from '../actions/sign-up';
import { useActionState } from '@/shared/lib/react';
import { routes } from '@/kernel/routes';

export function SignUpForm() {
  const [formState, action, isPending] = useActionState(signUpAction, {} as SignUpFormState);

  return (
    <AuthFromLayout
      title="Sign Up"
      description="Create your account to get started"
      actions={<SubmitButton isPending={isPending}>Sign Up</SubmitButton>}
      fields={<AuthFormFields {...formState} />}
      link={<BottomLink text="Already have an account?" linkText="Sing In" url={routes.signIn()} />}
      error={<AuthError error={formState.errors?._errors} />}
      action={action}
    />
  );
}
