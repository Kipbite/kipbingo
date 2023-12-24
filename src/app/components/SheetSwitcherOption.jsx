import { useContext, useState } from "react";
import { sendApiRequest } from "../lib/utilities";
import AdminContext from "../context";
import Trashcan from "./Trashcan";

export default function SheetSwitcherOption({ sheet, active }) {
  const { setSheet, isAdmin } = useContext(AdminContext);
  const [ deleted, setDeleted ] = useState(false);

  return (
    !deleted &&
    <div
      className={`sheet-switcher-option ${active ? 'active' : ''}`}
    >
      <span onClick={async () => {
        setSheet(null);
        const unfoldedSheet = await sendApiRequest('GET', '/sheets/unfolded', { sheetId: sheet._id });
        setSheet(unfoldedSheet);
      }}>
        {sheet.name}
      </span>

      {isAdmin &&
        <span onClick={async () => {
          await sendApiRequest('DELETE', '/sheets', { id: sheet._id });
          setDeleted(true);
        }}>
          <Trashcan />
        </span>
      }
    </div>
  )
}