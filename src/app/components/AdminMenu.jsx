import Link from "next/link";

export default function AdminMenu({}) {
  return (
    <div className="admin-menu">
      <div className="admin-label">
        <Link href="/admin">
          Admin
        </Link>
      </div>
      <div className="admin-label">
        <Link href="/admin/play">
          Play
        </Link>
      </div>
      <div className="admin-label">
        <Link href="/admin/new">
          New
        </Link>
      </div>
      <div className="admin-label">
        <Link href="/admin/games">
          Games
        </Link>
      </div>
    </div>
  );
}