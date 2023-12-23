import { CookiesProvider } from 'next-client-cookies/server';
import AdminInterstitial from "../components/AdminInterstitial";

export default function AdminLayout({ children }) {
  return (
    <CookiesProvider>
      <AdminInterstitial>
        {children}
      </AdminInterstitial>
    </CookiesProvider>
  )
}