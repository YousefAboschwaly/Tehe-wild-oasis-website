'use server'

import { signIn, signOut } from "./auth"

export async function SignInAction(){
  return signIn('google',{redirectTo:'/account'})
}
export async function SignOutAction(){
  return signOut({redirectTo:'/'})
}
