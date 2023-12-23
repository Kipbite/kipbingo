import { useState } from "react";
import { sendApiRequest } from "@/app/lib/utilities";
import { useCookies } from 'next-client-cookies';

export default function AdminLogin({ setLoggedIn }) {
  const md5 = require('md5');
  const cookies = useCookies();
  const [ password, setPassword ] = useState('');

  return (
    <main className="container">
      <form onSubmit={(e) => {
        e.preventDefault();
        sendApiRequest(
          'GET',
          '/login',
          { password: md5(password) }
        )
          .then(( response ) => {
            if ( response.success ) {
              setLoggedIn(true);
              cookies.set('logged-in', true);
            } else {
              alert("Dat's not da password");
              setPassword('');
            }
          })
      }}>
        <input
          type="password"
          name="password"
          placeholder="What's da password?"
          onChange={(e) => { setPassword(e.target.value) }}
          value={password}
        />
        <button>Submit</button>
      </form>
    </main>
  )
}