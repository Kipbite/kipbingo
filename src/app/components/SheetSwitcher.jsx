"use client"

import { useEffect, useState } from "react";
import { sendApiRequest } from "../lib/utilities";
import SheetSwitcherPopup from "./SheetSwitcherPopup";

export default function SheetSwitcher({ sheet }) {
  const [ sheetList, setSheetList ] = useState();
  const [ selectorOpen, setSelectorOpen ] = useState(false);

  useEffect(() => {
    (async () => {
      const sheets = await sendApiRequest( 'GET', '/sheets', { limit: 20 } );
      setSheetList(sheets);
    })()
  }, []);

  return (
    <>
      <div className="sheet-name" onClick={() => {
        if (sheetList) {
          setSelectorOpen(!selectorOpen);
        }
      }}>
        <h2>{sheet.name || "Loading..."}</h2>
      </div>

      {
        selectorOpen &&
        sheetList &&
        <SheetSwitcherPopup
          sheets={sheetList}
          selectedSheet={sheet}
          setSelectorOpen={setSelectorOpen}
        />
      }
    </>
  );
}