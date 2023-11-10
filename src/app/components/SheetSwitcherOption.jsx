import { useContext } from "react";
import { sendApiRequest } from "../lib/utilities";
import AdminContext from "../context";

export default function SheetSwitcherOption({ sheet, active }) {
  const { setSheet } = useContext(AdminContext);

  return (
    <div
      className={`sheet-switcher-option ${active ? 'active' : ''}`}
      onClick={async () => {
        setSheet(null);

        const unfoldedSheet = await sendApiRequest('GET', '/sheets/unfolded', { sheetId: sheet._id });

        setSheet(unfoldedSheet);
      }}
    >
      {sheet.name}
    </div>
  )
}