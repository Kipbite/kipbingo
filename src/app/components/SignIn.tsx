"use client"

import DiscordLogo from "@/app/icons/DiscordLogo"
import { signIn } from "next-auth/react"
 
export default function SignIn() {
  return (
    <button
      onClick={ () => signIn( 'discord' ) }
      className="sign-in discord-sign-in"
    >
      <DiscordLogo />
      Sign in with Discord
    </button>
  )
}
