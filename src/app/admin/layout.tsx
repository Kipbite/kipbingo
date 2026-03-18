import AdminInterstitial from "../components/AdminInterstitial";
import { ChildElement } from "../types";

interface Props {
  children: ChildElement
}

export default function AdminLayout( { children }: Props ) {
  return (
    <AdminInterstitial>
      { children }
    </AdminInterstitial>
  )
}