"use client";

import { useCookies } from 'next-client-cookies';
import AdminMenu from "./AdminMenu";
import AdminLogin from "../components/AdminLogin";
import { useState } from 'react';

export default function AdminInterstitial({ children }) {
  const [ loggedIn, setLoggedIn ] = useState(false);
  const cookies = useCookies();
  const cookie = cookies.get('logged-in');

  if ( cookie ) {
    return (
      <>
        <AdminMenu />
        {children}
      </>
    )
  } else {
    return (
      <>
        <AdminMenu />
        <AdminLogin setLoggedIn={setLoggedIn} />
      </>
    )
  }
}