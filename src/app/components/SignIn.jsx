"use client"

import DiscordIcon from "@/app/icons/discord-logo"
import { signIn } from "next-auth/react"
 
export default function SignIn() {
  return (
    <>
      <button onClick={() => signIn("discord")} className="sign-in discord-sign-in">
        <DiscordIcon />
        Sign in with Discord
      </button>
    </>
  )
}
