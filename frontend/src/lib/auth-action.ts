'use server'
import { signIn, signOut, auth } from '@/auth'


export async function SignIn() {
  return await signIn('github', { redirectTo: "/" })
};

export async function SignOut() {
    return await signOut()
};


export async function SessionStatus() {
  const session = await auth();

  if (!session || !session.user) return null;

  return session.user;
}