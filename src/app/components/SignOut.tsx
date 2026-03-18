"use client"

import { signOut } from "next-auth/react"
import { ButtonHTMLAttributes, DetailedHTMLProps } from "react"

type Props = DetailedHTMLProps<ButtonHTMLAttributes<HTMLButtonElement>, HTMLButtonElement>;

export default function SignOut( props: Props ) {
  return (
    <button onClick={ () => signOut() } { ...props }>
      Sign out
    </button>
  )
}
