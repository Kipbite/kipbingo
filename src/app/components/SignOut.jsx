"use client"

import { signOut } from "next-auth/react"

export default function SignOut( props ) {
  return (
    <>
      <button onClick={() => signOut()} { ...props }>
        Sign out
      </button>
    </>
  )
}
