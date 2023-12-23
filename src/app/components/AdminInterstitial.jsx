"use client";

import { useCookies } from 'next-client-cookies';
import AdminLabel from "../components/AdminLabel";
import AdminLogin from "../components/AdminLogin";
import { useState } from 'react';

export default function AdminInterstitial({ children }) {
  const [ loggedIn, setLoggedIn ] = useState(false);
  const cookies = useCookies();
  const cookie = cookies.get('logged-in');

  if ( cookie ) {
    return (
      <>
        <AdminLabel />
        {children}
      </>
    )
  } else {
    return (
      <>
        <AdminLabel />
        <AdminLogin setLoggedIn={setLoggedIn} />
      </>
    )
  }
}