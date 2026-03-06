import Link from "next/link";
import SignOut from "./SignOut";
import { auth } from "../auth";

export default async function AdminMenu({}) {
  const session = await auth();

  return (
    <div className="admin-menu">
      <Link href="/admin" className="admin-label">
        Admin
      </Link>
      <Link href="/admin/play" className="admin-label">
        Play
      </Link>
      <Link href="/admin/new" className="admin-label">
        New
      </Link>
      <Link href="/admin/games" className="admin-label">
        Games
      </Link>
      { session?.user && <SignOut className="admin-label" /> }
    </div>
  );
}