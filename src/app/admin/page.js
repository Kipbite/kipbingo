import Link from "next/link";

export default function AdminPage({}) {
  return (
    <main className="container">
      <Link href="/admin/new" className="admin-nav">
        New sheet
      </Link>
      <Link href="/admin/play" className="admin-nav">
        Play bingo
      </Link>
    </main>
  )
}