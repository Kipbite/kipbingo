import AdminLabel from "../components/AdminLabel";

export default function AdminLayout({ children }) {
  return (
    <>
      <AdminLabel />
      {children}
    </>
  )
}