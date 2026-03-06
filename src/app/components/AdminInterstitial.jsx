import AdminMenu from "./AdminMenu";
import AdminLogin from "../components/AdminLogin";
import { auth } from "../auth";
import SignIn from "./SignIn";

export default async function AdminInterstitial({ children }) {
  const session = await auth();

  if ( ! session ) {
    return (
      <>
        <AdminMenu />
        <AdminLogin />
      </>
    );
  }

  const validIds = process.env.VALID_DISCORD_IDS.split( ',' );
  const validUser = session &&  validIds.includes( session.user.id );

  if ( validUser ) {
    return (
      <>
        <AdminMenu />
        { children }
      </>
    )
  } else {
    return (
      <>
        <AdminMenu/>
        <main className="container invalid-user">
          <span>
            Sorry, you&apos;re not authorised to login. Click below to sign in again as a different user.
          </span>
          <SignIn />
        </main>
      </>
    )
  }
}