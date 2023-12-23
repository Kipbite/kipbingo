import AdminInterstitial from "../components/AdminInterstitial";

export default function AdminLayout({ children }) {
  return (
    <AdminInterstitial>
      {children}
    </AdminInterstitial>
  )
}